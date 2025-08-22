import { $player } from '../globals/world'
import { $game } from '../globals/game'
import { $settings } from '../globals/settings'
import { $render, toCanvas } from '../rendering/common'
import { canvas } from '../../ui/GameView/GameCanvas'

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
  $render.mouseX = Math.floor(Math.round(toCanvas($game.focusX) - canvas.width / 2 + event.offsetX) / $game.grid)
  $render.mouseY = Math.floor(Math.round(toCanvas($game.focusY) - canvas.height / 2 + event.offsetY) / $game.grid)
}

/**
 * Editor mode mouse controls
 */
export function setWorldFocus(event: MouseEvent) {
  // todo
}
