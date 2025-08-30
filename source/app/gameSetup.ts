import { $game } from './globals/game'
import handleGameInput from './logic/input'
import renderGame from './rendering/renderMain'
import { canvas, ctx } from '../ui/GameView/GameCanvas'
import entityMovement from './logic/movement'
import { $player, $world } from './globals/world'
import { toCanvas } from './rendering/common'

export default function setupGameLoop(): () => void {
  let handle: number
  window.addEventListener('mousedown', handleGameInput)
  window.addEventListener('mouseup', handleGameInput)
  window.addEventListener('keydown', handleGameInput)
  window.addEventListener('keyup', handleGameInput)

  canvas.addEventListener('touchstart', handleTouch, false)
  canvas.addEventListener('touchmove', handleTouchMove, false)
  canvas.addEventListener('touchend', handleTouchEnd, false)

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

    canvas.removeEventListener('touchstart', handleTouch)
    canvas.removeEventListener('touchmove', handleTouchMove)
    canvas.removeEventListener('touchend', handleTouchEnd)

    cancelAnimationFrame(handle)
  }
}

let lastTouchX = 0
let lastTouchY = 0
let lastTime = 0

function handleTouch(event: TouchEvent) {
  event.preventDefault()

  let time = new Date().getTime()

  if (time - lastTime < 600 && lastTime !== 0) {
    $player.movement.attack = true
  }
  lastTime = time

  lastTouchX = event.touches[0].clientX
  let x = Math.floor(Math.round(toCanvas($game.focusX) - canvas.width / 2 + event.touches[0].clientX) / $game.grid)
  let y = Math.floor(Math.round(toCanvas($game.focusY) - canvas.height / 2 + event.touches[0].clientY) / $game.grid)

  let tile = $world.foreground[y]?.[x]
  if (tile && tile.activator) {
    tile.activate()
  }
}

function handleTouchEnd(event: TouchEvent) {
  event.preventDefault()
  $player.movement.right = false
  $player.movement.left = false
  $player.movement.down = false
  $player.movement.jump = false
  $player.movement.attack = false
}

function handleTouchMove(event: TouchEvent) {
  event.preventDefault()
  let currentX = event.touches[0].clientX
  let currentY = event.touches[0].clientY
  if (currentX - lastTouchX > 10) {
    $player.movement.right = true
    $player.movement.left = false
  } else if (currentX - lastTouchX < -10) {
    $player.movement.left = true
    $player.movement.right = false
  }
  if (currentY - lastTouchY > 30) {
    $player.movement.down = true
    $player.movement.jump = false
  } else if (currentY - lastTouchY < -30) {
    $player.movement.down = false
    $player.movement.jump = true
  }

  lastTouchX = currentX
  lastTouchY = currentY
}
