import { mtof } from './../util/util'
import { produce } from 'immer'
import _, { range } from 'lodash'
import { useRef } from 'react'
import { createWithEqualityFn } from 'zustand/traditional'
import { generateFunctionPoints } from '../audio/audio-util'
import renderAudio from '../audio/audio'
import { mapScale } from '../util/scaling'

export const LENGTH = 1800

export type AppState = {
  ramp: number
  scale: number[]
  notes: { key: number; started: false | number }[]
}

export const useAppStore = createWithEqualityFn<AppState>(() => {
  const state: AppState = {
    ramp: 0.2,
    scale: [0, 0],
    notes: range(6).map(() => ({ key: 0, started: false }))
  }
  return state
})

const modify = (modifier: (state: AppState) => void) => {
  useAppStore.setState(produce(modifier))
}

export const setters = {
  set: (newState: Partial<AppState>) => {
    modify(() => newState)
  },
  setAudio: (newState: Partial<AppState['audio']>) => {
    modify((state) => {
      state.audio = { ...state.audio, ...newState }
      updateValues(state)
      updateAudio(state)
    })
  },
  setMidi: (newState: Partial<AppState['midi']>) => {
    modify((state) => {
      state.midi = { ...state.midi, ...newState }
      updateValues(state)
    })
  }
}

// CHANGE: only 6 values, if it's 0 then it's off. Earliest voice gets selected as 0 or else they are all turned off.
const updateValues = (state: AppState) => {
  const mappedScale = mapScale(state.midi.scale, state.midi.range)
  const values = state.midi.notes.map((x) => (!x.started ? 0 : mtof(mappedScale[x.key])))
  state.values = values
}

const updateAudio = (state: AppState) => {
  const newPoints = generateFunctionPoints(state.values, state.audio)
  state.audio.points = newPoints[0]
  state.audio.points2 = newPoints[1]
  state.audio.speed = mtof(state.values[0] ?? 0)
  window.electron.ipcRenderer.send('message', 'notes', state.values)
  renderAudio(state.audio)
}

export const getters = {
  get: <T extends keyof AppState>(key: T) => useAppStore.getState()[key]
}

export const useAppStoreRef = <T>(callback: (state: AppState) => T) => {
  const storeValue: T = useAppStore(callback)
  const storeValueRef = useRef(storeValue)
  storeValueRef.current = storeValue
  return [storeValue, storeValueRef] as [typeof storeValue, typeof storeValueRef]
}
