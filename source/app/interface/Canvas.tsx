import React, { Component, createRef, type RefObject, type CSSProperties } from "react"


export let ctx: CanvasRenderingContext2D | undefined

export default class Canvas extends Component {
  canvasRef: RefObject<HTMLCanvasElement> = createRef()

  state = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  componentDidMount(): void {
    if (this.canvasRef.current) {
      ctx = this.canvasRef.current.getContext('2d') ?? undefined

      window.addEventListener('resize', (e) => {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
      })
    }
  }

  render() {
    return (
      <canvas id="screen" ref={this.canvasRef} width={this.state.width} height={this.state.height} />
    )
  }

  style: CSSProperties = {}
}
