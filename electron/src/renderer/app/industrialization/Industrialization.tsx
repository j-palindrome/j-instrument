import { useEffect, useMemo, useRef } from 'react'
import { useAppStore } from '../../util/store'
import _, { find, findIndex, maxBy, minBy, range, sortBy, times } from 'lodash'
import { MIDI_BOTTOM, MIDI_TOP } from '../Piano'
import { scale } from '../../util/util'

export default function Industrialization() {
  const newNote = useAppStore((state) => maxBy(state.notes, (x) => x.started)!)
  const newVoice = useAppStore((state) => state.notes.indexOf(newNote) + 1)

  const totalTime = useRef(range(21).map(() => 0))
  // each index is where that recording ends (in terms of total ms)
  const timeSums = useRef(range(21).map(() => 0))

  useEffect(() => {
    const totalTime = _.last(timeSums.current)!
    let startTime = ((newNote.value + MIDI_BOTTOM) / (MIDI_TOP - MIDI_BOTTOM)) * totalTime

    // find the recording which ends before it
    const endsAfter = _.findLastIndex(timeSums.current, (ending) => ending < startTime)

    if (endsAfter === -1) {
      // it's in the first recording
      window.electron.ipcRenderer.send('osc', '/selectBuffer', `setvalue ${newVoice} set sounds.1`)
    } else {
      // it's after something
      // ex: after the 1st recording (index 0), so in 2nd buffer. Set to be ending after endsAfter (0) + 2
      startTime -= timeSums.current[endsAfter]

      window.electron.ipcRenderer.send(
        'osc',
        '/selectBuffer',
        `setvalue ${newVoice} set sounds.${endsAfter + 2}`
      )
    }

    window.electron.ipcRenderer.send(
      'osc',
      '/note-in',
      `setvalue ${newVoice} ${!newNote.velocity ? `stop` : `start ${startTime} ${scale(newNote.velocity, 0.2, 1, 0.3, 3, 2)}`}`
    )
  }, [newNote])

  useEffect(() => {
    window.electron.ipcRenderer.on('/totalTime', (_ev, index: number, length: number) => {
      totalTime.current[index] = length
      let sum = 0
      timeSums.current = totalTime.current.map((x, i) => {
        sum += x
        return sum
      })
    })
  }, [])

  return (
    <div>
      <h2>speed</h2>
      <div className="flex space-x-2">
        <input
          type="range"
          min={0.1}
          max={5}
          defaultValue={1}
          step={0.01}
          onChange={(ev) => {
            window.electron.ipcRenderer.send('osc', '/speed', ev.target.value)
          }}
        ></input>
        <button onClick={() => window.electron.ipcRenderer.send('osc', '/speed', 1)}>1</button>
      </div>

      <h2>ted</h2>
      <div className="flex space-x-2">
        <input
          type="range"
          min={0.1}
          defaultValue={1}
          max={1.5}
          step={0.01}
          onChange={(ev) => {
            window.electron.ipcRenderer.send('osc', '/ted', ev.target.value)
          }}
        ></input>
        <button onClick={() => window.electron.ipcRenderer.send('osc', '/ted', 1)}>1</button>
        <button onClick={() => window.electron.ipcRenderer.send('osc', '/ted', 0)}>0</button>
      </div>
    </div>
  )
}
