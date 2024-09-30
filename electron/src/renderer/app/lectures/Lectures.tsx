import { useEffect, useMemo, useRef } from 'react'
import { useAppStore } from '../../util/store'
import _, { find, findIndex, maxBy, minBy, sortBy, times } from 'lodash'
import { MIDI_BOTTOM, MIDI_TOP } from '../Piano'
import { scale } from '../../util/util'

export default function Lectures() {
  const newNote = useAppStore((state) => sortBy(state.notes, (x) => -x.started)[0])
  const newVoice = useAppStore((state) => state.notes.indexOf(newNote))

  const totalTime = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0])
  // each index is where that recording ends (in terms of total ms)
  const timeSums = useRef([0, 0, 0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {
    // const timeTotal = _.sum(totalTime.current)
    // const startTime = ((newNote.value + 50) / 220) * timeTotal

    // // time greater than start
    // let startAfter = _.findIndex(timeSums.current, (time) => time > startTime)
    // let adjustedMilliseconds
    // if (startAfter === -1) {
    //   // nothing after it, don't do anything
    //   adjustedMilliseconds = startTime
    //   window.electron.ipcRenderer.send(
    //     'osc',
    //     '/selectBuffer',
    //     `setvalue ${newNote.voice + 1} set speeches.1`
    //   )
    // } else {
    //   // it's after one of the recordings
    //   adjustedMilliseconds = startTime - timeSums.current[startAfter]
    //   window.electron.ipcRenderer.send(
    //     'osc',
    //     '/selectBuffer',
    //     `setvalue ${newNote.voice + 1} set speeches.${startAfter + 1}`
    //   )
    // }

    // const formattedValues = `setvalue ${newNote.voice + 1} ${!newNote.velocity ? 'stop' : `start ${adjustedMilliseconds}`}`

    const totalTime = _.last(timeSums.current)!
    let startTime = scale(newNote.value, MIDI_BOTTOM, MIDI_TOP, 0, 1) * totalTime
    // find the recording which ends before it
    const endsAfter = _.findLastIndex(timeSums.current, (ending) => ending < startTime)

    if (endsAfter === -1) {
      // it's in the first recording
      window.electron.ipcRenderer.send(
        'osc',
        '/selectBuffer',
        `setvalue ${newVoice} set speeches.1`
      )
    } else {
      // it's after something
      // ex: after the 1st recording (index 0), so in 2nd buffer. Set to be ending after endsAfter (0) + 2
      startTime -= timeSums.current[endsAfter]
      window.electron.ipcRenderer.send(
        'osc',
        '/selectBuffer',
        `setvalue ${newVoice} set speeches.${endsAfter + 2}`
      )
    }

    window.electron.ipcRenderer.send(
      'osc',
      '/values',
      `setvalue ${newVoice} ${!newNote.started ? `stop` : `start ${startTime}`}`
    )
  }, [newNote])

  useEffect(() => {
    window.electron.ipcRenderer.on('/totalTime', (_ev, index: number, length: number) => {
      totalTime.current[index] = length
      timeSums.current = totalTime.current.map((x, i) => _.sum(totalTime.current.slice(0, i + 1)))
    })
  }, [])

  return (
    <div>
      <select
        onChange={(ev) => {
          const val = Number(ev.target.value)
          window.electron.ipcRenderer.send('osc', '/selectedBuffer', val)
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </div>
  )
}
