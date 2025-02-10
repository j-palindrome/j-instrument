import Button from '@libs/util/react/components/Toggle'
import { now } from 'lodash'
import { useState } from 'react'
import { AsemicCanvas, useAsemic } from '../../libs/asemic/src/Asemic'
import LineBrush from '../../libs/asemic/src/LineBrush'
import { useSocket } from '../../libs/oscPresets/components/context'

function App() {
  const socket = useSocket()
  const [lastRecord, setLastRecord] = useState(0)
  return (
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
                  relativePath: `./exports`
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
              socket.emit('osc', 'max', '/channels/device', 'Mac & BlackHole')
              socket.emit('osc', 'max', '/channels/input', 2, 3)
              socket.emit('osc', 'max', '/channels/output', 1, 2)
              // the recording loopback from Max to TD
              socket.emit('osc', 'max', '/channels/loopback', 17, 18)
              socket.emit('osc', 'td', '/channels/loopback', 15, 16)
              return 2
            default:
              throw new Error('must use BlackHole with MOTU or with Mac Audio')
          }
        }}>
        <Scene />
      </AsemicCanvas>
    </>
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
