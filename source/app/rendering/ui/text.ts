import { FONT_SIZE, getFont } from '../../globals/fonts'
import { $settings } from '../../globals/settings'

interface Options {
  color?: string
  size?: number
  style?: string
  align?: CanvasTextAlign
}

/**
 * Draws text at a specified location with optional color and font.
 * @param text - Text to draw.
 * @param x - Absolute X coordinate.
 * @param y - Absolute Y coordinate.
 * @param options - Text options.
 */
export default function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  options: Options = {}
) {
  const {
    color = 'white',
    align = 'left',
    size = FONT_SIZE,
    style
  } = options
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  ctx.textBaseline = 'top'
  ctx.textAlign = align
  ctx.font = getFont({ size, style })
  const pad = 0 * $settings.uiScale
  const width = ctx.measureText(text).width
  ctx.fillStyle = color
  ctx.fillText(text, x + pad / 2, y + pad / 2)
  return { x: x + width + pad, y: y + size * $settings.uiScale + pad }
}

/**
 * Draws debug text in top right corner.
 * @param info - Key-value pairs to draw
 * @param x - x value.
 * @param y - y value.
 * @param options - Options to pass to drawText()
 * @returns Updated start value.
 */
export function drawDebugBlock(
  ctx: CanvasRenderingContext2D,
  info: string[],
  x: number,
  y: number,
  options: Options = {}
) {
  info.forEach((value) =>
    y = drawText(ctx, value, x, y, options).y
  )
  return y + 2 * $settings.uiScale
}
