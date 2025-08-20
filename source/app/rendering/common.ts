import { $game } from '../globals/game'

/**
 * Saves render context and restores after executing script.
 * @param script - function callback
 */
export function saveRestore(ctx: CanvasRenderingContext2D, script: () => void): void {
  ctx.save()
  script()
  ctx.restore()
}

export function translateContext(ctx: CanvasRenderingContext2D, script: () => void): void {
  saveRestore(ctx, () => {
    const focusX = window.innerWidth / 2 - toCanvas($game.focusX)
    const focusY = window.innerHeight / 2 - toCanvas($game.focusY)
    ctx.translate(focusX, focusY)
    script()
  })
}

/**
 * Converts grid coordinate to canvas coordinate by multiplying with world.grid.
 */
export function toCanvas(gridCoord: number): number {
  return gridCoord * $game.grid
}

/**
 * Stores commonly used values of the current render
 */
export const $render = {
  shade: 0,
  mouseX: 0,
  mouseY: 0,
  get minX() { return Math.floor($game.focusX - window.innerWidth / 2 / $game.grid) },
  get maxX() { return Math.ceil($game.focusX + window.innerWidth / 2 / $game.grid) },
  get minY() { return Math.floor($game.focusY - window.innerHeight / 2 / $game.grid) },
  get maxY() { return Math.ceil($game.focusY + window.innerHeight / 2 / $game.grid) },
  isOffScreen(x: number, y: number) {
    return x < $render.minX || x > $render.maxX || y < $render.minY || y > $render.maxY
  }
}

