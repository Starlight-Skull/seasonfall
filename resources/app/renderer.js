import { settings, world, weather, UI, fonts, animTileList, entityList, player, playerStats, tileEntityList, tileList, newTiles } from './globals.js'
// import { ctx } from './main.js'
import { entityMovement } from './movement.js'
import { element } from './helpers.js'

const ctx = element('screen').getContext('2d')

export function drawTextWithBackground (text, x, y, options) {
  let { color, font } = options
  ctx.textBaseline = 'top'
  ctx.font = font || UI.font
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.fillRect(x, y, ctx.measureText(text).width + settings.scale * 2, UI.fontSize + settings.scale)
  ctx.fillStyle = color || 'rgb(255,255,255)'
  ctx.fillText(text, x + settings.scale, y + settings.scale)
}

/**
 * Draws a given tile according to its propperties.
 * @param {NewTile} tile - The tile to draw.
 * @param {int} gridY - The Y coordinate without grid scaling.
 * @param {int} gridX - The X coordinate without grid scaling.
 */
export function newDrawTile (tile, gridY, gridX) {
  let x = gridX * world.grid
  let y = gridY * world.grid
  let w = tile.width * world.grid
  let h = tile.height * world.grid
  ctx.save()
  if (tile.mirrored) {
    ctx.scale(-1, 1)
    x = -x
    w = -w
  }
  if (tile.rotation) {
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate(tile.rotation * Math.PI / 180)
    x = -w / 2
    y = -h / 2
  }
  ctx.drawImage(tile.animation.sprite, x, y, w, h)
  if (world.showBoxes && tile.constructor.name === 'NewTile') {
    switch (tile.collision) {
      case 'none':
        ctx.fillStyle = 'rgba(10,50,0,0.5)'
        break
      case 'top':
        ctx.fillStyle = 'rgba(150,100,0,0.5)'
        break
      default:
        ctx.fillStyle = 'rgba(0,250,0,0.5)'
        break
    }
    ctx.fillRect(x, y, w, h)
    ctx.strokeRect(x, y, w, h)
  }
  ctx.restore()
  if (world.showBoxes) drawTextWithBackground(`${gridX},${gridY}`, gridX * world.grid, gridY * world.grid, { font: `${UI.fontSize}px ${fonts.Pixeloid}` })
}

export function drawSky () {
  let timeSet
  let sky = {
    morning: { shade: 0.2, color: 'rgb(207,113,175)' },
    beforeNoon: { shade: 0.1, color: 'rgb(135,206,235)' },
    noon: { shade: 0, color: 'rgb(178, 255, 255)' },
    afterNoon: { shade: 0.1, color: 'rgb(140,190,214)' },
    evening: { shade: 0.5, color: 'rgb(0,73,83)' },
    night: { shade: 0.7, color: 'rgb(25,25,112)' }
  }
  switch (true) {
    case (weather.time >= weather.sunrise - 50 && weather.time <= weather.sunrise + 50):
      timeSet = sky.morning
      break
    case (weather.time > weather.sunrise + 50 && weather.time < 1150):
      timeSet = sky.beforeNoon
      break
    case (weather.time >= 1150 && weather.time <= 1250):
      timeSet = sky.noon
      break
    case (weather.time > 1250 && weather.time < weather.sunset - 50):
      timeSet = sky.afterNoon
      break
    case (weather.time >= weather.sunset - 50 && weather.time <= weather.sunset + 50):
      timeSet = sky.evening
      break
    default:
      timeSet = sky.night
      break
  }
  world.shade = timeSet.shade
  ctx.fillStyle = timeSet.color
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
}

// old

function drawTile (tile) {
  if ((player.frame.x - (tile.frame.x + tile.frame.width) <= (window.innerWidth / 2)) && (tile.frame.x - (player.frame.x + player.frame.width) <= (window.innerWidth / 2)) && (player.frame.y - (tile.frame.y + tile.frame.height) <= (window.innerHeight / 3)) && (tile.frame.y - (player.frame.y + player.frame.height) <= (window.innerHeight))) {
    // if frame is bigger, sprite is drawn multiple times to cover the whole size
    const height = (tile.animation ? tile.animation.height : tile.sprite.height) * settings.scale
    const width = (tile.animation ? tile.animation.width : tile.sprite.width) * settings.scale
    for (let i = 0; i < tile.frame.height; i += height) {
      if (((tile.frame.y + i) - (player.frame.y + player.frame.height)) <= (window.innerHeight) && (player.frame.y - (tile.frame.y + tile.animation.height * settings.scale + i)) <= (window.innerHeight / 3)) {
        for (let j = 0; j < tile.frame.width; j += width) {
          if (((tile.frame.x + j) - (player.frame.x + player.frame.width)) <= (window.innerWidth / 2) && (player.frame.x - (tile.frame.x + tile.animation.width * settings.scale + j)) <= (window.innerWidth / 2)) {
            // tile entities have animation frame instead
            if (Object.getPrototypeOf(Object.getPrototypeOf(tile)).constructor.name === 'TileEntity') {
              if (tile.frame.mirrored) {
                ctx.setTransform(-1, 0, 0, 1, window.innerWidth * 1.5 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10)
                ctx.drawImage(tile.animation.sprite, tile.animation.x + (tile.animation.width * Math.round(tile.frame.currentFrame)), tile.animation.y, tile.animation.width, tile.animation.height, window.innerWidth - tile.frame.x - tile.frame.width + j, window.innerHeight - tile.frame.y - tile.animation.height * settings.scale - i, tile.animation.width * settings.scale, tile.animation.height * settings.scale)
                ctx.setTransform(1, 0, 0, 1, window.innerWidth / 2 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10)
              } else {
                ctx.drawImage(tile.animation.sprite, tile.animation.x + (tile.animation.width * Math.round(tile.frame.currentFrame)), tile.animation.y, tile.animation.width, tile.animation.height, tile.frame.x + j, window.innerHeight - tile.frame.y - tile.animation.height * settings.scale - i, tile.animation.width * settings.scale, tile.animation.height * settings.scale)
              }
            } else {
              ctx.drawImage(tile.sprite, tile.frame.x + j, window.innerHeight - tile.frame.y - tile.sprite.height * settings.scale - i, tile.sprite.width * settings.scale, tile.sprite.height * settings.scale)
            }
          }
        }
      }
    }
    // draw a box to show the true hitbox
    if (world.showBoxes) {
      if (Object.getPrototypeOf(Object.getPrototypeOf(tile)).constructor.name === 'TileEntity') {
        ctx.fillStyle = 'rgba(0,71,250,0.5)'
      } else if (tile.hasCollision === 2) {
        ctx.fillStyle = 'rgba(0,250,108,0.5)'
      } else if (tile.hasCollision === false) {
        ctx.fillStyle = 'rgba(250,200,0,0.5)'
      } else {
        ctx.fillStyle = 'rgba(65,250,0,0.5)'
      }
      ctx.fillRect(tile.frame.x, window.innerHeight - tile.frame.y - tile.frame.height, tile.frame.width, tile.frame.height)
    }
  }
}

function drawEntity (entity) {
  entityMovement(entity)
  if ((player.frame.x - (entity.frame.x + entity.frame.width) <= (window.innerWidth / 2)) && (entity.frame.x - (player.frame.x + player.frame.width) <= (window.innerWidth / 2)) && (player.frame.y - (entity.frame.y + entity.frame.height) <= (window.innerHeight / 3)) && (entity.frame.y - (player.frame.y + player.frame.height) <= (window.innerHeight))) {
    // draw current sprite
    if (entity.animation) {
      // mirror if needed
      if (entity.frame.mirrored) {
        ctx.setTransform(-1, 0, 0, 1, window.innerWidth * 1.5 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10)
        ctx.drawImage(entity.animation.sprite, entity.animation.x + (entity.animation.width * Math.floor(entity.frame.currentFrame)), entity.animation.y, entity.animation.width, entity.animation.height, window.innerWidth - entity.frame.x - entity.animation.width * settings.scale + Math.abs(entity.frame.width / 2 - entity.animation.width * settings.scale / 2), window.innerHeight - entity.frame.y - entity.animation.height * settings.scale, entity.animation.width * settings.scale, entity.animation.height * settings.scale)
        ctx.setTransform(1, 0, 0, 1, window.innerWidth / 2 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10)
      } else {
        ctx.drawImage(entity.animation.sprite, entity.animation.x + (entity.animation.width * Math.floor(entity.frame.currentFrame)), entity.animation.y, entity.animation.width, entity.animation.height, entity.frame.x - Math.abs(entity.frame.width / 2 - entity.animation.width * settings.scale / 2), window.innerHeight - entity.frame.y - entity.animation.height * settings.scale, entity.animation.width * settings.scale, entity.animation.height * settings.scale)
      }
    }
    // draw a box to show the true hitbox
    if (!entity.animation || world.showBoxes) {
      ctx.fillStyle = 'rgba(250,0,250,0.5)'
      ctx.fillRect(entity.frame.x, window.innerHeight - entity.frame.y - entity.frame.height, entity.frame.width, entity.frame.height)
    }
  }
}

function drawStats (entity) {
  if (entity.constructor.name === 'Hero') {
    // name
    drawTextWithBackground(entity.name, entity.frame.x + entity.frame.width / 2 - (entity.name.length * 8), window.innerHeight - entity.frame.y - entity.frame.height - 65, { color: 'rgb(255,255,255)' })
    // xp
    if (entity.stats.xp !== 0) {
      drawTextWithBackground(entity.stats.xp.toString(), entity.frame.x + entity.frame.width / 2 - (entity.stats.xp.toString().length * 8), window.innerHeight - entity.frame.y - entity.frame.height - 95, { color: 'rgb(0,255,0)' })
    }
  } else {
    // hp
    if (entity.stats.hp > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.maxHP * 1.5 / 2 - 5, window.innerHeight - entity.frame.y - entity.frame.height - 60, entity.stats.maxHP * 1.5 + 10, 20)
      ctx.fillStyle = 'rgba(255,0,0,0.7)'
      ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.hp * 1.5 / 2, window.innerHeight - entity.frame.y - entity.frame.height - 55, entity.stats.hp * 1.5, 10)
    }
    // mp
    if (entity.stats.mp > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.maxMP * 1.5 / 2 - 5, window.innerHeight - entity.frame.y - entity.frame.height - 40, entity.stats.maxMP * 1.5 + 10, 15)
      ctx.fillStyle = 'rgba(0,0,255,0.7)'
      ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.mp * 1.5 / 2, window.innerHeight - entity.frame.y - entity.frame.height - 40, entity.stats.mp * 1.5, 10)
    }
    // debug
    if (world.showLiveDebug) {
      const val = `${entity.controls.left ? '←' : ''}${entity.controls.down ? '↓' : ''}${entity.controls.attack ? '#' : ''}${entity.controls.jump ? '▲' : ''}${entity.controls.right ? '→' : ''}`
      drawTextWithBackground(val, entity.frame.x + entity.frame.width / 2 - (val.length * 8), window.innerHeight - entity.frame.y - entity.frame.height - 65, { color: 'rgb(255,255,255)' })
    }
  }
}

function drawDebug () {
  // debug info
  if (world.showLiveDebug) {
    const tracked = player
    drawTextWithBackground(`ANIM: ${tracked.constructor.name} - ${tracked.animation.name} - ${Math.round(tracked.frame.currentFrame * 100) / 100 + 1}/${tracked.animation.frames}`, 5, 100, { color: 'cyan' })
    drawTextWithBackground(`POS: [${Math.round(tracked.frame.x)}, ${Math.round(tracked.frame.y)}]`, 5, 130, { color: 'cyan' })
    drawTextWithBackground(`SHADE: ${Math.round(world.shade * 100) / 100}  MOVE:${tracked.controls.left ? ' ←' : ''}${tracked.controls.attack ? (tracked.controls.attack === 2 ? ' $' : ' #') : ''}${tracked.controls.jump ? ' ▲' : ''}${tracked.controls.down ? ' ↓' : ''}${tracked.controls.right ? ' →' : ''}`, 5, 160, { color: 'cyan' })
    // drawTextWithBackground(`name: ${value}`, 5, 190, { color: 'cyan' })
  }
  if (world.showPlayerStats) {
    drawTextWithBackground(`Attacks: ${playerStats.attacks}`, 5, 220, { color: 'magenta' })
    drawTextWithBackground(`Attacks Hit: ${playerStats.attacksHit}`, 5, 250, { color: 'magenta' })
    drawTextWithBackground(`Damage Taken: ${playerStats.damageTaken}`, 5, 280, { color: 'magenta' })
    drawTextWithBackground(`Damage Dealt: ${playerStats.damageDealt}`, 5, 310, { color: 'magenta' })
    drawTextWithBackground(`Kills: ${playerStats.kills}`, 5, 340, { color: 'magenta' })
    drawTextWithBackground(`Time Taken: ${playerStats.timeTaken}`, 5, 370, { color: 'magenta' })
  }
}

function drawPlayerBars () {
  // player hp
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.fillRect(20, 20, player.stats.maxHP * 5 + 10, 30)
  const hpGradient = ctx.createLinearGradient(25, 25, player.stats.maxHP * 5, 20)
  hpGradient.addColorStop(0, 'red')
  hpGradient.addColorStop(1, 'magenta')
  ctx.fillStyle = hpGradient
  if (player.stats.hp > 0) {
    ctx.fillRect(25, 25, player.stats.hp * 5, 20)
  }
  // player mp
  if (player.stats.mp !== 0) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(20, 50, player.stats.maxMP * 5 + 10, 15)
    const mpGradient = ctx.createLinearGradient(25, 50, player.stats.maxMP * 5, 10)
    mpGradient.addColorStop(0, 'blue')
    mpGradient.addColorStop(1, 'cyan')
    ctx.fillStyle = mpGradient
    if (player.stats.mp > 0) {
      ctx.fillRect(25, 50, player.stats.mp * 5, 10)
    }
  }
}

export function drawMain () {
  // has to be disabled so pixel art isn't blurry
  ctx.imageSmoothingEnabled = false
  drawSky()
  // move context to player
  ctx.translate(window.innerWidth / 2 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10)
  // draw world
  if (weather.rain > 0 || weather.snow > 0) {
    for (let i = 0; i < animTileList.length; i++) {
      animTileList[i].activate()
      animTileList[i].frame.mirrored = (weather.windDeg === 'East')
      animTileList[i].animation.speed = weather.windSpeed / 10
      animTileList[i].isSnow = (weather.snow > 0)
      drawTile(animTileList[i])
    }
  }
  for (let i = 0; i < tileList.length; i++) {
    drawTile(tileList[i])
  }
  for (const row in newTiles) {
    for (const collum in newTiles[row]) {
      newDrawTile(newTiles[row][collum], row, collum)
    }
  }
  for (let i = 0; i < tileEntityList.length; i++) {
    drawTile(tileEntityList[i])
  }
  for (let i = 0; i < entityList.length; i++) {
    drawEntity(entityList[i])
  }
  drawEntity(player)
  ctx.fillStyle = `rgba(0,0,0,${world.shade})`
  ctx.fillRect(-world.width / 2, window.innerHeight * 1.5, world.width * 2, -world.height * 2)
  for (let i = 0; i < entityList.length; i++) {
    drawStats(entityList[i])
  }
  drawStats(player)
  // reset context
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.translate(0, 0)

  drawPlayerBars()
  drawDebug()
  drawTextWithBackground('OBJECTIVE: Defeat all skeletons', window.innerWidth * 0.4, 20, { color: 'red' })
}
