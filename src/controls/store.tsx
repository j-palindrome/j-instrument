import { createStore } from '@libs/oscPresets/modules/store'
import config from './config'

const state = createStore(config)

export const useAppStore = state.useAppStore
export const setters = state.setters
export const socketContext = state.context
export const useSocket = state.useSocket
