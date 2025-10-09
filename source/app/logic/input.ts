import { $player, $world } from '../globals/world'
import { $game } from '../globals/game'
import { $settings } from '../globals/settings'
import { $render, toCanvas } from '../rendering/common'
import { canvas } from '../../ui/GameView/GameCanvas'
import { $editor, EditorMode } from '../globals/editor'
import Tile from '../classes/Tile'

/**
 * Receives the code of a mouse or key event and acts accordingly.
 * @param event - KeyboardEvent or MouseEvent
 */
export default function handleGameInput(event: MouseEvent | KeyboardEvent): void {
  if ($game.paused) return
  let code = ''
  let down = (event.type === 'keydown' || event.type === 'mousedown')

  if (event.type === 'keydown' || event.type === 'keyup') {
    code = (event as KeyboardEvent).code
  } else if (event.type === 'mousedown' || event.type === 'mouseup') {
    code = `Mouse${(event as MouseEvent).button}`
  }

  switch (code) {
    case $settings.keybindings.attack:
      $player.movement.attack = down
      break
    case $settings.keybindings.down:
      $player.movement.down = down
      break
    case $settings.keybindings.left:
      $player.movement.left = down
      break
    case $settings.keybindings.right:
      $player.movement.right = down
      break
    case $settings.keybindings.jump:
      $player.movement.jump = down
      break
    case $settings.keybindings.use:
      if (down) break
      const tile = $world.foreground[$render.mouseY]?.[$render.mouseX]
      if (tile && tile.activator) {
        tile.activate()
      }
      break
  }
}

/**
 * Tracks current mouse position.
 */
export function handleMouseMove(event: MouseEvent) {
  if ($game.paused) return
  $render.mouseX = Math.floor(Math.round(toCanvas($game.focusX) - canvas.width / 2 + event.offsetX) / $game.grid)
  $render.mouseY = Math.floor(Math.round(toCanvas($game.focusY) - canvas.height / 2 + event.offsetY) / $game.grid)
}

/**
 * Editor mode mouse & touch controls.
 */
export function handleEditorInput(event: MouseEvent | TouchEvent) {
  if (event.type === 'mousedown') {
    const button = (event as MouseEvent).button
    //* Left mouse button *//
    if (button === 0) {
      handleEditorMode()
    }
    //* Right mouse button *//
    if (button === 2) {
      setWorldFocus()
    }
  } else if (event.type === 'touchstart') {
    handleEditorMode()
  }
}

function handleEditorMode() {
  switch ($editor.mode) {
    case EditorMode.edit:
      // Selecting Tile is handled in (EditorView.tsx)
      // at component level because it needs to access React state.
      // Could get around this by passing setSelected() to here.
      break;
    case EditorMode.fill:
      placeTile()
      break;
    case EditorMode.move:
      setWorldFocus()
      break;
  }
}

function placeTile() {
  let tile = $editor.fill === 'none' ? undefined : new Tile($editor.fill)
  if ($editor.foreground) {
    $world.foreground[$render.mouseY][$render.mouseX] = tile
  } else {
    $world.background[$render.mouseY][$render.mouseX] = tile
  }
}

function setWorldFocus() {
  $game.focusX = $render.mouseX
  $game.focusY = $render.mouseY
}
