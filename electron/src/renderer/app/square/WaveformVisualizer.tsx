import { Line, OrthographicCamera } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { setters, getters, LENGTH } from '../../util/store'
import _ from 'lodash'
import { useEffect, useMemo } from 'react'
import { OrthographicCamera as ThreeOrthoCamera } from 'three'
import { useAppStore } from '../../util/store'
import { scale as scaleFunc } from '../../util/util'
import Slider from '../../components/Slider'

export default function WaveformVisualizer() {
  // useEffect(() => {
  //     let bufferData = buffer as Float32Array
  //     const max = _.max(bufferData.map((x) => Math.abs(x)))!
  //     const newPoints = bufferData.map((x) => x * (1 / max))
  //     setters.set({ points: new Float32Array(newPoints) })

  // }, [])

  const RAMP = useAppStore((state) => state.ramp)

  // const [inputLevel, setInputLevel] = useState(1)
  // useEffect(() => {
  //   audio.input.gain.gain.linearRampTo(inputLevel, RAMP)
  // }, [inputLevel])

  // const [poking, setPoking] = useState(false)
  // useEffect(() => {
  //   audio.poke.port.postMessage({ type: poking ? 'start' : 'stop' })
  // }, [poking])

  // const [recordingLength, setRecordingLength, getRecordingLength] = useStateAsRef(44100)
  // useEffect(() => {
  //   audio.poke.port.postMessage({
  //     type: 'setLength',
  //     length: recordingLength
  //   })
  // }, [recordingLength])

  // const [monitoring, setMonitoring] = useState(false)
  // useEffect(() => {
  //   audio.input.gain.gain.linearRampTo(monitoring ? 1 : 0, ramp)
  // })

  useEffect(() => {
    setters.set({
      audio: { ...getters.get('audio'), points: _.range(LENGTH).map(() => Math.random() * 2 - 1) }
    })
  }, [])

  return (
    <>
      <div className="w-full h-10 flex">
        {/* <button
          className={`${inputLevel ? '!bg-red-500' : ''}`}
          onClick={() => setInputLevel(inputLevel ? 0 : 1)}
        >
          input
        </button>
        <button
          className={`${monitoring ? '!bg-red-500' : ''}`}
          onClick={() => setMonitoring(!monitoring)}
        >
          amplitude
        </button>
        <button
          className={`${poking ? '!bg-red-500' : ''}`}
          onClick={() => {
            setPoking(!poking)
          }}
        >
          poke
        </button>

        {poking && (
          <Slider
            className="w-[100px] border border-white rounded-lg"
            innerClassName="bg-white h-full rounded-lg"
            onChange={({ x }, slider) => {
              slider.style.width = `${x * 100}%`
            }}
            onEnd={({ x }) => setRecordingLength(x ** 2 * 44100)}
            values={{ x: scaleFunc(recordingLength, 0, 44100, 0, 1, 1 / 2), y: 0 }}
          >
            length
          </Slider>
        )} */}
        <Slider
          className="w-[100px] h-full border border-white rounded-lg"
          innerClassName="bg-white h-full rounded-lg"
          onChange={({ x }, slider) => {
            slider.style.width = `${x * 100}%`
          }}
          onEnd={({ x }) => setters.set({ ramp: x ** 2 })}
          values={{ x: scaleFunc(RAMP, 0, 1, 0, 1, 1 / 2), y: 0 }}
        >
          ramp
        </Slider>
      </div>
      <Slider
        className="h-[100px] w-full select-none rounded-lg border border-white"
        onEnd={() => {
          setters.set({
            audio: {
              ...getters.get('audio'),
              points: _.range(LENGTH).map(() => Math.random() * 2 - 1)
            }
          })
        }}
        onChange={() => {}}
        values={{ x: 0, y: 0 }}
      >
        <Canvas className="w-full h-full" orthographic>
          <Scene />
        </Canvas>
      </Slider>
    </>
  )
}

function Scene() {
  const points = useAppStore((state) => state.audio.points)
  const { size } = useThree(({ camera: sceneCamera, size }) => {
    const camera = sceneCamera as ThreeOrthoCamera
    camera.near = 0
    camera.far = 1
    camera.left = 0
    camera.right = 1
    camera.top = 1.1
    camera.bottom = -1.1
    return { size }
  })
  const pointsMap = useMemo(
    () => _.map(points, (y, i) => [i / (points.length - 1), y, 0] as [number, number, number]),
    [points, size]
  )
  return (
    <>
      <OrthographicCamera
        makeDefault
        near={0}
        far={1}
        left={0}
        right={1}
        top={1}
        bottom={-1}
        position={[0, 0, 0]}
      />
      <Line position={[0, 0, 0]} points={pointsMap} lineWidth={1} color="white" />
    </>
  )
}
