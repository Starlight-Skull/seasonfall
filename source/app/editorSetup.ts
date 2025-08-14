import { world } from './globals/world'
import { FONTS } from './globals/fonts'
import drawMain from './rendering/main'
import drawText from './rendering/text'
import { ctx } from '../ui/GameView/GameCanvas'
import { render } from './rendering/common'

export default function setupEditor() {
  let handle: number
  window.addEventListener('mousedown', setWorldFocus)

  function loop (): void {
    if (ctx !== undefined) {
      drawMain(ctx, true)
      world.frames++
      drawText(ctx, `${world.fps}`, 0, 0, { color: 'rgb(0,255,0)', size: 15, style: FONTS.PixeloidMono })
    }
    handle = requestAnimationFrame(loop)
  }
  handle = requestAnimationFrame(loop)

  return () => {
    window.removeEventListener('mousedown', setWorldFocus)
    cancelAnimationFrame(handle)
  }
}

function setWorldFocus (e: MouseEvent) {
  if (e.button === 2) {
    world.focusX = render.mouseX;
    world.focusY = render.mouseY;
  }
}
