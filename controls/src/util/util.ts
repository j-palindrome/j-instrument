import { Coordinate } from 'coordinate-systems'
import _ from 'lodash'
import { useRef, useState, useEffect, useMemo } from 'react'
import { BufferGeometry, Float32BufferAttribute, TypedArray } from 'three'

export const changeArrayResolution = (
  array: any[] | TypedArray,
  resolution: number
) => {
  const resChange = array.length / resolution
  let newArray: number[] = []
  for (let i = 0; i < array.length; i += resChange) {
    const index = Math.floor(i)
    const remainder = i - index
    newArray.push(
      lerp(array[index], array[index + 1] ?? array[index], remainder)
    )
  }
  return newArray
}

export const lerp = (start: number, end: number, progress: number) =>
  start + (end - start) * progress

export const mtof = (m: number) => {
  return 440 * 2 ** ((m - 69) / 12)
}

export const useEventListener = <K extends keyof WindowEventMap>(
  listener: K,
  func: (data: WindowEventMap[K]) => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    window.addEventListener(listener, func)
    return () => window.removeEventListener(listener, func)
  }, dependencies)
}

export const useInterval = (
  interval: () => void,
  intervalTime: number,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const intervalIndex = window.setInterval(interval, intervalTime)
    return () => window.clearInterval(intervalIndex)
  }, dependencies)
}

export const useMemoCleanup = <T>(
  func: () => T,
  cleanup: (previous: T) => void,
  dependencies: any[] = []
) => {
  const stateRef = useRef<T | null>(null)

  const state = useMemo(() => {
    if (stateRef.current) {
      cleanup(stateRef.current)
    }
    const stateInit = func()
    stateRef.current = stateInit
    return stateInit
  }, dependencies)
  return state
}

export const useEffectState = <T>(
  func: () => T,
  cleanup: (input: T) => void,
  deps: any[] = []
) => {
  const [state, setState] = useState<T | null>(null)
  useEffect(() => {
    const init = func()
    setState(init)
    return () => cleanup(init)
  }, deps)

  return state
}

export const scale = <T extends number | number[]>(
  input: T,
  low: number,
  high: number,
  lowOut: number,
  highOut: number,
  exp: number = 1
): T => {
  console.log('scaling', input, low, high, lowOut, highOut)

  const scaleNumber = (input: number) => {
    if (high === low) return lowOut
    const zTo1 = ((input - low) / (high - low)) ** exp
    return zTo1 * (highOut - lowOut) + lowOut
  }
  if (input instanceof Array) {
    return input.map(value => scaleNumber(value)) as T
  } else {
    return scaleNumber(input) as T
  }
}

// separate state gets and sets by array to prevent overwriting of elements
export const useStateTuple = <T extends Array<any>>(
  initialValue: T,
  useEffectTuple?: (updatedValue: T[number], index: number) => void
): [T, (index: number, T: T[number]) => void] => {
  const states = initialValue.map(value => useState<any>(value))

  return [
    states.map(([state, _setState]) => state) as T,
    // call setState() on the particular index
    (index: number, value: T[number]) => {
      states[index][1](value)
      if (useEffectTuple) useEffectTuple(value, index)
    }
  ]
}

export const useRefAsState = <T>(
  initialValue: T | null
): [T, (set: T) => void, () => T] => {
  const ref = useRef<T | null>(initialValue)
  const setRef = (newValue: T) => {
    ref.current = newValue
  }
  const getRef = () => ref.current!
  return [ref.current!, setRef, getRef]
}

export const useStateAsRef = <T>(
  initialValue: T
): [T, (T: T) => void, () => T] => {
  const [state, setState] = useState<T>(initialValue)
  const ref = useRef<T>(initialValue)
  ref.current = state
  const getRef = () => ref.current!
  return [state, setState, getRef]
}

export const getOffset = (x: number, y: number, target: HTMLElement) => {
  return { x: x - target.clientLeft, y: y - target.clientTop }
}

export const polar = (r: number, amt: number) =>
  Coordinate.polarToCart2d({ coordinate: [r, Math.PI * 2 * amt] })

export function separateGroups(bufGeom: BufferGeometry) {
  var outGeometries: BufferGeometry[] = []

  var groups = bufGeom.groups

  var origVerts = bufGeom.getAttribute('position').array
  var origNormals = bufGeom.getAttribute('normal').array
  var origNumVerts = Math.floor(origVerts.length / 3)

  for (var ig = 0, ng = groups.length; ig < ng; ig++) {
    var group = groups[ig]

    var destNumVerts = group.count

    var newBufGeom = new BufferGeometry()
    var newPositions = new Float32Array(destNumVerts * 3)
    var newNormals = new Float32Array(destNumVerts * 3)

    for (var iv = 0; iv < destNumVerts; iv++) {
      var indexOrig = 3 * (group.start + iv)
      var indexDest = 3 * iv

      newPositions[indexDest] = origVerts[indexOrig]
      newPositions[indexDest + 1] = origVerts[indexOrig + 1]
      newPositions[indexDest + 2] = origVerts[indexOrig + 2]

      newNormals[indexDest] = origNormals[indexOrig]
      newNormals[indexDest + 1] = origNormals[indexOrig + 1]
      newNormals[indexDest + 2] = origNormals[indexOrig + 2]
    }

    newBufGeom.setAttribute(
      'position',
      new Float32BufferAttribute(newPositions, 3)
    )
    newBufGeom.setAttribute('normal', new Float32BufferAttribute(newNormals, 3))

    outGeometries.push(newBufGeom)
  }

  return outGeometries
}
