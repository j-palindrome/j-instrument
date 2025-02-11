import Button from '@libs/oscPresets/components/Toggle'
import { now } from 'lodash'
import { useState } from 'react'
import { AsemicCanvas, useAsemic } from '../../libs/asemic/src/Asemic'
import LineBrush from '../../libs/asemic/src/LineBrush'
import { useSocket } from '../../libs/oscPresets/components/context'
import { OscFrame } from '@libs/oscPresets/components/OscFrame'
import OscPresets from '@libs/oscPresets/components/OscPresets'
import config from '../../src/controls/config'
import { getChannel } from './setup/sound'
import Scene from './Scene'

function App() {
  const socket = useSocket()
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
