import _ from 'lodash'
import * as Tone from 'tone'
import { getters, setters, useAppStore } from '../util/store'
import { keys, mapScale } from '../util/scaling'
import { useEventListener } from '../util/util'
import SliderRange from '../components/SliderRange'
import WaveformVisualizer from './square/WaveformVisualizer'
import { Link, Outlet } from 'react-router-dom'

export default function Piano() {
  const notes = useAppStore((state) => state.midi.notes)

  useEventListener(
    'keydown',
    (ev: KeyboardEvent) => {
      const keyString = ev.key.replace('Key', '').toLowerCase()
      const key = keys.indexOf(keyString)
      if (key === -1) return

      if (notes.find((synth) => synth.started && synth.key === key)) {
        ev.stopImmediatePropagation()
        return
      }

      let voiceIndex = notes.findIndex((synth) => !synth.started)
      if (voiceIndex === -1)
        voiceIndex = notes.indexOf(
          _.minBy(
            notes.filter((voice) => voice.started !== null),
            'started'
          )!
        )
      const midi = getters.get('midi')
      const mappedScale = mapScale(midi.scale, midi.range)
      const newNotes = [...notes]
      newNotes[voiceIndex] = { started: Tone.now(), key }
      setters.setMidi({ notes: newNotes })
      setters.set({ newNote: { voice: voiceIndex, value: mappedScale[key], velocity: true } })
    },
    [notes]
  )

  useEventListener(
    'keyup',
    (ev: KeyboardEvent) => {
      const keyString = ev.key.replace('Key', '').toLowerCase()
      const key = keys.indexOf(keyString)
      if (key === -1) return

      const voiceIndex = notes.findIndex((x) => x.key === key && x.started)
      if (voiceIndex === -1) {
        ev.stopImmediatePropagation()
        return
      }
      const newNotes = [...notes]
      newNotes[voiceIndex] = { started: false, key }
      setters.setMidi({ notes: newNotes })
      const midi = getters.get('midi')
      const mappedScale = mapScale(midi.scale, midi.range)
      setters.set({ newNote: { voice: voiceIndex, value: mappedScale[key], velocity: false } })
    },
    [notes]
  )

  return (
    <div className="space-y-2">
      <SliderRange
        range={[-50, 123]} // 0.5 to 10,000 HZ
        onChange={([low, high]) => {
          setters.setMidi({ range: [low, high] })
        }}
      />
      <div className="w-full h-6 flex space-x-2" />
      <div className="flex w-full space-x-2">
        <Link to="square">waveform</Link>
        <Link to="smoke">smoke</Link>
        <Link to="lectures">lectures</Link>
      </div>
      <Outlet />
    </div>
  )
}
