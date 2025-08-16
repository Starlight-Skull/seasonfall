import { $game } from './globals/game'
import { FONTS } from './globals/fonts'
import { $settings } from './globals/settings'
import handleGameInput from './logic/input'
import drawMain from './rendering/main'
import drawText from './rendering/text'
import { ctx } from '../ui/GameView/GameCanvas'

export default function setupGameLoop() {
  let handle: number
  window.addEventListener('mousedown', handleGameInput)
  window.addEventListener('mouseup', handleGameInput)
  window.addEventListener('keydown', handleGameInput)
  window.addEventListener('keyup', handleGameInput)

  function loop (dt: number): void {
    if (ctx !== undefined) {
      if (!$game.paused) drawMain(ctx, false)
      $game.frames++
      if ($settings.showFPS) drawText(ctx, `${$game.fps}`, 0, 0, { color: 'rgb(0,255,0)', size: 15, style: FONTS.PixeloidMono })
    }
    handle = requestAnimationFrame(loop)
  }
  handle = requestAnimationFrame(loop)

  return () => {
    window.removeEventListener('mousedown', handleGameInput)
    window.removeEventListener('mouseup', handleGameInput)
    window.removeEventListener('keydown', handleGameInput)
    window.removeEventListener('keyup', handleGameInput)
    cancelAnimationFrame(handle)
  }
}
