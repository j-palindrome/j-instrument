import { AppState, PresetValue, Schema } from './store'

declare global {
  type SocketEvents<T extends Schema> = {
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
    load: (callback: (presets: AppState<T>['presets']) => void) => void
    save: (presets: AppState<T>['presets']) => void
    osc: (
      target: 'max' | 'td' | 'all',
      path: string,
      ...value: PresetValue['value']
    ) => void
  }
}
