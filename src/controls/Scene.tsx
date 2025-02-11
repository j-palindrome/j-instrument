import { useAsemic } from '@libs/asemic/src/Asemic'
import LineBrush from '@libs/asemic/src/LineBrush'
import { useContext } from 'react'
import { socketContext } from './store'

export default function Scene() {
  const socket = useContext(socketContext)
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
