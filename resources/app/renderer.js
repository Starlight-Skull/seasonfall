import { settings, world, UI, fonts } from './globals.js'
import { ctx } from './main.js'

/**
 * Draws a given tile according to its propperties.
 * @param {NewTile} tile - The tile to
 * @param {int} gridY - The Y coordinate without grid scaling.
 * @param {int} gridX - The X coordinate without grid scaling.
 */
export function newDrawTile (tile, gridY, gridX) {
  let x = gridX * world.grid
  let y = gridY * world.grid
  let w = tile.width * world.grid
  let h = tile.height * world.grid
  ctx.save()
  if (tile.mirrored) {
    ctx.scale(-1, 1)
    x = -x
    w = -w
  }
  if (tile.rotation) {
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate(tile.rotation * Math.PI / 180)
    x = -w / 2
    y = -h / 2
  }
  ctx.drawImage(tile.animation.sprite, x, y, w, h)
  if (world.showBoxes && tile.constructor.name === 'NewTile') {
    switch (tile.collision) {
      case 'none':
        ctx.fillStyle = 'rgba(10,50,0,0.5)'
        break
      case 'top':
        ctx.fillStyle = 'rgba(150,100,0,0.5)'
        break
      default:
        ctx.fillStyle = 'rgba(0,250,0,0.5)'
        break
    }
    ctx.fillRect(x, y, w, h)
    ctx.strokeRect(x, y, w, h)
  }
  ctx.restore()
  if (world.showBoxes) drawTextWithBackground(`${gridX},${gridY}`, gridX * world.grid, gridY * world.grid, { font: `${UI.fontSize}px ${fonts.Pixeloid}` })
}

export function drawTextWithBackground (text, x, y, options) {
  let { color, font } = options
  ctx.textBaseline = 'top'
  ctx.font = font || UI.font
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.fillRect(x, y, ctx.measureText(text).width + settings.scale * 2, UI.fontSize + settings.scale)
  ctx.fillStyle = color || 'rgb(255,255,255)'
  ctx.fillText(text, x + settings.scale, y + settings.scale)
}
