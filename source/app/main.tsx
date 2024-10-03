import { initData } from './data'
import { initAssets } from './textures'
import { settings, world, weather } from './globals'
import { element, formatUnixTime, getFrameCount, handleMouseKeyEvent } from './helpers'
import { initMenu } from './menu'
import { drawMain, drawTextWithBackground } from './renderer'

import '../styles/index.sass'
import worldJson from '../worlds/tower.world.json'

window.addEventListener('load', () => {
  //* setup for drawing *//
  const canvas: HTMLCanvasElement = element('screen') as HTMLCanvasElement
  if (canvas.getContext('2d') === null) window.alert('This application is not supported by your browser.')

  window.oncontextmenu = e => { return false }
  window.addEventListener('mousedown', ev => { handleMouseKeyEvent(`Mouse${ev.button}`, true) })
  window.addEventListener('mouseup', ev => { handleMouseKeyEvent(`Mouse${ev.button}`, false) })
  window.addEventListener('keydown', ev => { handleMouseKeyEvent(ev.code, true) })
  window.addEventListener('keyup', ev => { handleMouseKeyEvent(ev.code, false) })

  initAssets(worldJson)
  initData()
  initMenu()

  //* debug options *//
  // player.hasCollision = false
  // world.showBoxes = true
  // world.showLiveDebug = true
  // weather.time = formatUnixTime(Date.now() / 1000, 2 * 60 * 60)

  //* fps counter *//
  setInterval(getFrameCount, 1000)

  game()
  //* game loop *//
  function game (): void {
    if (!world.paused) {
      // update screen in case of window resize
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawMain()
    }
    world.frames++
    if (settings.showFPS) drawTextWithBackground(`FPS: ${world.fps}`, window.innerWidth - 150, 20, { color: 'rgb(0,255,0)' })
    requestAnimationFrame(game)
  }
})
