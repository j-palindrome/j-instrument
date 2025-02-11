import { useAsemic } from '@libs/asemic/src/Asemic'
import LineBrush from '@libs/asemic/src/LineBrush'

export default function Scene() {
  const { h } = useAsemic({
    audio: e => [
      e.div(
        e.add(e.cycle(900), e.cycle(370), e.mul(e.cycle(800), 0.2)),
        2 + 0.2
      ),
      e.cycle(440.049)
    ],
    controls: {
      constants: {},
      uniforms: {},
      refs: {}
    }
  })
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
