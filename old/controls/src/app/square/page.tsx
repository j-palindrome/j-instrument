'use client'

import { useEffect } from 'react'
import { useAppStore } from '../../util/store'
import { generateFunctionPoints } from './audio-util'
import { useShallow } from 'zustand/shallow'

export default function WaveformVisualizer() {
  const points = generateFunctionPoints(
    useAppStore(state => state.notes)
      .filter(x => x.velocity)
      .map(x => x.value)
  )

  useEffect(() => {
    window.max?.outlet('/bufferData', points[0])
    window.max?.outlet('/buffer2Data', points[1])
  }, [points])

  return <></>
}
