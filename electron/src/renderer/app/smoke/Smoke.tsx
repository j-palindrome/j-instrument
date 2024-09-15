import { Reactive, Processing } from 'reactive-frames'
import type p5 from 'p5'
import { useAppStore } from '../../util/store'
import { useEffect } from 'react'

export default function Smoke() {
  const values = useAppStore((state) => state.values)
  useEffect(() => {
    console.log('notes', values)

    window.electron.ipcRenderer.send('osc', '/values', values)
  }, [values.join('')])

  return <>working?</>
}
