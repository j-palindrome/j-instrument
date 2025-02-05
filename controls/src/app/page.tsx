'use client'
import Image from 'next/image'
import { AsemicCanvas, useAsemic } from '../../asemic/src/Asemic'
import LineBrush from '../../asemic/src/LineBrush'
import DashBrush from '../../asemic/src/DashBrush'

export default function Home() {
  return (
    <AsemicCanvas>
      <Scene></Scene>
    </AsemicCanvas>
  )
}

function Scene() {
  const { h } = useAsemic()
  console.log(h)

  return (
    <>
      <LineBrush
        onInit={b => b.newCurve([0, 0, { thickness: 1 }], [1, h])}></LineBrush>
    </>
  )
}
