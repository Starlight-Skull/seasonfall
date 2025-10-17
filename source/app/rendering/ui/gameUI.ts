import { $world, $player } from '../../globals/world'
import { $playerStats } from '../../globals/playerStats'
import { $game } from '../../globals/game'
import drawStats from './entityStats'
import { drawDebugBlock } from './text'
import { toCanvas, $render, translateContext } from '../common'
import { $settings } from '../../globals/settings'
import { drawUIBar } from './bar'

/**
 * Draws UI overlay and floating entity stats.
 */
export default function drawGameUI(ctx: CanvasRenderingContext2D): void {
  translateContext(ctx, () => {
    for (let entity of $world.entities) {
      if ($render.isOffScreen(entity.x, entity.y)) continue
      drawStats(ctx, entity)
    }
    drawStats(ctx, $player)
    if ($game.showBoxes) {
      ctx.strokeStyle = 'red'
      ctx.strokeRect(
        toCanvas($world.properties.borderX),
        toCanvas($world.properties.borderY),
        toCanvas($world.properties.borderW),
        toCanvas($world.properties.borderH)
      )
    }
  })
  let x = 4 * $settings.uiScale
  let y = 4 * $settings.uiScale
  y += drawUIBar(ctx, x, y, $player.stats.hp, $player.stats.maxHP, 4, { color: 'red' })
  y += drawUIBar(ctx, x, y, $player.stats.mp, $player.stats.maxMP, 2, { color: 'blue', attach: true })
  y += 10 * $settings.uiScale
  y = drawDebug(ctx, x, y)
}

/**
 * Draws defined debug info.
 */
function drawDebug(ctx: CanvasRenderingContext2D, x: number, y: number) {
  if ($game.showLiveDebug) {
    y = drawDebugBlock(ctx, [
      `ROOT: [${$world.properties.rootX},${$world.properties.rootY}] BORDER: [${$world.properties.borderX},${$world.properties.borderY},${$world.properties.borderW},${$world.properties.borderH}]`,
      `SCREEN: [${$render.minX},${$render.minY},${$render.maxX},${$render.maxY}]`,
      `SHADE: ${$render.shade} MOUSE: [${$render.mouseX},${$render.mouseY}]`,
      `DEBUG: ${$game.debug}`
    ], x, y, { color: 'cyan' })

    const tracked = $player
    y = drawDebugBlock(ctx, [
      `ANIM: ${tracked.animationToString()}`,
      `POS: [${Math.round(tracked.x)}, ${Math.round(tracked.y)}] ${tracked.collision.enabled ? 'COL: ' : ''}[${tracked.collisionToString()}]`,
      `MOVE: [${tracked.movementToString()}]`
    ], x, y, { color: 'cyan' })
  }

  if ($game.showPlayerStats) {
    y = drawDebugBlock(ctx, [
      `Attacks Hit: ${$playerStats.attacksHit}`,
      `Damage Taken: ${$playerStats.damageTaken}`,
      `Damage Dealt: ${$playerStats.damageDealt}`,
      `Kills: ${$playerStats.kills}`,
      `Time Taken: ${$playerStats.timeTaken}`
    ], x, y, { color: 'magenta' })
  }
  return y
}
