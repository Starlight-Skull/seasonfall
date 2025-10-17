import Entity from '../../classes/Entity'
import { $game } from '../../globals/game'
import { $settings } from '../../globals/settings'
import drawText from '../ui/text'
import { toCanvas, saveRestore } from '../common'

/**
 * Draws a given entity according to its properties.
 * Use in translated context.
 */
export default function drawEntity(ctx: CanvasRenderingContext2D, entity: Entity): void {
  let w = toCanvas(entity.width)
  let h = toCanvas(entity.height)
  let x = toCanvas(entity.x)
  let y = toCanvas(entity.y)
  let animW = entity.animation.imageW * $settings.scale
  let animH = entity.animation.imageH * $settings.scale
  let animX = x - Math.abs(animW - w) / 2
  let animY = y - Math.abs(animH - h)
  saveRestore(ctx, () => {
    if (entity.mirrored) {
      ctx.scale(-1, 1)
      x *= -1
      w *= -1
      animX *= -1
      animW *= -1
    }
    // not-so-great fix for canvas2D inaccuracy
    ctx.drawImage(entity.animation.image,
      entity.animation.x + entity.animation.imageW * Math.floor(entity.animationFrame) + 0.01,
      entity.animation.y + 0.01,
      entity.animation.imageW - 0.02,
      entity.animation.imageH - 0.02,
      animX, animY, animW + 1, animH + 1)
    if ($game.showBoxes) {
      ctx.fillStyle = 'rgba(250,0,250,0.5)'
      ctx.strokeStyle = 'rgb(250,0,250)'
      ctx.fillRect(x, y, w, h)
      ctx.strokeRect(animX, animY, animW, animH)
    }
  })
  if ($game.showCoords) {
    drawText(ctx, `${entity.x.toFixed(1)},${entity.y.toFixed(1)}`, toCanvas(entity.x), toCanvas(entity.y), { size: 3, color: 'rgb(250,0,250)' })
  }
}
