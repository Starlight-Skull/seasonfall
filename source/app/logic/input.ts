import { $player, $world } from '../globals/world'
import { $game } from '../globals/game'
import { $settings } from '../globals/settings'
import { $render, toCanvas } from '../rendering/common'
import { $editor } from '../globals/editor'

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
      $player.movement.use = down
      break
  }
}

/**
 * Tracks current mouse position for editor mode.
 */
export function handleMouseMove(event: MouseEvent) {
  if ($game.paused) return
  $render.mouseX = Math.floor(Math.round(toCanvas($game.focusX) - window.innerWidth / 2 + event.clientX) / $game.grid)
  $render.mouseY = Math.floor(Math.round(toCanvas($game.focusY) - window.innerHeight / 2 + event.clientY) / $game.grid)
}

/**
 * Editor mode mouse controls
 */
export function setWorldFocus(event: MouseEvent) {
  // todo
  if (event.button === 0) {
    $editor.selectedX = $render.mouseX
    $editor.selectedY = $render.mouseY
  } else if (event.button === 1) {
    if ($editor.foreground) {
      $world.foreground[$render.mouseY][$render.mouseX] = $editor.selectedTile
    } else {
      $world.background[$render.mouseY][$render.mouseX] = $editor.selectedTile
    }
  } else if (event.button === 2) {
    $game.focusX = $render.mouseX
    $game.focusY = $render.mouseY
  }
}
