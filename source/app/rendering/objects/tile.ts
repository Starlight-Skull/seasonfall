import Tile, { Collision } from '../../classes/Tile'
import { $game } from '../../globals/game'
import { $settings } from '../../globals/settings'
import { toCanvas, saveRestore } from '../common'
import drawText from '../ui/text'

/**
 * Draws a given tile according to its properties.
 * Use in translated context.
 * @param gridY - Relative X coordinate.
 * @param gridX - Relative Y coordinate.
 * @param tile - The tile to draw.
 */
export default function drawTile(ctx: CanvasRenderingContext2D, gridY: number, gridX: number, tile: Tile): void {
  let x = toCanvas(gridX)
  let y = toCanvas(gridY)
  let w = toCanvas(tile.width)
  let h = toCanvas(tile.height)
  let animW = tile.animation.width * $settings.scale
  let animH = tile.animation.height * $settings.scale
  let animX = x
  let animY = y
  saveRestore(ctx, () => {
    if (tile.mirrored) {
      ctx.scale(-1, 1)
      x = -x - $game.grid
      animX = -animX - $game.grid
    }
    if (tile.rotation !== 0) {
      ctx.translate(x + w / 2, y + h / 2)
      ctx.rotate((tile.rotation * Math.PI) / 180)
      x = -w / 2
      y = -h / 2
      animX = x
      animY = y
    }
    // not-so-great fix for canvas2D inaccuracy
    ctx.drawImage(
      tile.animation.image,
      tile.animation.x + tile.animation.width * Math.floor(tile.animationFrame) + 0.01,
      tile.animation.y + 0.01,
      tile.animation.width - 0.01,
      tile.animation.height - 0.01,
      animX, animY, animW + 1, animH + 1)
    if ($game.showBoxes) {
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
  if ($game.showCoords) {
    drawText(ctx, `${gridX},${gridY}`, toCanvas(gridX), toCanvas(gridY), { color: 'rgb(0,200,0)' })
  }
  if (tile.animation.frames > 1) tile.nextFrame(true)
}
