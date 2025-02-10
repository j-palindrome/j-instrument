import { now } from 'lodash'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { AsemicCanvas, useAsemic } from '../../libs/asemic/src/Asemic'
import LineBrush from '../../libs/asemic/src/LineBrush'
import Button from './components/Button'
import { SocketProvider, useSocket } from './context'
import { PresetSocket, setters } from './store'

function App() {
  const [socket, setSocket] = useState<PresetSocket>()

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const audioInputs = devices.filter(device => device.kind === 'audioinput')
      console.log('Available audio inputs:', audioInputs)
    })
  }, [])

  useEffect(() => {
    const socket: PresetSocket = io()
    setSocket(socket)

    socket.emit('load', presets => {
      // for (let value of Object.values(presets)) {
      //   for (let key of defaultKeys) {
      //     if (value[key] === undefined) {
      //       value[key] = initialGlobal[key]
      //     }
      //   }
      // }

      setters.set({
        presets
      })
    })

    return () => {
      socket.close()
    }
  }, [])
  const [lastRecord, setLastRecord] = useState(0)

  return (
    socket && (
      <SocketProvider socket={socket}>
        <>
          <div>
            <Button
              label='record'
              cb={state => {
                if (state) {
                  const nowStr = now()
                  socket.emit(
                    'get',
                    'path',
                    {
                      relativePath: `../exports`
                    },
                    path => {
                      socket.emit(
                        'osc',
                        'td',
                        '/record/filename',
                        path + `/${nowStr}.mov`
                      )
                      socket.emit(
                        'osc',
                        'max',
                        '/record/filename',
                        `open`,
                        `${path}/${nowStr}.wav`
                      )
                      setLastRecord(nowStr)
                      window.setTimeout(
                        () => socket.emit('osc', 'all', '/record/status', 1),
                        500
                      )
                    }
                  )
                } else {
                  console.log('stop')
                  socket.emit('osc', 'all', '/record/status', 0)
                  socket.emit('do', 'encode', {
                    timestamp: lastRecord
                  })
                }
              }}
            />
          </div>
          <AsemicCanvas
            useAudio
            outputChannel={ctx => {
              switch (ctx.destination.maxChannelCount) {
                case 32:
                  console.log('32 outputs')

                  // MOTU
                  socket.emit(
                    'osc',
                    'max',
                    '/channels/device',
                    'BlackHole Ultralite'
                  )
                  socket.emit('osc', 'max', '/channels/input', 1, 2)
                  socket.emit('osc', 'max', '/channels/output', 17, 18)
                  socket.emit('osc', 'max', '/channels/loopback', 15, 16)
                  // // the recording loopback from Max to TD
                  socket.emit('osc', 'td', '/channels/loopback', 32, 33)
                  return 18
                case 18:
                  // MacBook
                  socket.emit(
                    'osc',
                    'max',
                    '/channels/device',
                    'Mac & BlackHole'
                  )
                  socket.emit('osc', 'max', '/channels/input', 2, 3)
                  socket.emit('osc', 'max', '/channels/output', 1, 2)
                  // the recording loopback from Max to TD
                  socket.emit('osc', 'max', '/channels/loopback', 17, 18)
                  socket.emit('osc', 'td', '/channels/loopback', 15, 16)
                  return 2
                default:
                  throw new Error(
                    'must use BlackHole with MOTU or with Mac Audio'
                  )
              }
            }}>
            <Scene />
          </AsemicCanvas>
        </>
      </SocketProvider>
    )
  )
}

export default App

function Scene() {
  const socket = useSocket()
  const { h } = useAsemic({
    audio: e => [
      e.div(
        e.add(e.cycle(900), e.cycle(370), e.mul(e.cycle(800), 0.2)),
        2 + 0.2
      ),
      e.cycle(440.049)
    ],
    controls: {
      constants: {
        click: [
          2,
          {
            onClick: ev => {
              console.log('sending 3')

              socket.emit('osc', 'max', '/controls', 3)
              // socket.emit('osc', 'td', '/freeze', freeze ? 0 )
              return 3
            }
          }
        ]
      },
      uniforms: {},
      refs: {}
    }
  })
  return (
    <>
      <LineBrush
        onInit={g =>
          g
            .newText('hello human, how are you', { thickness: 1 })
            .setProcess('all', { width: 1, center: 0.5, middle: 0.5 * h })
        }
      />
    </>
  )
}
