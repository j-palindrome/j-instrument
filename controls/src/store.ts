import { produce } from 'immer'
import _ from 'lodash'
import { useRef } from 'react'
import { Socket } from 'socket.io-client'
import { createWithEqualityFn } from 'zustand/traditional'

export type PresetValueDescription<
  K extends 'slider' | 'boolean' | 'string' | 'trigger' | 'list' | 'select'
> = {
  type: K
  values?: K extends 'string'
    ? string[]
    : K extends 'select'
    ? (state: AppState) => string[]
    : undefined
  default: K extends 'slider'
    ? number
    : K extends 'boolean'
    ? boolean
    : K extends 'string'
    ? string
    : K extends 'trigger'
    ? 'bang' | null
    : K extends 'list'
    ? number[]
    : K extends 'select'
    ? string
    : undefined
}

export type PresetValue<
  K extends 'slider' | 'boolean' | 'string' | 'trigger' | 'list' | 'select'
> = K extends 'slider'
  ? number
  : K extends 'boolean'
  ? boolean
  : K extends 'trigger'
  ? 'bang' | null
  : K extends 'string'
  ? string
  : K extends 'list'
  ? number[]
  : K extends 'select'
  ? string
  : undefined

export type GlobalPreset = {
  video_file1: string
  video_file2: string
  video_noise: string
}

export type AppState = {
  preset: GlobalPreset
  presets: Record<string, GlobalPreset>
  currentPreset: string | undefined
  files: string[]
}

export const initialGlobal: GlobalPreset = {
  video_file1: '',
  video_file2: '',
  video_noise: 'noise.simplex'
}

const initialState: AppState = {
  preset: initialGlobal,
  presets: {},
  currentPreset: '0',
  files: []
}

export const useAppStore = createWithEqualityFn<AppState>(() => initialState)
export const useAppStoreRef = <T>(callback: (state: AppState) => T) => {
  const storeValue: T = useAppStore(callback)
  const storeValueRef = useRef(storeValue)
  storeValueRef.current = storeValue
  return [storeValue, storeValueRef] as [
    typeof storeValue,
    typeof storeValueRef
  ]
}

const modify = (modifier: (state: AppState) => void) =>
  useAppStore.setState(produce(modifier))

export const setters = {
  savePreset: (name: string, socket: Socket<SocketEvents, SocketEvents>) => {
    modify(state => {
      state.presets[name] = _.cloneDeep(state.preset)
      socket.emit('savePresets', state.presets)
    })
  },
  deletePreset: (name: string, socket: Socket<SocketEvents, SocketEvents>) => {
    modify(state => {
      delete state.presets[name]
      socket.emit('savePresets', state.presets)
    })
  },
  loadPreset: (name: string, socket: Socket<SocketEvents, SocketEvents>) => {
    const presets = getters.get('presets')
    const currentPreset = getters.get('preset')
    const newPreset = !presets[name]
      ? _.cloneDeep(currentPreset)
      : presets[name]

    setters.setPreset({ ...newPreset }, socket)

    setters.setPreset({ ...currentPreset[2], ...newPreset[2] }, socket)

    modify(state => {
      state.currentPreset = name
    })
  },
  setPreset: (
    newPreset: Partial<GlobalPreset>,
    socket: Socket<SocketEvents>,
    // when setting/getting these are useful for preventing infinite loops
    { commit = true, send: sendToMax = true } = {}
  ) => {
    if (sendToMax) {
      for (let key of Object.keys(newPreset)) {
        socket.emit('osc', key, newPreset[key])
      }
    }

    if (commit) {
      modify(state => {
        Object.assign(state.preset, newPreset)
      })
    }
  },
  set: (newState: Partial<AppState>) => modify(() => newState),
  modify: (modifier: (oldState: AppState) => void) => modify(modifier)
}

export const getters = {
  get: <T extends keyof AppState>(key: T) => useAppStore.getState()[key]
}
