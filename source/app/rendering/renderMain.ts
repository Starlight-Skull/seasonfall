import { $game } from '../globals/game'
import drawWorld from './objects/world'
import drawText from './ui/text'
import drawGameUI from './ui/gameUI'
import { drawEditorUIParts, drawEditorUIText } from './ui/editorUI'
import drawWeather, { drawSky, drawOverlay } from './weather'
import { $render, translateContext } from './common'
import { $player, $world } from '../globals/world'
import { FONTS } from '../globals/fonts'
import { $settings } from '../globals/settings'

/**
 * Game render loop.
 */
export default function renderGame(ctx: CanvasRenderingContext2D): void {
  $render.shade = drawSky(ctx)
  $game.focusX = $player.x
  $game.focusY = $player.y

  translateContext(ctx, () => {
    drawWeather(ctx, $world.rain)
    drawWorld(ctx)
  })
  drawOverlay(ctx, $render.shade)
  drawGameUI(ctx)
  if ($settings.showFPS) drawFpsCounter(ctx)
}

/**
 * Editor render loop.
 */
export function renderEditor(ctx: CanvasRenderingContext2D): void {
  drawSky(ctx)
  translateContext(ctx, () => {
    drawWorld(ctx)
    drawEditorUIParts(ctx)
  })
  drawEditorUIText(ctx)
  if ($settings.showFPS) drawFpsCounter(ctx)
}

function drawFpsCounter(ctx: CanvasRenderingContext2D) {
  $game.frames++
  drawText(ctx, `${$game.fps}`, 0, 0, {
    color: 'rgb(0,255,0)',
    size: 15,
    style: FONTS.PixeloidMono
  })
}
