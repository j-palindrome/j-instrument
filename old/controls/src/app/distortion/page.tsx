'use client'

import { useNewNotes } from '@/util/store'
import { useEffect } from 'react'

export default function Distortion() {
  const newNotes = useNewNotes()
  useEffect(() => {
    for (let newNote of newNotes) {
      window.max?.outlet(
        '/note-in',
        'setvalue',
        newNote.voice,
        Math.floor(newNote.value * 127),
        newNote.velocity
      )
    }
  }, [newNotes])
  return <></>
}
