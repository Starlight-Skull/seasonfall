import { type Entity, type Tile, Collision } from './classes'
import { NewHero } from './classesExtended'
import { UI, player, playerStats, settings, weather, world, level } from './globals'
import { element } from './helpers'
import { entityMovement, nextFrame } from './movement'

const ctx = (element('screen') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D

/**
 * Constants for the color and shade of the sky.
 */
const sky = Object.freeze({
  morning: { shade: 0.2, color: 'rgb(207,113,175)' },
  beforeNoon: { shade: 0.1, color: 'rgb(135,206,235)' },
  noon: { shade: 0, color: 'rgb(178, 255, 255)' },
  afterNoon: { shade: 0.1, color: 'rgb(140,190,214)' },
  evening: { shade: 0.5, color: 'rgb(0,73,83)' },
  night: { shade: 0.7, color: 'rgb(25,25,112)' }
})

/**
 * Draws text at a specified location with optional color and font.
 */
export function drawTextWithBackground (text: string, x: number, y: number, options?: { color?: string, font?: string, center?: boolean }): void {
  const { color, font, center } = options ?? {}
  const pad = 5
  ctx.textBaseline = 'top'
  ctx.font = font ?? UI.font
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  if (center ?? false) x -= ctx.measureText(text).width / 2 - pad
  ctx.fillRect(x, y, ctx.measureText(text).width + pad * 2, UI.fontSize + pad)
  ctx.fillStyle = color ?? 'rgb(255,255,255)'
  ctx.fillText(text, x + pad, y + pad)
}

/**
 * Draws a given tile according to its properties.
 * @param tile - The tile to draw.
 * @param gridY - The Y coordinate without grid scaling.
 * @param gridX - The X coordinate without grid scaling.
 */
export function drawTile (gridY: number, gridX: number, tile: Tile): void {
  let x = gridX * world.grid
  let y = gridY * world.grid
  let w = tile.width * world.grid
  let h = tile.height * world.grid
  let animW = tile.animation.width * settings.scale
  let animH = tile.animation.height * settings.scale
  let animX = x
  let animY = y
  ctx.save()
  if (tile.mirrored) {
    ctx.scale(-1, 1)
    x *= -1
    w *= -1
    animX *= -1
    animW *= -1
  }
  if (tile.rotation !== 0) {
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate(tile.rotation * Math.PI / 180)
    x = -w / 2
    y = -h / 2
  }
  ctx.drawImage(tile.animation.image,
    tile.animation.x + (tile.animation.width * Math.floor(tile.animationFrame)),
    tile.animation.y,
    tile.animation.width,
    tile.animation.height,
    animX, animY, animW, animH)
  if (world.showBoxes) {
    switch (tile.collision) {
      case Collision.none:
        ctx.fillStyle = 'rgba(10,50,0,0.5)'
        break
      case Collision.top:
        ctx.fillStyle = 'rgba(150,100,0,0.5)'
        break
      default:
        ctx.fillStyle = 'rgba(0,250,0,0.5)'
        break
    }
    if (tile.activator) {
      ctx.fillStyle = 'rgba(0,71,250,0.5)'
    }
    ctx.fillRect(x, y, w, h)
    ctx.strokeRect(animX, animY, animW, animH)
  }
  ctx.restore()
  if (world.showLiveDebug) {
    drawTextWithBackground(`${gridX},${gridY}`, gridX * world.grid, gridY * world.grid, { color: 'rgb(0,200,0)' })
  }
  if (tile.animation.frames > 1) nextFrame(tile, true)
}

export function drawSky (): void {
  let timeSet
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

/**
 * Draws a given entity according to its properties.
 */
function drawEntity (entity: Entity): void {
  let w = entity.width * world.grid
  let h = entity.height * world.grid
  let x = entity.x * world.grid
  let y = entity.y * world.grid
  let animW = entity.animation.width * settings.scale
  let animH = entity.animation.height * settings.scale
  let animX = x - Math.abs(animW - w) / 2
  let animY = y - Math.abs(animH - h)
  ctx.save()
  if (entity.mirrored) {
    ctx.scale(-1, 1)
    x *= -1
    w *= -1
    animX *= -1
    animW *= -1
  }
  ctx.drawImage(entity.animation.image,
    entity.animation.x + (entity.animation.width * Math.floor(entity.animationFrame)),
    entity.animation.y,
    entity.animation.width,
    entity.animation.height,
    animX, animY, animW, animH)
  if (world.showBoxes) {
    ctx.fillStyle = 'rgba(250,0,250,0.5)'
    ctx.strokeStyle = 'rgb(250,0,250)'
    ctx.fillRect(x, y, w, h)
    ctx.strokeRect(animX, animY, animW, animH)
  }
  ctx.restore()
  if (world.showLiveDebug) {
    drawTextWithBackground(`${(entity.x.toFixed(1))},${entity.y.toFixed(1)}`, entity.x * world.grid, entity.y * world.grid, { font: UI.getFont(15), color: 'rgb(250,0,250)' })
  }
}

function drawStats (entity: Entity): void {
  let x = (entity.x + entity.width / 2) * world.grid
  let y = entity.y * world.grid
  if (entity instanceof NewHero) {
    //* name *//
    drawTextWithBackground(entity.name, x, y - 65, { color: 'rgb(255,255,255)', center: true })
    //* xp *//
    if (entity.stats.xp !== 0) {
      drawTextWithBackground(`${entity.stats.xp}`, x, y - 95, { color: 'rgb(0,255,0)', center: true })
    }
  } else {
    //* hp *//
    if (entity.stats.hp > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.fillRect(x - entity.stats.maxHP * 1.5 / 2 - 5, y - 60, entity.stats.maxHP * 1.5 + 10, 20)
      ctx.fillStyle = 'rgba(255,0,0,0.7)'
      ctx.fillRect(x - entity.stats.hp * 1.5 / 2, y - 55, entity.stats.hp * 1.5, 10)
    }
    //* mp *//
    if (entity.stats.mp > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.fillRect(x - entity.stats.maxMP * 1.5 / 2 - 5, y - 40, entity.stats.maxMP * 1.5 + 10, 15)
      ctx.fillStyle = 'rgba(0,0,255,0.7)'
      ctx.fillRect(x - entity.stats.mp * 1.5 / 2, y - 40, entity.stats.mp * 1.5, 10)
    }
    //* debug *//
    if (world.showLiveDebug) {
      const val = `${entity.movement.left ? '←' : ''}${entity.movement.down ? '↓' : ''}${entity.movement.attack ? '#' : ''}${entity.movement.jump ? '▲' : ''}${entity.movement.right ? '→' : ''}`
      drawTextWithBackground(val, x, y - 95, { color: 'rgb(255,255,255)', center: true })
    }
  }
}

function drawDebug (): void {
  //* debug info *//
  if (world.showLiveDebug) {
    const tracked = player
    drawTextWithBackground(`ANIM: ${tracked.constructor.name}::${tracked.animation.constructor.name} - ${Math.round(tracked.animationFrame * 100) / 100 + 1}/${tracked.animation.frames}`, 5, 100, { color: 'cyan' })
    drawTextWithBackground(`POS: [${Math.round(tracked.x)}, ${Math.round(tracked.y)}] \t ${tracked.collision.enabled ? 'COL: ' : ''}[${tracked.collision.left ? ' ←' : ''}${tracked.collision.up ? ' ↑' : ''}${tracked.collision.down ? ' ↓' : ''}${tracked.collision.right ? ' →' : ''}]`, 5, 130, { color: 'cyan' })
    drawTextWithBackground(`SHADE: ${Math.round(world.shade * 100) / 100} \t MOVE: [${tracked.movement.left ? ' ←' : ''}${tracked.movement.attack ? ' $' : ''}${tracked.movement.use ? ' #' : ''}${tracked.movement.jump ? ' ▲' : ''}${tracked.movement.down ? ' ↓' : ''}${tracked.movement.right ? ' →' : ''}] ${tracked.stats.jumpTime}`, 5, 160, { color: 'cyan' })
    drawTextWithBackground(`WORLD: [${level.properties.rootX},${level.properties.rootY}][${level.properties.borderX},${level.properties.borderY},${level.properties.borderW},${level.properties.borderH}]`, 5, 190, { color: 'cyan' })
    drawTextWithBackground(`DEBUG: ${world.debug}`, 5, 220, { color: 'red' })
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

function drawPlayerBars (): void {
  //* player hp *//
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.fillRect(20, 20, player.stats.maxHP * 5 + 10, 30)
  const hpGradient = ctx.createLinearGradient(25, 25, player.stats.maxHP * 5, 20)
  hpGradient.addColorStop(0, 'red')
  hpGradient.addColorStop(1, 'magenta')
  ctx.fillStyle = hpGradient
  if (player.stats.hp > 0) {
    ctx.fillRect(25, 25, player.stats.hp * 5, 20)
  }
  //* player mp *//
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

let mouseX = 0
let mouseY = 0
onmousemove = (e: MouseEvent) => {
  if (!world.paused) {
    mouseX = Math.floor(Math.round(world.focusX * world.grid - window.innerWidth / 2 + e.clientX) / world.grid)
    mouseY = Math.floor(Math.round(world.focusY * world.grid - window.innerHeight / 2 + e.clientY) / world.grid)
  }
}

onmousedown = (e: MouseEvent) => {
  if (!world.paused) {
    if (e.button === 2) {
      world.focusX = mouseX
      world.focusY = mouseY
    }
    if (e.button === 1) {
      player.x = mouseX
      player.y = mouseY
    }
  }
}

export function drawMain (): void {
  // has to be disabled so pixel art isn't blurry
  ctx.imageSmoothingEnabled = false
  drawSky()

  // if (weather.rain > 0 || weather.snow > 0) {
  //   for (let i = 0; i < animTileList.length; i++) {
  //     animTileList[i].activate()
  //     animTileList[i].frame.mirrored = (weather.windDeg === 'East')
  //     animTileList[i].animation.speed = weather.windSpeed / 10
  //     animTileList[i].isSnow = (weather.snow > 0)
  //     drawTile(animTileList[i])
  //   }
  // }

  ctx.save()
  ctx.translate(window.innerWidth / 2 - (world.focusX * world.grid), window.innerHeight / 2 - (world.focusY * world.grid))
  const renderMinX = Math.floor(world.focusX - window.innerWidth / 2 / world.grid)
  const renderMaxX = Math.ceil(world.focusX + window.innerWidth / 2 / world.grid)
  const renderMinY = Math.floor(world.focusY - window.innerHeight / 2 / world.grid)
  const renderMaxY = Math.ceil(world.focusY + window.innerHeight / 2 / world.grid)

  //* tiles *//
  for (let y = renderMinY; y < renderMaxY; y++) {
    for (let x = renderMinX; x < renderMaxX; x++) {
      const background = level.background[y]?.[x]
      if (background !== undefined) drawTile(y, x, background)
    }
  }
  for (let y = renderMinY; y < renderMaxY; y++) {
    for (let x = renderMinX; x < renderMaxX; x++) {
      const foreground = level.foreground[y]?.[x]
      if (foreground !== undefined) drawTile(y, x, foreground)
    }
  }

  //* entities + player *//
  for (let entity of level.entities) {
    entityMovement(entity)
    if (entity.x < renderMinX || entity.x > renderMaxX || entity.y < renderMinY || entity.y > renderMaxY) continue
    drawEntity(entity)
  }
  entityMovement(player)
  drawEntity(player)

  //* mouse position *//
  ctx.fillStyle = 'rgba(250,250,250,0.5)'
  ctx.strokeStyle = 'white'
  ctx.fillRect(mouseX * world.grid, mouseY * world.grid, world.grid, world.grid)
  if (world.showLiveDebug) drawTextWithBackground(`${mouseX},${mouseY}`, mouseX * world.grid, mouseY * world.grid, { color: 'white' })
  //* focus point *//
  ctx.strokeRect(world.focusX * world.grid, world.focusY * world.grid, world.grid, world.grid)

  ctx.restore()

  //* shade overlay *//
  ctx.fillStyle = `rgba(0,0,0,${world.shade})`
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

  //* entity stats *//
  ctx.save()
  ctx.translate(window.innerWidth / 2 - (world.focusX * world.grid), window.innerHeight / 2 - (world.focusY * world.grid))
  for (let entity of level.entities) {
    if (entity.x < renderMinX || entity.x > renderMaxX || entity.y < renderMinY || entity.y > renderMaxY) continue
    drawStats(entity)
  }
  drawStats(player)
  ctx.restore()

  //* UI *//
  drawPlayerBars()
  drawDebug()
}
