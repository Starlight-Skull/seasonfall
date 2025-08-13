import { world, player, settings } from '../globals'
import { render } from '../rendering/common'

/**
 * Receives the code of a mouse or key event and acts accordingly.
 * @param key - Can be 'KeyboardEvent.code' or 'Mouse + MouseEvent.button'.
 * @param down - Boolean of whether the event is up or down.
 */
export default function handleMouseKeyEvent(key: string, down: boolean): void {
  switch (key) {
    case settings.keybindings.attack:
      if (!world.paused) player.movement.attack = down
      break
    case settings.keybindings.down:
      if (!world.paused) player.movement.down = down
      break
    case settings.keybindings.left:
      if (!world.paused) player.movement.left = down
      break
    case settings.keybindings.right:
      if (!world.paused) player.movement.right = down
      break
    case settings.keybindings.jump:
      if (!world.paused) player.movement.jump = down
      break
    case settings.keybindings.use:
      if (!world.paused) player.movement.use = down
      break
  }
}

// onmousedown = (e: MouseEvent) => {
//   if (!world.paused) {
//     if (e.button === 2) {
//       world.focusX = render.mouseX;
//       world.focusY = render.mouseY;
//     }
//     if (e.button === 1) {
//       player.x = render.mouseX;
//       player.y = render.mouseY;
//     }
//   }
// }
