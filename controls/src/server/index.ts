import { ip } from 'address'
//e.g server.js

import express from 'express'
import { Client, Server } from 'node-osc'
import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { Server as SocketServer } from 'socket.io'
import ViteExpress from 'vite-express'

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
const maxOscClient = new Client('localhost', 7001)
const tdOscClient = new Client('localhost', 7002)

// Handle incoming OSC messages
oscServer.on('message', msg => {
  console.log(`Received OSC message: ${msg}`)
  // You can handle the message and emit events to the socket.io clients if needed
})

// Example of sending an OSC message
const sendOscMessage = (
  target: 'max' | 'td' | 'all',
  address: string,
  ...args: any[]
) => {
  console.log(`message to`, target, address, ...args)

  if (target === 'max' || target === 'all')
    maxOscClient.send(address, ...args, () => {})
  if (target === 'td' || target === 'all')
    tdOscClient.send(address, ...args, () => {})
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
  'max',
  '/ip',
  `Go to http://${ipAdd}:7001 from an iPad signed into same WiFi to access UI.`
)

io.on('connection', socket => {
  socket.on('osc', (target, route, ...value) => {
    sendOscMessage(target, route, ...value)
  })
  socket.on('get', (type, info, callback) => {
    switch (type) {
      case 'path':
        callback(path.resolve(process.cwd(), info.relativePath))
        break
    }
  })
  socket.on('do', (type, info) => {
    switch (type) {
      case 'encode':
        exec(
          `cd ../exports && ffmpeg -i ${info.timestamp}.mov -i ${
            info.timestamp
          }.wav -c:v copy -c:a copy -map 0:v:0 -map 1:a:0 ${
            info.timestamp
          }-exp.mov && rm ${info.timestamp}.mov && rm ${
            info.timestamp
          }.wav && mv ${info.timestamp}-exp.mov ${new Date(info.timestamp)
            .toISOString()
            .slice(0, 19)
            .replace(/[T:]/g, '-')}.mov`
        )
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
