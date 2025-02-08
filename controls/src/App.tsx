import { useEffect, useState } from 'react'
import { SocketProvider } from './context'
import { AppState, getters, initialGlobal, setters } from './store'
import { Socket, io } from 'socket.io-client'
import { AsemicCanvas, useAsemic } from '../asemic/src/Asemic'
import LineBrush from '../asemic/src/LineBrush'
import DashBrush from '../asemic/src/DashBrush'
import { GroupBuilder } from '../asemic/src/Builder'

function App() {
  const [socket, setSocket] = useState<Socket<SocketEvents, SocketEvents>>()

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const audioInputs = devices.filter(device => device.kind === 'audioinput')
      console.log('Available audio inputs:', audioInputs)
    })
  }, [])

  useEffect(() => {
    const socket: Socket<SocketEvents, SocketEvents> = io()
    setSocket(socket)

    socket.emit('loadPresets', presets => {
      const newPresets: AppState['presets'] = JSON.parse(presets)
      const defaultKeys = Object.keys(initialGlobal)

      for (let value of Object.values(newPresets)) {
        for (let key of defaultKeys) {
          if (value[key] === undefined) {
            value[key] = initialGlobal[key]
          }
        }
      }

      setters.set({
        presets: newPresets
      })
    })

    socket.on('setFiles', files => {
      setters.set({ files })
      setters.setPreset(
        {
          video_file1: files[0] ?? undefined,
          video_file2: files[0] ?? undefined
        },
        socket
      )
    })

    return () => {
      socket.close()
    }
  }, [])

  return (
    <SocketProvider socket={socket}>
      <>
        <AsemicCanvas useAudio outputChannel={18}>
          <Scene />
        </AsemicCanvas>
      </>
    </SocketProvider>
  )
}

export default App

function Scene() {
  const { h } = useAsemic()
  return (
    <>
      <LineBrush
        onInit={g =>
          g
            .newText('hello human, how are you', { thickness: 1 })
            .setProcess('all', { width: 1, center: 0.5, middle: 0.5 * h })
        }
      />
    </>
  )
}
