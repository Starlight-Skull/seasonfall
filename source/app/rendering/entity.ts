import type { Entity } from '../classes/Entity'
import { Hero } from '../classes/Entity/Hero'
import { settings, world } from '../globals'
import { drawText } from './text'
import { grid, saveRestore } from './common'

/**
 * Draws a given entity according to its properties.
 */
export function drawEntity(ctx: CanvasRenderingContext2D, entity: Entity): void {
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

/**
 * Draws HP, MP, XP, name and debug info relative to the given entity.
 */
export function drawStats(ctx: CanvasRenderingContext2D, entity: Entity): void {
  let x = grid(entity.x + entity.width / 2)
  let y = grid(entity.y)
  if (entity instanceof Hero) {
    //* name *//
    drawText(ctx, entity.heroName, x, y - 65, { color: 'rgb(255,255,255)', center: true })
    //* xp *//
    if (entity.stats.xp !== 0) {
      drawText(ctx, `${entity.stats.xp}`, x, y - 95, { color: 'rgb(0,255,0)', center: true })
    }
  } else {
    //* hp *//
    if (entity.stats.hp > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.fillRect(x - entity.stats.maxHP * 1.5 / 2 - 5, y - 60, entity.stats.maxHP * 1.5 + 10, 20)
      ctx.fillStyle = 'rgba(255,0,0,0.7)'
      ctx.fillRect(x - entity.stats.hp * 1.5 / 2, y - 55, entity.stats.hp * 1.5, 10)
    }
    //* mp *//
    if (entity.stats.mp > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.fillRect(x - entity.stats.maxMP * 1.5 / 2 - 5, y - 40, entity.stats.maxMP * 1.5 + 10, 15)
      ctx.fillStyle = 'rgba(0,0,255,0.7)'
      ctx.fillRect(x - entity.stats.mp * 1.5 / 2, y - 40, entity.stats.mp * 1.5, 10)
    }
    //* debug *//
    if (world.showLiveDebug) {
      const val = `${entity.movement.left ? '←' : ''}${entity.movement.down ? '↓' : ''}${entity.movement.attack ? '#' : ''}${entity.movement.jump ? '▲' : ''}${entity.movement.right ? '→' : ''}`
      drawText(ctx, val, x, y - 95, { color: 'rgb(255,255,255)', center: true })
    }
  }
}
