import { el } from '@elemaudio/core'
import { AppState, getters } from '../util/store'
import WebRenderer from '@elemaudio/web-renderer'

export default function renderAudio(audio: AppState['audio']) {
  const send = window.electron.ipcRenderer.send
  send('osc', '/bufferData', audio.points)
  send('osc', '/buffer2Data', audio.points2)
  send('osc', '/speed', audio.speed)
  // for the graphics renderer
  send('bufferData', audio.points)
  send('buffer2Data', audio.points2)
}
