import { initData } from './data/data'
import initAssets from './data/assets'
import { world } from './globals/world'
import { FONTS } from './globals/fonts'
import { settings } from './globals/settings'
import { weather } from './globals/weather'
import { formatUnixTime, getFrameCount } from './helpers'
import handleMouseKeyEvent from './logic/input'
import drawMain from './rendering/main'
import drawText from './rendering/text'
import { ctx } from './interface/GameView/Canvas'

import worldJson from '../worlds/tower.world.json'

export default function setupGame() {
  window.oncontextmenu = () => { return false }
  window.addEventListener('mousedown', ev => { handleMouseKeyEvent(`Mouse${ev.button}`, true) })
  window.addEventListener('mouseup', ev => { handleMouseKeyEvent(`Mouse${ev.button}`, false) })
  window.addEventListener('keydown', ev => { handleMouseKeyEvent(ev.code, true) })
  window.addEventListener('keyup', ev => { handleMouseKeyEvent(ev.code, false) })

  initAssets(worldJson)
  initData()

  weather.time = formatUnixTime(Date.now() / 1000, 2 * 60 * 60)

  //* fps counter *//
  setInterval(getFrameCount, 1000)

  game()
  //* game loop *//
  function game (): void {
    if (ctx !== undefined) {
      if (!world.paused) drawMain(ctx)
      world.frames++
      if (settings.showFPS) drawText(ctx, `${world.fps}`, 0, 0, { color: 'rgb(0,255,0)', size: 15, style: FONTS.PixeloidMono })
    }
    requestAnimationFrame(game)
  }
}
