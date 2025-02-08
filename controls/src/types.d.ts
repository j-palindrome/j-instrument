import { PresetValue } from './store'

declare global {
  type SocketEvents = {
    loadPresets: (callback: (presets: string) => void) => void
    savePresets: (presets: Record<string, object>) => void
    osc: (path: string, ...value: PresetValue['value']) => void
    set: (path: string, value: any) => void
    setFiles: (files: string[]) => void
  }
}
