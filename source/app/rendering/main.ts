import { world } from '../globals'
import { drawWorld } from './world'
import { drawText } from './text'
import { drawUI } from './ui'
import { drawSky } from './weather'
import { grid, render, saveRestore } from './common'

/**
 * Tracks current mouse position
 */
onmousemove = (e: MouseEvent) => {
  if (!world.paused) {
    render.mouseX = Math.floor(Math.round(grid(world.focusX) - window.innerWidth / 2 + e.clientX) / world.grid)
    render.mouseY = Math.floor(Math.round(grid(world.focusY) - window.innerHeight / 2 + e.clientY) / world.grid)
  }
}

/**
 * Main render loop.
 */
export function drawMain(ctx: CanvasRenderingContext2D): void {
  // has to be disabled so pixel art isn't blurry
  ctx.imageSmoothingEnabled = false
  drawSky(ctx)

  // todo reimplement weather
  // if (weather.rain > 0 || weather.snow > 0) {
  //   for (let i = 0; i < animTileList.length; i++) {
  //     animTileList[i].activate()
  //     animTileList[i].frame.mirrored = (weather.windDeg === 'East')
  //     animTileList[i].animation.speed = weather.windSpeed / 10
  //     animTileList[i].isSnow = (weather.snow > 0)
  //     drawTile(animTileList[i])
  //   }
  // }

  saveRestore(ctx, () => {
    ctx.translate(render.focusX, render.focusY)
    drawWorld(ctx)

    //* mouse position *//
    ctx.fillStyle = 'rgba(250,250,250,0.5)'
    ctx.strokeStyle = 'white'
    ctx.fillRect(grid(render.mouseX), grid(render.mouseY), world.grid, world.grid)
    if (world.showLiveDebug) drawText(ctx, `${render.mouseX},${render.mouseY}`, grid(render.mouseX), grid(render.mouseY), { color: 'white' })
    //* focus point *//
    ctx.strokeRect(grid(world.focusX), grid(world.focusY), world.grid, world.grid)
  })

  //* shade overlay *//
  ctx.fillStyle = `rgba(0,0,0,${world.shade})`
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

  drawUI(ctx)
}
