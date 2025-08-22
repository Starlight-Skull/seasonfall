import { $world, $player } from '../../globals/world'
import drawEntity from './entity'
import { $render } from '../common'
import drawTile from './tile'
import Tile from '../../classes/Tile'

/**
 * Draws tiles and entities.
 * Use in translated context.
 */
export default function drawWorld(ctx: CanvasRenderingContext2D): void {
  drawTileFromWorld(ctx, $world.background)
  drawTileFromWorld(ctx, $world.foreground)

  for (let entity of $world.entities) {
    if ($render.isOffScreen(entity.x, entity.y) === false) {
      drawEntity(ctx, entity)
    }
  }
  drawEntity(ctx, $player)
}

/**
 * Draws every tile in the given matrix.
 * Use in translated context.
 * @param tileList - 2D array of tiles or undefined
 */
function drawTileFromWorld(
  ctx: CanvasRenderingContext2D,
  tileList: (Tile | undefined)[][]
) {
  for (let y = $render.minY; y < $render.maxY; y++) {
    for (let x = $render.minX; x < $render.maxX; x++) {
      const tile = tileList[y]?.[x]
      if (tile !== undefined) drawTile(ctx, y, x, tile)
    }
  }
}
