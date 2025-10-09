import { $editor } from './globals/editor'
import { renderEditor } from './rendering/renderMain'
import { canvas, ctx } from '../ui/GameView/GameCanvas'
import { $settings } from './globals/settings'
import { handleEditorInput, handleMouseMove } from './logic/input'

export default function setupEditor(): () => void {
  let handle: number

  canvas.addEventListener('mousemove', handleMouseMove)
  canvas.addEventListener('mousedown', handleEditorInput)
  canvas.addEventListener('touchstart', handleEditorInput)

  const scale = $settings.scale
  $settings.scale = $editor.scale

  handle = requestAnimationFrame(loop)
  function loop(): void {
    if (ctx !== undefined) {
      renderEditor(ctx)
    }
    handle = requestAnimationFrame(loop)
  }

  return () => {
    canvas.removeEventListener('mousemove', handleMouseMove)
    canvas.removeEventListener('mousedown', handleEditorInput)
    canvas.removeEventListener('touchstart', handleEditorInput)
    cancelAnimationFrame(handle)
    $settings.scale = scale
  }
}
