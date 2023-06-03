import { initData } from './data'
import { player, playerStats, settings, tileList, world } from './globals'
import { download, element, handleMouseKeyEvent } from './helpers'
import { initMenu } from './menu'
import { drawMain, drawTextWithBackground } from './renderer'
import { addAssets } from './textures'

import * as PIXI from 'pixi.js'
import { Sprite, Assets, Point, Text } from 'pixi.js'

import '../styles/index.sass'

import WORLD from '../worlds/world.json'

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

  // player.hasCollision = false
  // world.showBoxes = true
  // settings.showFPS = true

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

  const app = new PIXI.Application({
    resolution: window.devicePixelRatio ?? 1,
    autoDensity: true,
    resizeTo: window,
    backgroundColor: 'rgb(178, 255, 255)',
    antialias: true,
    width: window.innerWidth,
    height: window.innerHeight
  })
  document.getElementById('app')?.appendChild(app.view as any)

  void initPIXI(app)
})

async function initPIXI (app: PIXI.Application): Promise<void> {
  addAssets()
  for (let y = 0; y < WORLD.background.length; y++) {
    for (let x = 0; x < WORLD.background[y].length; x++) {
      if (WORLD.background[y][x] !== '' && WORLD.background[y][x] !== null) {
        const sprite = new Sprite(await Assets.load(WORLD.background[y][x] as string))
        sprite.anchor.set(0.5)
        sprite.position.set(x * 16 * 5, y * 16 * 5)
        sprite.scale.set(5)
        app.stage.addChild(sprite)
      }
    }
  }
  for (let y = 0; y < WORLD.foreground.length; y++) {
    for (let x = 0; x < WORLD.foreground[y].length; x++) {
      if (WORLD.foreground[y][x] !== '' && WORLD.foreground[y][x] !== null) {
        const sprite = new Sprite(await Assets.load(WORLD.foreground[y][x] as string))
        sprite.anchor.set(0.5)
        sprite.position.set(x * 16 * 5, y * 16 * 5)
        sprite.scale.set(5)
        app.stage.addChild(sprite)
      }
    }
  }

  const fpsText = new Text(fps, { fill: 'red' })
  fpsText.position.set(0, 0)
  app.stage.addChild(fpsText)

  app.stage.position.set(0, -3000)
  // app.stage.scale.set(5)

  app.ticker.add(() => {
    frames++
    fpsText.text = `${fps}`
  })
}
