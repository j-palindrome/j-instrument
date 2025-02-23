import { useContext } from 'react'
import { Asemic, AsemicCanvas } from '../../libs/asemic/src/Asemic'
import config from '../../src/controls/config'
import { getChannel } from './setup/sound'
import { OscPresets, useSocket } from './store'
import LineBrush from '@libs/asemic/src/LineBrush'

function App() {
  const socket = useSocket()

  return (
    <>
      <OscPresets />
      <AsemicCanvas useAudio outputChannel={ctx => getChannel(ctx, socket)}>
        <Asemic
          audio={e => [
            e.mul(
              e.div(
                e.add(e.cycle(900), e.cycle(370), e.mul(e.cycle(800), 0.2)),
                2 + 0.2
              ),
              0.1
            ),
            e.mul(e.cycle(440.049), 0.1)
          ]}>
          {({ h }) => (
            <LineBrush
              onInit={g =>
                g
                  .newText('but the morning winks', { thickness: 1 })
                  .setProcess('all', { width: 1, center: 0.5, middle: 0.5 * h })
              }
            />
          )}
        </Asemic>
        <Asemic audio={e => e.mul(e.cycle(330), 0.2)}>
          <LineBrush onInit={g => g.newText('hello')} />
        </Asemic>
      </AsemicCanvas>
    </>
  )
}

export default App
