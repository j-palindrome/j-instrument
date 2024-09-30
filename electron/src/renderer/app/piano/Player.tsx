import { useEffect, useRef } from 'react'
import { useAppStore, useNewNotes } from '../../util/store'
import { scale } from '../../util/util'
import { keys } from '../scaling'
import { maxBy } from 'lodash'

export default function Player() {
  const newNotes = useNewNotes()
  useEffect(() => {
    for (let note of newNotes) {
      window.electron.ipcRenderer.send(
        'osc',
        '/note-in',
        Math.floor(scale(note.value, 0, 1, 0, 127)),
        Math.floor(note.velocity * 127)
      )
    }
  }, [newNotes])

  return <></>
}
