import { initData } from './logic/data'
import { initAssets } from './rendering/assets'
import { settings, world, weather, fonts } from './globals'
import { formatUnixTime, getFrameCount, handleMouseKeyEvent } from './helpers'
import { drawMain, drawTextWithBackground } from './rendering/renderer'
import initReact from './interface/App'
import { ctx } from './interface/Canvas'

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

  //* debug options *//
  // player.hasCollision = false
  // world.showBoxes = true
  // world.showLiveDebug = true
  weather.time = formatUnixTime(Date.now() / 1000, 2 * 60 * 60)

  //* fps counter *//
  setInterval(getFrameCount, 1000)

  game()
  //* game loop *//
  function game (): void {
    if (ctx !== undefined) {
      if (!world.paused) drawMain(ctx)
      world.frames++
      if (settings.showFPS) drawTextWithBackground(ctx, `${world.fps}`, 0, 0, { color: 'rgb(0,255,0)', size: 15, style: fonts.PixeloidMono })
    }
    requestAnimationFrame(game)
  }
})
