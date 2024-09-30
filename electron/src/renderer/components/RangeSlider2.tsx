import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

const RangeSlider2 = forwardRef(function RangeSlider(
  {
    onChange
  }: {
    onChange: (values: [number, number]) => void
  },
  ref
) {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1)
  const values = [min, max].sort() as [number, number]
  const curValue = useRef(0)

  useImperativeHandle(ref, () => {
    return {
      setMin,
      setMax
    }
  })

  useEffect(() => {
    onChange(values)
  }, [min, max])

  const mouseDown = useRef(false)

  return (
    <div className="w-full relative h-12 border border-white rounded-lg">
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        onChange={(ev) => (curValue.current = ev.target.valueAsNumber)}
        onMouseDown={() => {
          mouseDown.current = true
          setTimeout(() => setMin(curValue.current))
        }}
        onMouseUp={() => (mouseDown.current = false)}
        onMouseMove={() => {
          if (!mouseDown.current) return
          setMax(curValue.current)
        }}
        className="w-full h-full opacity-0"
      ></input>
      <div
        className="bg-white h-full absolute -z-10"
        style={{
          top: 0,
          left: `${values[0] * 100}%`,
          width: `${(values[1] - values[0]) * 100}%`
        }}
      ></div>
    </div>
  )
})

export default RangeSlider2
