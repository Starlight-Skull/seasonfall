import { player } from '../globals'
import { world } from '../globals/world'
import { settings } from '../globals/settings'

/**
 * Receives the code of a mouse or key event and acts accordingly.
 * @param event - KeyboardEvent or MouseEvent
 */
export default function handleGameInput(event: MouseEvent | KeyboardEvent): void {
  if (world.paused) return
  let code = ''
  let down = (event.type === 'keydown' || event.type === 'mousedown')

  if (event.type === 'keydown' || event.type === 'keyup') {
    code = (event as KeyboardEvent).code
  } else if (event.type === 'mousedown' || event.type === 'mouseup') {
    code = `Mouse${(event as MouseEvent).button}`
  }

  switch (code) {
    case settings.keybindings.attack:
      player.movement.attack = down
      break
    case settings.keybindings.down:
      player.movement.down = down
      break
    case settings.keybindings.left:
      player.movement.left = down
      break
    case settings.keybindings.right:
      player.movement.right = down
      break
    case settings.keybindings.jump:
      player.movement.jump = down
      break
    case settings.keybindings.use:
      player.movement.use = down
      break
  }
}
