import { world } from '../globals/world'

/**
 * Saves render context and restores after executing script.
 * @param script - function callback
 */
export function saveRestore(ctx: CanvasRenderingContext2D, script: () => void): void {
  ctx.save()
  script()
  ctx.restore()
}

/**
 * Converts grid coordinate to canvas coordinate by multiplying with world.grid.
 */
export function grid(value: number): number {
  return value * world.grid
}

/**
 * Stores commonly used values of the current render
 */
export const render = {
  mouseX: 0,
  mouseY: 0,
  get minX() { return Math.floor(world.focusX - window.innerWidth / 2 / world.grid) },
  get maxX() { return Math.ceil(world.focusX + window.innerWidth / 2 / world.grid) },
  get minY() { return Math.floor(world.focusY - window.innerHeight / 2 / world.grid) },
  get maxY() { return Math.ceil(world.focusY + window.innerHeight / 2 / world.grid) },
  get focusX() { return window.innerWidth / 2 - grid(world.focusX) },
  get focusY() { return window.innerHeight / 2 - grid(world.focusY) },
  isOffScreen(x: number, y: number) { return x < render.minX || x > render.maxX || y < render.minY || y > render.maxY }
}

