import { $game } from '../globals/game'
import drawWorld from './world'
import drawText from './text'
import drawUI from './ui'
import drawSky from './weather'
import { toCanvas, $render, saveRestore } from './common'
import { $player } from '../globals/world'

/**
 * Tracks current mouse position
 */
onmousemove = (e: MouseEvent) => {
  if (!$game.paused) {
    $render.mouseX = Math.floor(Math.round(toCanvas($game.focusX) - window.innerWidth / 2 + e.clientX) / $game.grid)
    $render.mouseY = Math.floor(Math.round(toCanvas($game.focusY) - window.innerHeight / 2 + e.clientY) / $game.grid)
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
    drawWorld(ctx)

    if (editor) {
      ctx.strokeStyle = 'white'
      ctx.strokeRect(toCanvas($game.focusX), toCanvas($game.focusY), $game.grid, $game.grid)
    } else {
      $game.focusX = $player.x
      $game.focusY = $player.y
    }

    //* mouse position *//
    ctx.fillStyle = 'rgba(250,250,250,0.5)'
    ctx.fillRect(toCanvas($render.mouseX), toCanvas($render.mouseY), $game.grid, $game.grid)
    if ($game.showLiveDebug) drawText(ctx, `${$render.mouseX},${$render.mouseY}`, toCanvas($render.mouseX), toCanvas($render.mouseY), { color: 'white' })
  }, true)

  //* shade overlay *//
  ctx.fillStyle = `rgba(0,0,0,${$render.shade})`
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

  drawUI(ctx, editor)
}
