import { createStore } from '@libs/oscPresets/modules/store'
import config from './config'

const state = createStore(config)

export const OscPresets = state.OscPresets
export const OscFrame = state.OscFrame
export const useSocket = state.useSocket
