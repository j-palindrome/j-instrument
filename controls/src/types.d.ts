import { PresetValue } from './store'

declare global {
  type SocketEvents = {
    do: <T extends { type: 'encode'; info: { timestamp: number } }>(
      type: T['type'],
      info: T['info']
    ) => void
    get: <
      T extends {
        type: 'path'
        info: { relativePath: string }
        callback: (path: string) => void
      }
    >(
      type: T['type'],
      info: T['info'],
      callback: T['callback']
    ) => void
    loadPresets: (callback: (presets: string) => void) => void
    savePresets: (presets: Record<string, object>) => void
    osc: (
      target: 'max' | 'td' | 'all',
      path: string,
      ...value: PresetValue['value']
    ) => void
    set: (path: string, value: any) => void
    setFiles: (files: string[]) => void
  }
}
