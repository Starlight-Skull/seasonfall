import { type Tile, Collision } from '../classes/Tile'
import { settings, world } from '../globals'
import { grid, saveRestore } from './common'
import { drawText } from './text'

/**
 * Draws a given tile according to its properties.
 * @param gridY - Relative X coordinate.
 * @param gridX - Relative Y coordinate.
 * @param tile - The tile to draw.
 */
export function drawTile(ctx: CanvasRenderingContext2D, gridY: number, gridX: number, tile: Tile): void {
  let x = grid(gridX)
  let y = grid(gridY)
  let w = grid(tile.width)
  let h = grid(tile.height)
  let animW = tile.animation.width * settings.scale
  let animH = tile.animation.height * settings.scale
  let animX = x
  let animY = y
  saveRestore(ctx, () => {
    if (tile.mirrored) {
      ctx.scale(-1, 1)
      x = -x - world.grid
      animX = -animX - world.grid
    }
    if (tile.rotation !== 0) {
      ctx.translate(x + w / 2, y + h / 2)
      ctx.rotate((tile.rotation * Math.PI) / 180)
      x = -w / 2
      y = -h / 2
      animX = x
      animY = y
    }
    ctx.drawImage(
      tile.animation.image,
      tile.animation.x + tile.animation.width * Math.floor(tile.animationFrame),
      tile.animation.y,
      tile.animation.width,
      tile.animation.height,
      animX, animY, animW, animH)
    if (world.showBoxes) {
      switch (tile.collision) {
        case Collision.none:
          ctx.fillStyle = 'rgba(10,50,0,0.5)'
          break
        case Collision.top:
          ctx.fillStyle = 'rgba(150,100,0,0.5)'
          break
        default:
          ctx.fillStyle = 'rgba(0,250,0,0.5)'
          break
      }
      if (tile.activator) {
        ctx.fillStyle = 'rgba(0,71,250,0.5)'
      }
      ctx.fillRect(x, y, w, h)
      ctx.strokeRect(animX, animY, animW, animH)
    }
  })
  // if (world.showLiveDebug) {
  //   drawText(ctx, `${gridX},${gridY}`, grid(gridX), grid(gridY), { color: 'rgb(0,200,0)' })
  // }
  if (tile.animation.frames > 1) tile.nextFrame(true)
}
