import { produce } from 'immer'
import { maxBy, range, sortBy } from 'lodash'
import { useRef } from 'react'
import { createWithEqualityFn } from 'zustand/traditional'
import { mapScale } from '../app/scaling'

export const LENGTH = 1800

// lastUpdate is used to slice notes into things that have to be dealt with
export type AppState = {
  ramp: number
  scale: number[]
  range: [number, number]
  mappedScale: number[]
  notes: { key: number; started: number; value: number; velocity: number }[]
  lastUpdate: number
}

export const useAppStore = createWithEqualityFn<AppState>(() => {
  const state: AppState = {
    ramp: 0.2,
    scale: [1],
    range: [0, 0],
    notes: range(6).map(() => ({ key: 0, started: 0, value: 0, velocity: 0 })),
    mappedScale: [],
    lastUpdate: Date.now()
  }
  return state
})

export const useNewNotes = () => {
  const newNotes = useAppStore((state) => state.notes.filter((x) => x.started >= state.lastUpdate))
  return newNotes
}

const modify = (modifier: (state: AppState) => void) => {
  useAppStore.setState(produce(modifier))
}

export const setters = {
  setScale: ({ scale, range }: Partial<Pick<AppState, 'scale' | 'range'>>) => {
    modify((state) => {
      const mappedScale = mapScale(scale ?? state.scale, range ?? state.range)

      return {
        scale: scale ?? state.scale,
        range: range ?? state.range,
        mappedScale,
        notes: state.notes.map((x) => ({ ...x, value: mappedScale[x.key] }))
      }
    })
  },
  setNotes: (notes: AppState['notes'], lastUpdate: number) => {
    modify((state) => {
      state.notes = notes.map((x) => ({ ...x, value: state.mappedScale[x.key] }))
      state.lastUpdate = lastUpdate
    })
  }
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
