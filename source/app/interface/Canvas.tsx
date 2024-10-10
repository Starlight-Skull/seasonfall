import React, { createRef, useEffect, useState, type RefObject } from 'react'

export let ctx: CanvasRenderingContext2D | undefined

interface Props {}

export default function Canvas(props: Props) {
  const canvasRef: RefObject<HTMLCanvasElement> = createRef()
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    if (canvasRef.current) {
      ctx = canvasRef.current.getContext('2d') ?? undefined
      console.log('once');
    }
  }, [])

  useEffect(() => {
    const handleResize = (ev: UIEvent) => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })


  return <canvas id="screen" ref={canvasRef} width={width} height={height} />
}
