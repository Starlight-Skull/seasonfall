import { game } from '../globals/game'
import drawWorld from './world'
import drawText from './text'
import drawUI from './ui'
import drawSky from './weather'
import { grid, render, saveRestore } from './common'
import { player } from '../globals/level'

/**
 * Tracks current mouse position
 */
onmousemove = (e: MouseEvent) => {
  if (!game.paused) {
    render.mouseX = Math.floor(Math.round(grid(game.focusX) - window.innerWidth / 2 + e.clientX) / game.grid)
    render.mouseY = Math.floor(Math.round(grid(game.focusY) - window.innerHeight / 2 + e.clientY) / game.grid)
  }
}

/**
 * Main render loop.
 */
export default function drawMain(ctx: CanvasRenderingContext2D, editor: boolean): void {
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

    if (editor) {
      ctx.strokeStyle = 'white'
      ctx.strokeRect(grid(game.focusX), grid(game.focusY), game.grid, game.grid)
    } else {
      game.focusX = player.x
      game.focusY = player.y
    }

    //* mouse position *//
    ctx.fillStyle = 'rgba(250,250,250,0.5)'
    ctx.fillRect(grid(render.mouseX), grid(render.mouseY), game.grid, game.grid)
    if (game.showLiveDebug) drawText(ctx, `${render.mouseX},${render.mouseY}`, grid(render.mouseX), grid(render.mouseY), { color: 'white' })
  })

  //* shade overlay *//
  ctx.fillStyle = `rgba(0,0,0,${game.shade})`
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

  drawUI(ctx)
}
