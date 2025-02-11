import { useContext } from 'react'
import { AsemicCanvas } from '../../libs/asemic/src/Asemic'
import config from '../../src/controls/config'
import Scene from './Scene'
import { getChannel } from './setup/sound'
import { OscPresets, useSocket } from './store'

function App() {
  const socket = useSocket()
  return (
    <>
      <OscPresets />
      <AsemicCanvas useAudio outputChannel={ctx => getChannel(ctx, socket)}>
        <Scene />
      </AsemicCanvas>
    </>
  )
}

export default App
