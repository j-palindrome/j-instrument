//e.g server.js
import _ from 'lodash'
import { Server as SocketServer } from 'socket.io'
import { Client as OscClient, Server as OscServer } from 'node-osc'
import OpenAI from 'openai'
import 'dotenv/config'
import process from 'process'
import fs from 'fs'
import { app, BrowserWindow } from 'electron'

// And then attach the socket.io server to the HTTP server
// const io = new SocketServer<SocketEvents>(server)

// const maxOut = new OscClient('127.0.0.1', 7001)
// const oscIn = new OscServer(7004, '0.0.0.0')

// const openAi = new OpenAI({
//   apiKey: process.env['OPENAI_API_KEY']
// })

// Then you can use `io` to listen the `connection` event and get a socket
// from a client
// io.on('connection', (socket) => {
//   // from this point you are on the WS connection with a specific client
//   console.log(socket.id, 'connected')

//   socket.on('oscOut', (target, route, data) => {
//     const PORTS: Record<string, OscClient> = {
//       max: maxOut
//     }
//     // console.log('sending OSC:', target, route, data)
//     PORTS[target].send(route, data)
//   })

//   oscIn.on('message', (data) => {
//     // console.log('received OSC', data)
//     socket.emit(data[0], data.slice(1))
//   })

//   // const files = fs.readdirSync('./audio')
//   // let counter = files.length + 1

//   socket.on('gpt', async (text, callback) => {
//     try {
//       const response = await openAi.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         temperature: 2,
//         max_tokens: 50,
//         messages: [
//           {
//             role: 'system',
//             content:
//               'You are Echo of the Greek Myth screaming at the gates of descruction. You are speaking to Narcissus.'
//           },
//           { role: 'user', content: text }
//         ]
//       })

//       const responseText = response.choices[0].message.content!
//       callback(responseText)
//       fs.writeFileSync(`./text/text-${responseText.slice(0, 60)}.txt`, responseText)
//     } catch (err) {
//       if (err instanceof Error) console.error(err.message)
//     }
//   })

//   socket.on('gpt-voice', async (text, callback) => {
//     const voiceResponse = await openAi.audio.speech.create({
//       model: 'tts-1',
//       input: text,
//       voice: 'shimmer',
//       response_format: 'mp3',
//       speed: 1
//     })

//     const dest = fs.createWriteStream(`./audio/audio-${text.slice(0, 60)}.mp3`)
//     const blob = await voiceResponse.blob()
//     const buffer = Buffer.from(await blob.arrayBuffer())
//     dest.write(buffer)
//   })
// })

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600
//   })

//   win.loadFile('index.html')
// }

// app.whenReady().then(() => {
//   createWindow()
// })
