import * as math from 'mathjs'

const xor = (notes: number[], i: number): [number, number] => {
  if (notes.length === 0) return [0, 0]

  const xPoints = [notes[0], notes[1]].sort()
  const yPoints = [notes[2], notes[3]].sort()
  const zPoints = [notes[4], notes[5]].sort()

  const x = xPoints[0] ? math.round(math.mod(i, xPoints[0]) / (xPoints[1] ?? xPoints[0])) : 0
  const y = yPoints[0] ? math.round(math.mod(i, yPoints[0]) / (yPoints[1] ?? yPoints[0])) : 0
  const z = zPoints[0] ? math.round(math.mod(i, zPoints[0]) / (zPoints[1] ?? zPoints[0])) : 0

  if (z) {
    return [
      math.xor(math.xor(x, y) ? 1 : 0, math.xor(y, z) ? 1 : 0) ? 1 : -1,
      math.xor(math.xor(x, y) ? 1 : 0, math.xor(y, z) ? 1 : 0) ? 1 : -1
    ]
  } else if (y) {
    return [math.xor(x, y) ? 1 : -1, math.xor(x, y) ? 1 : -1]
  } else if (x) {
    return [x ? 1 : -1, x ? 1 : -1]
  } else return [0, 0]
}

export const generateFunctionPoints = (notes: number[]): [number[], number[]] => {
  const points: number[] = []
  const points2: number[] = []

  for (let i = 0; i < 1024; i++) {
    const gen = xor(notes, i)
    points.push(gen[0])
    points2.push(gen[1])
  }

  return [points, points2]
}
