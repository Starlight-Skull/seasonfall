import type Entity from '../classes/Entity'
import Hero from '../classes/Entity/Hero'
import { $game } from '../globals/game'
import { toCanvas } from './common'
import drawText from './text'

/**
 * Draws HP, MP, XP, name and debug info relative to the given entity.
 */
export default function drawStats(ctx: CanvasRenderingContext2D, entity: Entity): void {
  let x = toCanvas(entity.x + entity.width / 2)
  let y = toCanvas(entity.y)
  if (entity instanceof Hero) {
    //* name *//
    drawText(ctx, entity.userName, x, y - 65, { color: 'rgb(255,255,255)', center: true })
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
    if ($game.showLiveDebug) {
      const val = `${entity.movement.left ? '←' : ''}${entity.movement.down ? '↓' : ''}${entity.movement.attack ? '#' : ''}${entity.movement.jump ? '▲' : ''}${entity.movement.right ? '→' : ''}`
      drawText(ctx, val, x, y - 95, { color: 'rgb(255,255,255)', center: true })
    }
  }
}
