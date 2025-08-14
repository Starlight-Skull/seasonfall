import { level, player } from '../globals'
import { world } from '../globals/world'
import entityMovement from '../logic/movement'
import drawEntity from './entity'
import { render } from './common'
import drawTile from './tile'

/**
 * Draws tiles and entities.
 */
export default function drawWorld(ctx: CanvasRenderingContext2D): void {
  //* tiles *//
  for (let y = render.minY; y < render.maxY; y++) {
    for (let x = render.minX; x < render.maxX; x++) {
      const background = level.background[y]?.[x]
      if (background !== undefined) drawTile(ctx, y, x, background)
    }
  }
  for (let y = render.minY; y < render.maxY; y++) {
    for (let x = render.minX; x < render.maxX; x++) {
      const foreground = level.foreground[y]?.[x]
      if (foreground !== undefined) drawTile(ctx, y, x, foreground)
    }
  }
  //* entities + player *//
  for (let entity of level.entities) {
    entityMovement(entity)
    if (render.isOffScreen(entity.x, entity.y)) continue
    drawEntity(ctx, entity)
  }
  entityMovement(player)
  drawEntity(ctx, player)
}
