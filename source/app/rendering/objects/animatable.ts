import Animatable from '../../classes/Animatable'
import { $game } from '../../globals/game'
import { $settings } from '../../globals/settings'
import { toCanvas, saveRestore } from '../common'

/**
 * Draws a given animatable according to its properties.
 * Use in translated context.
 * @param gridY - Relative X coordinate.
 * @param gridX - Relative Y coordinate.
 * @param sprite - The animatable to draw.
 */
export default function drawAnimatable(
  ctx: CanvasRenderingContext2D,
  gridY: number,
  gridX: number,
  sprite: Animatable,
): void {
  let x = toCanvas(gridX)
  let y = toCanvas(gridY)
  let w = toCanvas(sprite.width)
  let h = toCanvas(sprite.height)
  let animW = sprite.animation.width * $settings.scale
  let animH = sprite.animation.height * $settings.scale
  let animX = x
  let animY = y
  saveRestore(ctx, () => {
    if (sprite.mirrored) {
      ctx.scale(-1, 1)
      x = -x - $game.grid
      animX = -animX - $game.grid
    }
    ctx.drawImage(
      sprite.animation.image,
      sprite.animation.x +
        sprite.animation.width * Math.floor(sprite.animationFrame),
      sprite.animation.y,
      sprite.animation.width,
      sprite.animation.height,
      animX,
      animY,
      animW,
      animH
    )
    if ($game.showBoxes) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.fillRect(x, y, w, h)
      ctx.strokeRect(animX, animY, animW, animH)
    }
  })
}
