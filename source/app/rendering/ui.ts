import { level, player, playerStats, world } from '../globals'
import { drawStats } from './entity'
import { drawText } from './text'
import { grid, render, saveRestore } from './common'

/**
 * Draws UI overlay and floating entity stats.
 */
export function drawUI(ctx: CanvasRenderingContext2D): void {
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
  //* debug info *//
  if (world.showLiveDebug) {
    const tracked = player
    drawText(ctx, `ANIM: ${tracked.name}::${tracked.animation.name} - ${Math.round(tracked.animationFrame * 100) / 100 + 1}/${tracked.animation.frames}`, 5, 100, { color: 'cyan' })
    drawText(ctx, `POS: [${Math.round(tracked.x)}, ${Math.round(tracked.y)}] \t ${tracked.collision.enabled ? 'COL: ' : ''}[${tracked.collision.left ? ' ←' : ''}${tracked.collision.up ? ' ↑' : ''}${tracked.collision.down ? ' ↓' : ''}${tracked.collision.right ? ' →' : ''}]`, 5, 130, { color: 'cyan' })
    drawText(ctx, `SHADE: ${Math.round(world.shade * 100) / 100} \t MOVE: [${tracked.movement.left ? ' ←' : ''}${tracked.movement.attack ? ' $' : ''}${tracked.movement.use ? ' #' : ''}${tracked.movement.jump ? ' ▲' : ''}${tracked.movement.down ? ' ↓' : ''}${tracked.movement.right ? ' →' : ''}] ${tracked.stats.jumpTime}`, 5, 160, { color: 'cyan' })
    drawText(ctx, `WORLD: [${level.properties.rootX},${level.properties.rootY}][${level.properties.borderX},${level.properties.borderY},${level.properties.borderW},${level.properties.borderH}]`, 5, 190, { color: 'cyan' })
    drawText(ctx, `DEBUG: ${world.debug}`, 5, 220, { color: 'red' })
  }
  if (world.showPlayerStats) {
    drawText(ctx, `Attacks: ${playerStats.attacks}`, 5, 220, { color: 'magenta' })
    drawText(ctx, `Attacks Hit: ${playerStats.attacksHit}`, 5, 250, { color: 'magenta' })
    drawText(ctx, `Damage Taken: ${playerStats.damageTaken}`, 5, 280, { color: 'magenta' })
    drawText(ctx, `Damage Dealt: ${playerStats.damageDealt}`, 5, 310, { color: 'magenta' })
    drawText(ctx, `Kills: ${playerStats.kills}`, 5, 340, { color: 'magenta' })
    drawText(ctx, `Time Taken: ${playerStats.timeTaken}`, 5, 370, { color: 'magenta' })
  }
}
