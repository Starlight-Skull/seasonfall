import { $game } from './globals/game'
import handleGameInput, { handleMouseMove } from './logic/input'
import renderGame from './rendering/renderMain'
import { canvas, ctx } from '../ui/GameView/GameCanvas'
import runEntityController from './logic/entity/controller'
import { $player, $world } from './globals/world'
import { $render, toCanvas } from './rendering/common'

export default function setupGameLoop(): () => void {
  let handle: number
  canvas.addEventListener('mousedown', handleGameInput)
  canvas.addEventListener('mouseup', handleGameInput)
  canvas.addEventListener('mousemove', handleMouseMove)

  window.addEventListener('keydown', handleGameInput)
  window.addEventListener('keyup', handleGameInput)

  canvas.addEventListener('touchstart', handleTouch)
  canvas.addEventListener('touchmove', handleTouchMove)
  canvas.addEventListener('touchend', handleTouchEnd)

  handle = requestAnimationFrame(loop)
  function loop (dt: number): void {
    if (ctx !== undefined && !$game.paused) {
      renderGame(ctx)
      for (let entity of $world.entities) {
        runEntityController(entity)
      }
      runEntityController($player, true)
    }
    handle = requestAnimationFrame(loop)
  }

  return () => {
    canvas.removeEventListener('mousedown', handleGameInput)
    canvas.removeEventListener('mouseup', handleGameInput)
    canvas.removeEventListener('mousemove', handleMouseMove)

    window.removeEventListener('keydown', handleGameInput)
    window.removeEventListener('keyup', handleGameInput)

    canvas.removeEventListener('touchstart', handleTouch)
    canvas.removeEventListener('touchmove', handleTouchMove)
    canvas.removeEventListener('touchend', handleTouchEnd)

    cancelAnimationFrame(handle)
  }
}

let doubleTapTimer = 0

function handleTouch(event: TouchEvent) {
  event.preventDefault()

  let time = new Date().getTime()

  if (time - doubleTapTimer < 600 && doubleTapTimer !== 0) {
    $player.movement.attack = true
  }
  doubleTapTimer = time

  $render.mouseX = event.touches[0].clientX
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
  if (currentX - $render.mouseX > 10) {
    $player.movement.right = true
    $player.movement.left = false
  } else if (currentX - $render.mouseX < -10) {
    $player.movement.left = true
    $player.movement.right = false
  }
  if (currentY - $render.mouseY > 30) {
    $player.movement.down = true
    $player.movement.jump = false
  } else if (currentY - $render.mouseY < -30) {
    $player.movement.down = false
    $player.movement.jump = true
  }

  $render.mouseX = currentX
  $render.mouseY = currentY
}
