import { ip } from 'address'
//e.g server.js

import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { Server as SocketServer } from 'socket.io'
import ViteExpress from 'vite-express'
import { Client, Server } from 'node-osc'
import { exec } from 'child_process'

const app = express()

const server = ViteExpress.listen(app, 7001, () =>
  console.log(`Server is listening at http://localhost:7001`)
)

// And then attach the socket.io server to the HTTP server
const io = new SocketServer<SocketEvents>(server)

// Create an OSC server
const oscServer = new Server(7000, 'localhost', () => {
  console.log('OSC Server is listening on port 7000')
})

// Create an OSC client
const oscClient = new Client('localhost', 7001)

// Handle incoming OSC messages
oscServer.on('message', msg => {
  console.log(`Received OSC message: ${msg}`)
  // You can handle the message and emit events to the socket.io clients if needed
  io.emit('osc', ...msg)
})

// Example of sending an OSC message
const sendOscMessage = (address: string, ...args: any[]) => {
  oscClient.send(address, ...args, err => {
    if (err) {
      console.error('Error sending OSC message:', err)
    } else {
      console.log(`OSC message sent to ${address} with args: ${args}`)
    }
  })
}

// Then you can use `io` to listen the `connection` event and get a socket
// from a client

const settings: {
  mediaFolder: string
} = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'settings.json')).toString()
)

const updateSettings = (newSettings: Partial<typeof settings>) => {
  for (let key of Object.keys(newSettings)) {
    settings[key] = newSettings[key]
  }
  fs.writeFileSync(
    path.resolve(process.cwd(), 'settings.json'),
    JSON.stringify(settings)
  )
}

const ipAdd = ip()
sendOscMessage(
  '/message',
  `Go to http://${ipAdd}:7001 from an iPad signed into same WiFi to access UI.`
)
sendOscMessage('/message/ip', `http://${ipAdd}:7001`)
sendOscMessage(
  '/message/name',
  `name`,
  `presets_${new Date().toISOString().slice(0, 10)}.json`
)

io.on('connection', socket => {
  socket.on('set', (route: string, value: any) => {
    if (value instanceof Array) {
      sendOscMessage(route, ...value)
    } else {
      if ((route.includes('file1') || route.includes('file2')) && value) {
        value = path.resolve(settings.mediaFolder, value)
      }
      sendOscMessage(route, value)
    }
  })

  const presetsPath = path.resolve(process.cwd(), 'presets.json')
  if (!fs.existsSync(presetsPath)) {
    fs.writeFileSync(presetsPath, '{}')
  }
  let presets = fs.readFileSync(presetsPath).toString()

  socket.on('loadPresets', callback => {
    callback(presets)
  })

  socket.on('savePresets', presets => {
    fs.promises.writeFile(
      path.resolve(process.cwd(), 'presets.json'),
      JSON.stringify(presets)
    )
  })

  const readFiles = () => {
    if (!settings.mediaFolder) return
    try {
      const files = fs
        .readdirSync(settings.mediaFolder)
        .filter(file =>
          /\.(mov|mp4|m4a|png|jpg|aif|gif|webm|webp|vlc)$/.test(file)
        )
      socket.emit('setFiles', files)
    } catch (err) {}
  }
  oscServer.addListener('/setMediaFolder', (folder: string) => {
    try {
      updateSettings({ mediaFolder: folder })
      readFiles()
    } catch (err) {
      updateSettings({ mediaFolder: '' })
    }
  })

  readFiles()
})
