import { level, player } from '../globals'
import { playerStats } from '../globals/playerStats'
import { world } from '../globals/world'
import drawStats from './entityStats'
import drawText from './text'
import { grid, render, saveRestore } from './common'

/**
 * Draws UI overlay and floating entity stats.
 */
export default function drawUI(ctx: CanvasRenderingContext2D): void {
  //* entity stats *//
  saveRestore(ctx, () => {
    ctx.translate(render.focusX, render.focusY)
    for (let entity of level.entities) {
      if (render.isOffScreen(entity.x, entity.y)) continue
      drawStats(ctx, entity)
    }
    drawStats(ctx, player)
    if (world.showBoxes) {
      ctx.strokeStyle = 'red'
      ctx.strokeRect(
        grid(level.properties.borderX),
        grid(level.properties.borderY),
        grid(level.properties.borderW),
        grid(level.properties.borderH)
      )
    }
  })
  //* UI *//
  drawPlayerBars(ctx)
  drawDebug(ctx)
}

/**
 * Draws player HP and MP bars relative to the screen.
 */
function drawPlayerBars(ctx: CanvasRenderingContext2D): void {
  //* player hp *//
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.fillRect(20, 20, player.stats.maxHP * 5 + 10, 30)
  const hpGradient = ctx.createLinearGradient(25, 25, player.stats.maxHP * 5, 20)
  hpGradient.addColorStop(0, 'red')
  hpGradient.addColorStop(1, 'magenta')
  ctx.fillStyle = hpGradient
  if (player.stats.hp > 0) {
    ctx.fillRect(25, 25, player.stats.hp * 5, 20)
  }
  //* player mp *//
  if (player.stats.mp !== 0) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(20, 50, player.stats.maxMP * 5 + 10, 15)
    const mpGradient = ctx.createLinearGradient(25, 50, player.stats.maxMP * 5, 10)
    mpGradient.addColorStop(0, 'blue')
    mpGradient.addColorStop(1, 'cyan')
    ctx.fillStyle = mpGradient
    if (player.stats.mp > 0) {
      ctx.fillRect(25, 50, player.stats.mp * 5, 10)
    }
  }
}

/**
 * Draws defined debug info.
 */
function drawDebug(ctx: CanvasRenderingContext2D): void {
  let start = 100
  if (world.showLiveDebug) {
    const tracked = player
    const info = [
      `ANIM: ${tracked.name}::${tracked.animation.name} - ${Math.round(tracked.animationFrame * 100) / 100 + 1}/${tracked.animation.frames}`,
      `POS: [${Math.round(tracked.x)}, ${Math.round(tracked.y)}] ${tracked.collision.enabled ? 'COL: ' : ''}[${tracked.collision.left ? ' ←' : ''}${tracked.collision.up ? ' ↑' : ''}${tracked.collision.down ? ' ↓' : ''}${tracked.collision.right ? ' →' : ''}]`,
      `SHADE: [${Math.round(world.shade * 100) / 100}] MOVE: [${tracked.movement.left ? ' ←' : ''}${tracked.movement.attack ? ' $' : ''}${tracked.movement.use ? ' #' : ''}${tracked.movement.jump ? ' ▲' : ''}${tracked.movement.down ? ' ↓' : ''}${tracked.movement.right ? ' →' : ''}] ${tracked.stats.jumpTime}`,
      `WORLD: root[${level.properties.rootX},${level.properties.rootY}] border[${level.properties.borderX},${level.properties.borderY},${level.properties.borderW},${level.properties.borderH}]`,
      `RNDR: bounds[${render.minX},${render.minY},${render.maxX},${render.maxY}]`,
      `DEBUG: ${world.debug}`,
    ]
    info.forEach((value, index) => { drawText(ctx, value, 5, start + index * 30, { color: 'cyan' })})
    start += info.length * 30 + 10
  }
  if (world.showPlayerStats) {
    const info = [
      `Attacks: ${playerStats.attacks}`,
      `Attacks Hit: ${playerStats.attacksHit}`,
      `Damage Taken: ${playerStats.damageTaken}`,
      `Damage Dealt: ${playerStats.damageDealt}`,
      `Kills: ${playerStats.kills}`,
      `Time Taken: ${playerStats.timeTaken}`,
    ]
    info.forEach((value, index) => { drawText(ctx, value, 5, start + index * 30, { color: 'magenta' })})
    start += info.length * 30 + 10
  }
}
