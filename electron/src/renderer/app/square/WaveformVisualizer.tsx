import { useEffect } from 'react'
import { useAppStore } from '../../util/store'
import { generateFunctionPoints } from './audio-util'

export default function WaveformVisualizer() {
  const points = useAppStore((state) =>
    generateFunctionPoints(state.notes.filter((x) => x.velocity).map((x) => x.value))
  )
  useEffect(() => {
    window.electron.ipcRenderer.send('osc', '/bufferData', points[0])
    window.electron.ipcRenderer.send('osc', '/buffer2Data', points[1])
  }, [points])

  return <></>
}
