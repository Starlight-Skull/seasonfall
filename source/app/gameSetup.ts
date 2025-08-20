import { $game } from './globals/game'
import handleGameInput from './logic/input'
import renderGame from './rendering/renderMain'
import { ctx } from '../ui/GameView/GameCanvas'
import entityMovement from './logic/movement'
import { $player, $world } from './globals/world'

export default function setupGameLoop(): () => void {
  let handle: number
  window.addEventListener('mousedown', handleGameInput)
  window.addEventListener('mouseup', handleGameInput)
  window.addEventListener('keydown', handleGameInput)
  window.addEventListener('keyup', handleGameInput)

  handle = requestAnimationFrame(loop)
  function loop (dt: number): void {
    if (ctx !== undefined && !$game.paused) {
      renderGame(ctx)
      for (let entity of $world.entities) {
        entityMovement(entity)
      }
      entityMovement($player)
    }
    handle = requestAnimationFrame(loop)
  }

  return () => {
    window.removeEventListener('mousedown', handleGameInput)
    window.removeEventListener('mouseup', handleGameInput)
    window.removeEventListener('keydown', handleGameInput)
    window.removeEventListener('keyup', handleGameInput)
    cancelAnimationFrame(handle)
  }
}
