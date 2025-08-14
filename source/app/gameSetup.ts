import { world } from './globals/world'
import { FONTS } from './globals/fonts'
import { settings } from './globals/settings'
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

  function game (dt: number): void {
    if (ctx !== undefined) {
      if (!world.paused) drawMain(ctx, false)
      world.frames++
      if (settings.showFPS) drawText(ctx, `${world.fps}`, 0, 0, { color: 'rgb(0,255,0)', size: 15, style: FONTS.PixeloidMono })
    }
    handle = requestAnimationFrame(game)
  }
  handle = requestAnimationFrame(game)

  return () => {
    window.removeEventListener('mousedown', handleGameInput)
    window.removeEventListener('mouseup', handleGameInput)
    window.removeEventListener('keydown', handleGameInput)
    window.removeEventListener('keyup', handleGameInput)
    cancelAnimationFrame(handle)
  }
}
