export const keys = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  ';',
  "'",
  'enter',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '/'
]

export function mapScale(scale: number[], range: [number, number]) {
  const KEY_NUM = keys.length
  let pitch = 0
  let mappedScale: number[] = []
  for (let key = 0; key < KEY_NUM; key++) {
    const scaleDegree = scale[key % scale.length]
    pitch += scaleDegree
    mappedScale.push(pitch)
  }
  const maxPitch = pitch
  const span = range[1] - range[0]
  mappedScale = mappedScale.map((note) => range[0] + (note / maxPitch) * span)
  console.log(range, span, maxPitch, mappedScale)

  return mappedScale
}

export const velocityKeys = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-']
