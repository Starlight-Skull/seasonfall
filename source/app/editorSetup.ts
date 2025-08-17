import { $editor } from './globals/editor'
import { $game } from './globals/game'
import { FONTS } from './globals/fonts'
import drawMain from './rendering/main'
import drawText from './rendering/text'
import { ctx } from '../ui/GameView/GameCanvas'
import { $render } from './rendering/common'
import { $settings } from './globals/settings'
import { $world } from './globals/world'

export default function setupEditor() {
  let handle: number
  window.addEventListener('mousedown', setWorldFocus)

  const scale = $settings.scale
  $settings.scale = $editor.scale
  $game.showLiveDebug = $editor.showLiveDebug
  $game.showBoxes = $editor.showBoxes

  function loop (): void {
    if (ctx !== undefined) {
      drawMain(ctx, true)
      $game.frames++
      drawText(ctx, `${$game.fps}`, 0, 0, { color: 'rgb(0,255,0)', size: 15, style: FONTS.PixeloidMono })
    }
    handle = requestAnimationFrame(loop)
  }
  handle = requestAnimationFrame(loop)

  return () => {
    window.removeEventListener('mousedown', setWorldFocus)
    cancelAnimationFrame(handle)
    $settings.scale = scale
    $game.showLiveDebug = false
    $game.showBoxes = false
  }
}

function setWorldFocus (e: MouseEvent) {
  if (e.button === 0) {
    $editor.selectedX = $render.mouseX
    $editor.selectedY = $render.mouseY
  } else if (e.button === 1) {
    if ($editor.foreground) {
      $world.foreground[$render.mouseY][$render.mouseX] = $editor.selectedTile
    } else {
      $world.background[$render.mouseY][$render.mouseX] = $editor.selectedTile
    }
  } else if (e.button === 2) {
    $game.focusX = $render.mouseX
    $game.focusY = $render.mouseY
  }
}
