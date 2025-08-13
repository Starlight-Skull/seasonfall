import Entity from '../classes/Entity'
import { world } from '../globals/world'
import { settings } from '../globals/settings'
import drawText from './text'
import { grid, saveRestore } from './common'

/**
 * Draws a given entity according to its properties.
 */
export default function drawEntity(ctx: CanvasRenderingContext2D, entity: Entity): void {
  let w = grid(entity.width)
  let h = grid(entity.height)
  let x = grid(entity.x)
  let y = grid(entity.y)
  let animW = entity.animation.width * settings.scale
  let animH = entity.animation.height * settings.scale
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
      entity.animation.x + entity.animation.width * Math.floor(entity.animationFrame) + 0.01,
      entity.animation.y + 0.01,
      entity.animation.width - 0.02,
      entity.animation.height - 0.02,
      animX, animY, animW + 1, animH + 1)
    if (world.showBoxes) {
      ctx.fillStyle = 'rgba(250,0,250,0.5)'
      ctx.strokeStyle = 'rgb(250,0,250)'
      ctx.fillRect(x, y, w, h)
      ctx.strokeRect(animX, animY, animW, animH)
    }
  })
  if (world.showLiveDebug) {
    drawText(ctx, `${(entity.x.toFixed(1))},${entity.y.toFixed(1)}`, grid(entity.x), grid(entity.y), { size: 15, color: 'rgb(250,0,250)' })
  }
}


