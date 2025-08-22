import { $editor } from './globals/editor'
import { renderEditor } from './rendering/renderMain'
import { canvas, ctx } from '../ui/GameView/GameCanvas'
import { $settings } from './globals/settings'
import { handleMouseMove } from './logic/input'

export default function setupEditor(): () => void {
  let handle: number

  const scale = $settings.scale
  $settings.scale = $editor.scale

  handle = requestAnimationFrame(loop)
  function loop(): void {
    if (ctx !== undefined) {
      renderEditor(ctx)
    }
    handle = requestAnimationFrame(loop)
  }
  canvas.addEventListener('mousemove', handleMouseMove)

  return () => {
    canvas.removeEventListener('mousemove', handleMouseMove)
    cancelAnimationFrame(handle)
    $settings.scale = scale
  }
}
