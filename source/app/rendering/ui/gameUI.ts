import { $world, $player } from '../../globals/world'
import { $playerStats } from '../../globals/playerStats'
import { $game } from '../../globals/game'
import drawStats from './entityStats'
import { drawDebugBlock } from './text'
import { toCanvas, $render, translateContext } from '../common'

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
  drawPlayerBars(ctx)
  drawDebug(ctx)
}

/**
 * Draws player HP and MP bars relative to the screen.
 */
function drawPlayerBars(ctx: CanvasRenderingContext2D): void {
  //* player hp *//
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.fillRect(20, 20, $player.stats.maxHP * 5 + 10, 30)
  const hpGradient = ctx.createLinearGradient(25, 25, $player.stats.maxHP * 5, 20)
  hpGradient.addColorStop(0, 'red')
  hpGradient.addColorStop(1, 'magenta')
  ctx.fillStyle = hpGradient
  if ($player.stats.hp > 0) {
    ctx.fillRect(25, 25, $player.stats.hp * 5, 20)
  }
  //* player mp *//
  if ($player.stats.mp !== 0) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(20, 50, $player.stats.maxMP * 5 + 10, 15)
    const mpGradient = ctx.createLinearGradient(25, 50, $player.stats.maxMP * 5, 10)
    mpGradient.addColorStop(0, 'blue')
    mpGradient.addColorStop(1, 'cyan')
    ctx.fillStyle = mpGradient
    if ($player.stats.mp > 0) {
      ctx.fillRect(25, 50, $player.stats.mp * 5, 10)
    }
  }
}

/**
 * Draws defined debug info.
 */
function drawDebug(ctx: CanvasRenderingContext2D): void {
  let start = 100
  if ($game.showLiveDebug) {
    start = drawDebugBlock(ctx, [
      `WORLD: root[${$world.properties.rootX},${$world.properties.rootY}] border[${$world.properties.borderX},${$world.properties.borderY},${$world.properties.borderW},${$world.properties.borderH}]`,
      `RENDER: bounds[${$render.minX},${$render.minY},${$render.maxX},${$render.maxY}]`,
      `SHADE: ${$render.shade}`,
      `DEBUG: ${$game.debug}`
    ], start, { color: 'cyan' })
    const tracked = $player
    start = drawDebugBlock(ctx, [
      `ANIM: ${tracked.animToString()}`,
      `POS: [${Math.round(tracked.x)}, ${Math.round(tracked.y)}] ${tracked.collision.enabled ? 'COL: ' : ''}[${tracked.collisionToString()}]`,
      `MOVE: [${tracked.movementToString()}]`
    ], start, { color: 'cyan' })
  }
  if ($game.showPlayerStats) {
    start = drawDebugBlock(ctx, [
      `Attacks: ${$playerStats.attacks}`,
      `Attacks Hit: ${$playerStats.attacksHit}`,
      `Damage Taken: ${$playerStats.damageTaken}`,
      `Damage Dealt: ${$playerStats.damageDealt}`,
      `Kills: ${$playerStats.kills}`,
      `Time Taken: ${$playerStats.timeTaken}`
    ], start, { color: 'magenta' })
  }
}
