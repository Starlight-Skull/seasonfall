import Tile from '../../classes/Tile';
import { $editor } from '../../globals/editor';
import { $game } from '../../globals/game';
import { $world } from '../../globals/world';
import { $render, toCanvas } from '../common';
import drawText, { drawDebugBlock } from './text';

/**
 * Draws selected object info.
 */
export function drawEditorUIText(ctx: CanvasRenderingContext2D): void {
  let start = 100;
  const tileToDebugBlock = (tile: Tile, title: string) => drawDebugBlock(ctx, [
    `${title}: ${tile.toString()}`,
    `POS: [${$editor.selectedX},${$editor.selectedY}] SIZE: ${tile.width}x${tile.height}`,
    `FRAME: ${tile.animationFrame} ${tile.activator ? '(activator)' : ''}`
  ], start, { color: 'lime' });
  const foreground = $world.foreground[$editor.selectedY]?.[$editor.selectedX];
  const background = $world.background[$editor.selectedY]?.[$editor.selectedX];
  if (foreground !== undefined) start = tileToDebugBlock(foreground, 'FORE');
  if (background !== undefined) start = tileToDebugBlock(background, 'BACK');
}

/**
 * Draws focus point, mouse position & world border.
 * Use in translated context.
 */
export function drawEditorUIParts(ctx: CanvasRenderingContext2D): void {
  //* focus point *//
  ctx.strokeStyle = 'white'
  ctx.strokeRect(toCanvas($game.focusX), toCanvas($game.focusY), $game.grid, $game.grid)

  //* mouse position *//
  ctx.fillStyle = 'rgba(250,250,250,0.5)'
  ctx.fillRect(toCanvas($render.mouseX), toCanvas($render.mouseY), $game.grid, $game.grid)
  drawText(ctx, `${$render.mouseX},${$render.mouseY}`, toCanvas($render.mouseX), toCanvas($render.mouseY), { color: 'white' })

  //* world border *//
  ctx.strokeStyle = 'red';
  ctx.strokeRect(
    toCanvas($world.properties.borderX),
    toCanvas($world.properties.borderY),
    toCanvas($world.properties.borderW),
    toCanvas($world.properties.borderH)
  )
}
