import { $editor } from './globals/editor'
import { renderEditor } from './rendering/renderMain'
import { ctx } from '../ui/GameView/GameCanvas'
import { $settings } from './globals/settings'
import { handleMouseMove, setWorldFocus } from './logic/input'

export default function setupEditor(): () => void {
  let handle: number
  window.addEventListener('mousedown', setWorldFocus)

  const scale = $settings.scale
  $settings.scale = $editor.scale

  handle = requestAnimationFrame(loop)
  function loop (): void {
    if (ctx !== undefined) {
      renderEditor(ctx)
    }
    handle = requestAnimationFrame(loop)
  }

  window.addEventListener('mousemove', handleMouseMove)

  return () => {
    window.removeEventListener('mousedown', setWorldFocus)
    window.removeEventListener('mousemove', handleMouseMove)
    cancelAnimationFrame(handle)
    $settings.scale = scale
  }
}
