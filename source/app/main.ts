import { initData } from './logic/data'
import { initAssets } from './rendering/assets'
import { settings, world, weather } from './globals'
import { element, formatUnixTime, getFrameCount, handleMouseKeyEvent } from './helpers'
import { initMenu } from './interface/menu'
import { drawMain, drawTextWithBackground } from './rendering/renderer'
import initReact from './interface/Root'
import { ctx } from './interface/Canvas'

import '../styles/index.sass'
import worldJson from '../worlds/tower.world.json'


window.addEventListener('load', () => {
  window.oncontextmenu = e => { return false }
  window.addEventListener('mousedown', ev => { handleMouseKeyEvent(`Mouse${ev.button}`, true) })
  window.addEventListener('mouseup', ev => { handleMouseKeyEvent(`Mouse${ev.button}`, false) })
  window.addEventListener('keydown', ev => { handleMouseKeyEvent(ev.code, true) })
  window.addEventListener('keyup', ev => { handleMouseKeyEvent(ev.code, false) })

  initAssets(worldJson)
  initReact()
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
    if (ctx !== undefined) {
      if (!world.paused) drawMain(ctx)
      world.frames++
      if (settings.showFPS) drawTextWithBackground(ctx, `FPS: ${world.fps}`, window.innerWidth - 150, 20, { color: 'rgb(0,255,0)' })
    }
    requestAnimationFrame(game)
  }
})
