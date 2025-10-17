import type Entity from '../../classes/Entity'
import Hero from '../../classes/Entity/Hero'
import { $game } from '../../globals/game'
import { toCanvas } from '../common'
import { drawUIBar } from './bar'
import drawText from './text'

/**
 * Draws HP, MP, XP, name and debug info relative to the given entity.
 * Use in translated context.
 * @param entity - Entity to use.
 */
export default function drawStats(
  ctx: CanvasRenderingContext2D,
  entity: Entity
): void {
  let x = toCanvas(entity.x + entity.width / 2)
  let y = toCanvas(entity.y + entity.height)
  const scale = 0.3

  if (entity instanceof Hero) {
    // y = drawText(ctx, entity.userName, x, y, { color: 'white', align: 'center' }).y
    return
  }

  if (entity.stats.hp > 0) {
    y = drawUIBar(ctx, x, y, entity.stats.hp, entity.stats.maxHP, 2, { scale, color: 'red', center: true })
  }

  if (entity.stats.mp > 0) {
    y = drawUIBar(ctx, x, y, entity.stats.mp, entity.stats.maxMP, 2, { scale, color: 'blue', center: true, attach: true })
  }

  if ($game.showLiveDebug) {
    y = drawText(ctx, entity.movementToString(), x, y, { color: 'white', align: 'center' }).y
  }
}
