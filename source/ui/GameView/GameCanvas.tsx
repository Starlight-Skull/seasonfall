import React, { createRef, useEffect, useState, type RefObject } from 'react'
import { getFrameCount } from '../../app/helpers'

export let ctx: CanvasRenderingContext2D | undefined

export default function GameCanvas() {
  const canvasRef: RefObject<HTMLCanvasElement> = createRef()
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    if (canvasRef.current) ctx = canvasRef.current.getContext('2d') ?? undefined
    if (ctx !== undefined) ctx.imageSmoothingEnabled = false
    return () => ctx = undefined
  })

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
      if (ctx !== undefined) ctx.imageSmoothingEnabled = false
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  useEffect(() => {
    const interval = setInterval(getFrameCount, 1000)
    return () => clearInterval(interval)
  })

  return <canvas ref={canvasRef} width={width} height={height} />
}
