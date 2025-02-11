import OscPresets from '@libs/oscPresets/components/OscPresets'
import { useContext } from 'react'
import { AsemicCanvas } from '../../libs/asemic/src/Asemic'
import config from '../../src/controls/config'
import Scene from './Scene'
import { getChannel } from './setup/sound'
import { socketContext } from './store'

function App() {
  const socket = useContext(socketContext)
  return (
    <>
      <OscPresets schema={config} />
      <AsemicCanvas useAudio outputChannel={ctx => getChannel(ctx, socket)}>
        <Scene />
      </AsemicCanvas>
    </>
  )
}

export default App
