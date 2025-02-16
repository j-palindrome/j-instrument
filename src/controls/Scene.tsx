import { Asemic, useAsemic } from '@libs/asemic/src/Asemic'
import LineBrush from '@libs/asemic/src/LineBrush'
import { ReactNode } from 'react'

export default (
  <>
    <Asemic
      audio={e => [
        e.mul(
          e.div(
            e.add(e.cycle(900), e.cycle(370), e.mul(e.cycle(800), 0.2)),
            2 + 0.2
          ),
          0.1
        ),
        e.mul(e.cycle(440.049), 0.1)
      ]}>

        <LineBrush
          onInit={g =>
            g
              .newText('but the morning winks', { thickness: 1 })
              .setProcess('all', { width: 1, center: 0.5, middle: 0.5 * h })
          }
        />
}
    </Asemic>
  </>
)
