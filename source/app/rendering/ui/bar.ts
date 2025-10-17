import { $settings } from '../../globals/settings'

interface Options {
  color?: string
  scale?: number
  center?: boolean
  attach?: boolean
}

export function drawUIBar(
  ctx: CanvasRenderingContext2D,
  scaledX: number,
  scaledY: number,
  val = 0,
  max = val,
  height = 4,
  options: Options = {}
) {
  if (max <= 0) return scaledY
  const { color = 'white', center = false, attach = false, scale = 1 } = options
  const pad = 1 * $settings.uiScale

  const w = max * $settings.uiScale * scale + pad * 2
  const h = height * $settings.uiScale + (attach ? pad : pad * 2)
  const x = center ? scaledX - w / 2 : scaledX
  const y = scaledY
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.fillRect(x, y, w, h)

  if (val > 0) {
    const w2 = val * $settings.uiScale * scale
    const h2 = height * $settings.uiScale
    const x2 = center ? (scaledX - w2 / 2) : (x + pad)
    const y2 = attach ? y : y + pad
    ctx.fillStyle = color
    ctx.fillRect(x2, y2, w2, h2)
  }
  return y + h
}
