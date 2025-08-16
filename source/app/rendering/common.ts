import { game } from '../globals/game'

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
  return value * game.grid
}

/**
 * Stores commonly used values of the current render
 */
export const render = {
  mouseX: 0,
  mouseY: 0,
  get minX() { return Math.floor(game.focusX - window.innerWidth / 2 / game.grid) },
  get maxX() { return Math.ceil(game.focusX + window.innerWidth / 2 / game.grid) },
  get minY() { return Math.floor(game.focusY - window.innerHeight / 2 / game.grid) },
  get maxY() { return Math.ceil(game.focusY + window.innerHeight / 2 / game.grid) },
  get focusX() { return window.innerWidth / 2 - grid(game.focusX) },
  get focusY() { return window.innerHeight / 2 - grid(game.focusY) },
  isOffScreen(x: number, y: number) { return x < render.minX || x > render.maxX || y < render.minY || y > render.maxY }
}

