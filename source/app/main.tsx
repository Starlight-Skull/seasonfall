import { initData } from './data'
import { newTiles, player, playerStats, settings, world } from './globals'
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

  player.hasCollision = false
  world.showBoxes = true

  // // Function to download data to a file
  // function download (data: any, filename: string, type: string): void {
  //   let file = new Blob([data], { type })
  //   let a = document.createElement('a')
  //   let url = URL.createObjectURL(file)
  //   a.href = url
  //   a.download = filename
  //   document.body.appendChild(a)
  //   a.click()
  //   setTimeout(() => {
  //     document.body.removeChild(a)
  //     window.URL.revokeObjectURL(url)
  //   }, 0)
  // }
  //
  // let arr: string[][] = []
  // for (let y = 0; y < newTiles.length; y++) {
  //   let row = newTiles[y]
  //   let subArr: string[] = []
  //   if (row !== undefined) {
  //     for (let x = 0; x < row.length; x++) {
  //       let col = newTiles[y]?.[x]
  //       if (col !== undefined) {
  //         let path = col.sprite.image.src
  //         subArr.push(path.substring(path.lastIndexOf('/') + 1, path.indexOf('.png')))
  //       } else subArr.push('')
  //     }
  //     arr.push(subArr)
  //   } else arr.push([])
  // }

  // download(JSON.stringify(arr), 'NewTiles.json', 'json')

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
