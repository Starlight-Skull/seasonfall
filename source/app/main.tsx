import { initData } from './data'
import { playerStats, settings, world } from './globals'
import { element, handleMouseKeyEvent } from './helpers'
import { initMenu } from './menu'
import { drawMain, drawTextWithBackground } from './renderer'

import '../styles/index.sass'

let fps = 0
let frames = 0

// fps counter
setInterval(() => {
  fps = frames
  frames = 0
  playerStats.timeTaken++
}, 1000)

window.addEventListener('load', () => {
  // setup for drawing
  const canvas: HTMLCanvasElement = element('screen') as HTMLCanvasElement
  if (canvas.getContext('2d') === null) window.alert('This application is not supported by your browser.')

  window.addEventListener('mousedown', ev => { handleMouseKeyEvent(`Mouse${ev.button}`, true) })
  window.addEventListener('mouseup', ev => { handleMouseKeyEvent(`Mouse${ev.button}`, false) })
  window.addEventListener('keydown', ev => { handleMouseKeyEvent(ev.code, true) })
  window.addEventListener('keyup', ev => { handleMouseKeyEvent(ev.code, false) })

  initData()
  initMenu()

  game()
  function game (): void {
    if (!world.paused) {
      // update screen in case of window resize
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawMain()
    }
    frames++
    if (settings.showFPS) drawTextWithBackground(`FPS: ${fps}`, window.innerWidth - 150, 20, { color: 'rgb(0,255,0)' })
    requestAnimationFrame(game)
  }
})
