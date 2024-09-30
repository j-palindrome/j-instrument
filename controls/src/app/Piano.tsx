'use client'

import _, { sortBy } from 'lodash'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { keys, mapScale, velocityKeys } from './scaling'
import { setters, useAppStore } from '../util/store'
import { scale, useEventListener } from '../util/util'
import RangeSlider2 from '../components/RangeSlider2'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

const DUMMY = 0
export const MIDI_BOTTOM = 0
export const MIDI_TOP = 1

export default function Piano() {
  const notes = useAppStore(state => state.notes)
  const velocity = useRef(1)
  const sustain = useRef<boolean>(false)
  const noteOffQueue = useRef<number[]>([])
  const range = useAppStore(state => state.range)

  const segment = useSelectedLayoutSegment()

  useEventListener(
    'keydown',
    (ev: KeyboardEvent) => {
      const keyString = ev.key.replace('Key', '').toLowerCase()
      const key = velocityKeys.indexOf(keyString)
      if (key === -1) return

      velocity.current = scale(
        key,
        0,
        velocityKeys.length,
        1 / velocityKeys.length,
        1
      )
    },
    []
  )

  useEventListener(
    'keydown',
    (ev: KeyboardEvent) => {
      if (ev.key !== ' ') return
      sustain.current = true
    },
    []
  )
  useEventListener(
    'keyup',
    (ev: KeyboardEvent) => {
      // release all held notes that have already disappeared
      if (ev.key !== ' ') return
      sustain.current = false
      const newNotes = [...notes]
      const started = Date.now()

      for (let key of noteOffQueue.current) {
        const thisVoice = notes.findIndex(note => note.key === key)
        if (thisVoice === -1) continue
        newNotes[thisVoice] = { ...newNotes[thisVoice], velocity: 0, started }
      }
      setters.setNotes(newNotes, started)
      noteOffQueue.current = []
    },
    [notes]
  )

  useEventListener(
    'keydown',
    (ev: KeyboardEvent) => {
      const keyString = ev.key.replace('Key', '').toLowerCase()
      const key = keys.indexOf(keyString)
      if (key === -1) return

      const newNotes = [...notes]
      let started = Date.now()
      const currentNoteIndex = notes.findIndex(
        synth => synth.velocity && synth.key === key
      )
      if (currentNoteIndex !== -1) {
        if (noteOffQueue.current.includes(key)) {
          // already been released so start a new one
          _.remove(noteOffQueue.current, key)
        } else {
          ev.stopImmediatePropagation()
          return
        }
      }

      let voiceIndex = notes.findIndex(synth => !synth.velocity)
      if (voiceIndex === -1) {
        voiceIndex = notes.indexOf(
          _.minBy(
            notes.filter(voice => voice.velocity),
            'started'
          )!
        )
        newNotes[voiceIndex] = { ...newNotes[voiceIndex], started, velocity: 0 }
        setters.setNotes(newNotes, started)
        started = Date.now() + 1
      }

      newNotes[voiceIndex] = {
        started,
        key,
        velocity: velocity.current,
        value: DUMMY
      }

      setters.setNotes(newNotes, started)
    },
    [notes]
  )

  useEventListener(
    'keyup',
    (ev: KeyboardEvent) => {
      const keyString = ev.key.replace('Key', '').toLowerCase()
      const key = keys.indexOf(keyString)
      if (key === -1) return

      if (sustain.current) {
        // when sustain is released, we flush all keys here
        noteOffQueue.current.push(key)
        return
      }

      const voiceIndex = notes.findIndex(x => x.key === key && x.velocity)
      if (voiceIndex === -1) {
        ev.stopImmediatePropagation()
        return
      }

      const newNotes = [...notes]
      const started = Date.now()
      newNotes[voiceIndex] = { started, key, velocity: 0, value: DUMMY }
      setters.setNotes(newNotes, started)
    },
    [notes]
  )

  const onChange = useCallback(
    ([low, high]: number[]) => setters.setScale({ range: [low, high] }),
    []
  )

  const sliderSetters = useRef({
    setMin: (n: number) => {},
    setMax: (n: number) => {}
  })

  return (
    <div className='space-y-2'>
      <RangeSlider2 onChange={onChange} ref={sliderSetters} />
      <div className='flex space-x-2'>
        <button
          onClick={() => {
            const { setMax } = sliderSetters.current
            setMax(range[0] + (1 / 127) * (keys.length + 1))
          }}>
          octave
        </button>
        <button
          onClick={() => {
            const { setMin, setMax } = sliderSetters.current
            const thisRange = [...range]
            setMin(thisRange[0] - 1 / 127)
            setMax(thisRange[1] - 1 / 127)
          }}>
          {'<'}
        </button>
        <button
          onClick={() => {
            const { setMin, setMax } = sliderSetters.current
            const thisRange = [...range]
            setMin(thisRange[0] + 1 / 127)
            setMax(thisRange[1] + 1 / 127)
          }}>
          {'>'}
        </button>
        <button
          onClick={() => {
            const { setMin, setMax } = sliderSetters.current
            const thisRange = [...range]
            setMin(thisRange[0] + (1 / 127) * 12)
            setMax(thisRange[1] + (1 / 127) * 12)
          }}>
          {'>>'}
        </button>
        <button
          onClick={() => {
            const { setMin, setMax } = sliderSetters.current
            const thisRange = [...range]
            setMin(thisRange[0] - (1 / 127) * 12)
            setMax(thisRange[1] - (1 / 127) * 12)
          }}>
          {'<<'}
        </button>
      </div>
      <div className='w-full'></div>
      <div className='w-full h-6 flex space-x-2' />
      <div className='flex w-full space-x-2'>
        {['square', 'lectures', 'industrialization', 'piano', 'distortion'].map(
          x => (
            <Link href={x} className={segment === x ? 'font-bold' : ''}>
              {x}
            </Link>
          )
        )}
      </div>
    </div>
  )
}
