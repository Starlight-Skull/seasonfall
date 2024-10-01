import { initData } from './data'
import { player, playerStats, settings, world, level, weather } from './globals'
import { download, element, formatUnixTime, handleMouseKeyEvent } from './helpers'
import { initMenu } from './menu'
import { drawMain, drawTextWithBackground } from './renderer'

import '../styles/index.sass'
import worldJson from '../worlds/world.json'

// todo move to global?
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

  level.properties = worldJson.properties
  level.foreground = worldJson.foreground
  level.background = worldJson.background
  world.focusX = level.properties.rootX
  world.focusY = level.properties.rootY
  player.x = level.properties.rootX
  player.y = level.properties.rootY

  initData()
  initMenu()

  // player.hasCollision = false
  // world.showBoxes = true
  // settings.showFPS = true
  // world.showLiveDebug = true
  // weather.time = formatUnixTime(Date.now() / 1000, 2 * 60 * 60)

  // let foreground: string[][] = new Array(70)
  // let background: string[][] = new Array(70)

  // foreground = new Array(70).fill('').map(() => new Array(35).fill(''))
  // background = new Array(70).fill('').map(() => new Array(35).fill(''))

  // for (let x = 0; x < tileList.length; x++) {
  //   let tile = tileList[x]
  //   const height = (tile.animation !== null ? tile.animation.height : tile.sprite.height) * settings.scale
  //   const width = (tile.animation !== null ? tile.animation.width : tile.sprite.width) * settings.scale
  //   for (let i = 0; i < tile.frame.height; i += height) {
  //     for (let j = 0; j < tile.frame.width; j += width) {
  //       let path = tile.animation.image.src
  //       if (tile.hasCollision !== false) {
  //         foreground[35 - (tile.frame.y + i) / 80 + 13][(tile.frame.x + j) / 80 + 13] = path.substring(path.lastIndexOf('/') + 1, path.indexOf('.png'))
  //       } else {
  //         background[35 - (tile.frame.y + i) / 80 + 13][(tile.frame.x + j) / 80 + 13] = path.substring(path.lastIndexOf('/') + 1, path.indexOf('.png'))
  //       }
  //     }
  //   }
  // }

  // download(JSON.stringify({ foreground, background }), 'world.json', 'json')

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
