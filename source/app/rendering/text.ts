import { getFont, FONT_SIZE } from '../globals/fonts'

interface Options {
  color?: string
  size?: number
  style?: string
  center?: boolean
}

/**
 * Draws text at a specified location with optional color and font.
 * @param text - Text to draw.
 * @param x - Absolute X coordinate.
 * @param y - Absolute Y coordinate.
 * @param options - Text options.
 */
export default function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, options?: Options ): void {
  const { color, center, size, style } = options ?? {}
  const pad = 5
  ctx.textBaseline = 'top'
  ctx.font = getFont({ size, style })
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  if (center ?? false) x -= ctx.measureText(text).width / 2
  ctx.fillRect(x, y, ctx.measureText(text).width + pad, (size ?? FONT_SIZE) + pad)
  ctx.fillStyle = color ?? 'rgb(255,255,255)'
  ctx.fillText(text, x + pad / 2, y + pad / 2)
}
