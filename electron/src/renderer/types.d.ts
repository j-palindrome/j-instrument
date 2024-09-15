type Target = 'sc' | 'td' | 'node' | 'max'

type SocketEvents = {
  oscOut: (target: Target, route: string, data: any) => void
} & Record<string, (...data: any) => void>

declare module 'ccapture.js'

interface Window {
  max: {
    outlet: (...args: any[]) => void
  }
}

type ModulationType = 'add' | 'fm' | 'am' | 'delay' | 'pan'
type WaveType = 'sin' | 'saw' | 'triangle' | 'square' | 'noise'
type OscillatorData = {
  modulationType: ModulationType
  started: false | number
  key: number
}
