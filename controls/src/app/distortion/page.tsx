'use client'

import { useNewNotes } from '@/util/store'
import { useEffect } from 'react'

export default function Distortion() {
  const newNotes = useNewNotes()
  useEffect(() => {
    for (let newNote of newNotes) {
      window.max?.outlet(
        '/note-in',
        newNote.value * 5000,
        newNote.velocity * 2 * newNote.value * 5000,
        newNote.velocity ? 1 : 0
      )
    }
  }, [newNotes])
  return <></>
}
