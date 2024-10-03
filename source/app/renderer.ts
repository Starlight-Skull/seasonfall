import { type Entity, type Tile, Collision } from './classes'
import { Hero } from './classesExtended'
import { UI, player, playerStats, settings, weather, world, level } from './globals'
import { element } from './helpers'
import { entityMovement, nextFrame } from './movement'

const ctx = (element('screen') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
const render = {
  mouseX: 0,
  mouseY: 0,
  get minX () { return Math.floor(world.focusX - window.innerWidth / 2 / world.grid) },
  get maxX () { return Math.ceil(world.focusX + window.innerWidth / 2 / world.grid) },
  get minY () { return Math.floor(world.focusY - window.innerHeight / 2 / world.grid) },
  get maxY () { return Math.ceil(world.focusY + window.innerHeight / 2 / world.grid) },
  get focusX () { return window.innerWidth / 2 - grid(world.focusX) },
  get focusY () { return window.innerHeight / 2 - grid(world.focusY) },
  isOffScreen (x: number, y: number) { return x < render.minX || x > render.maxX || y < render.minY || y > render.maxY }
}

onmousemove = (e: MouseEvent) => {
  if (!world.paused) {
    render.mouseX = Math.floor(Math.round(grid(world.focusX) - window.innerWidth / 2 + e.clientX) / world.grid)
    render.mouseY = Math.floor(Math.round(grid(world.focusY) - window.innerHeight / 2 + e.clientY) / world.grid)
  }
}

// todo move to input code
onmousedown = (e: MouseEvent) => {
  if (!world.paused) {
    if (e.button === 2) {
      world.focusX = render.mouseX
      world.focusY = render.mouseY
    }
    if (e.button === 1) {
      player.x = render.mouseX
      player.y = render.mouseY
    }
  }
}

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
 * Main render loop.
 */
export function drawMain (): void {
  // has to be disabled so pixel art isn't blurry
  ctx.imageSmoothingEnabled = false
  drawSky()

  // todo reimplement weather
  // if (weather.rain > 0 || weather.snow > 0) {
  //   for (let i = 0; i < animTileList.length; i++) {
  //     animTileList[i].activate()
  //     animTileList[i].frame.mirrored = (weather.windDeg === 'East')
  //     animTileList[i].animation.speed = weather.windSpeed / 10
  //     animTileList[i].isSnow = (weather.snow > 0)
  //     drawTile(animTileList[i])
  //   }
  // }

  saveRestore(() => {
    ctx.translate(render.focusX, render.focusY)
    drawWorld()

    //* mouse position *//
    ctx.fillStyle = 'rgba(250,250,250,0.5)'
    ctx.strokeStyle = 'white'
    ctx.fillRect(grid(render.mouseX), grid(render.mouseY), world.grid, world.grid)
    if (world.showLiveDebug) drawTextWithBackground(`${render.mouseX},${render.mouseY}`, grid(render.mouseX), grid(render.mouseY), { color: 'white' })
    //* focus point *//
    ctx.strokeRect(grid(world.focusX), grid(world.focusY), world.grid, world.grid)
  })

  //* shade overlay *//
  ctx.fillStyle = `rgba(0,0,0,${world.shade})`
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

  drawUI()
}

/**
 * Saves render context and restores after executing script.
 * @param script - function callback
 */
function saveRestore (script: () => void): void {
  ctx.save()
  script()
  ctx.restore()
}

/**
 * Converts relative coordinate to absolute by multiplying with world.grid.
 */
function grid (value: number): number {
  return value * world.grid
}

/**
 * Draws text at a specified location with optional color and font.
 * @param text - Text to draw.
 * @param x - Absolute X coordinate.
 * @param y - Absolute Y coordinate.
 * @param options - Text options.
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
 * @param gridY - Relative X coordinate.
 * @param gridX - Relative Y coordinate.
 * @param tile - The tile to draw.
 */
export function drawTile (gridY: number, gridX: number, tile: Tile): void {
  let x = grid(gridX)
  let y = grid(gridY)
  let w = grid(tile.width)
  let h = grid(tile.height)
  let animW = tile.animation.width * settings.scale
  let animH = tile.animation.height * settings.scale
  let animX = x
  let animY = y
  saveRestore(() => {
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
      animX = x
      animY = y
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
  })
  // if (world.showLiveDebug) {
  //   drawTextWithBackground(`${gridX},${gridY}`, grid(gridX), grid(gridY), { color: 'rgb(0,200,0)' })
  // }
  if (tile.animation.frames > 1) nextFrame(tile, true)
}

/**
 * Draws a given entity according to its properties.
 */
function drawEntity (entity: Entity): void {
  let w = grid(entity.width)
  let h = grid(entity.height)
  let x = grid(entity.x)
  let y = grid(entity.y)
  let animW = entity.animation.width * settings.scale
  let animH = entity.animation.height * settings.scale
  let animX = x - Math.abs(animW - w) / 2
  let animY = y - Math.abs(animH - h)
  saveRestore(() => {
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
  })
  if (world.showLiveDebug) {
    drawTextWithBackground(`${(entity.x.toFixed(1))},${entity.y.toFixed(1)}`, grid(entity.x), grid(entity.y), { font: UI.getFont(15), color: 'rgb(250,0,250)' })
  }
}

/**
 * Draws HP, MP, XP, name and debug info relative to the given entity.
 */
function drawStats (entity: Entity): void {
  let x = grid(entity.x + entity.width / 2)
  let y = grid(entity.y)
  if (entity instanceof Hero) {
    //* name *//
    drawTextWithBackground(entity.heroName, x, y - 65, { color: 'rgb(255,255,255)', center: true })
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

/**
 * Draws defined debug info.
 */
function drawDebug (): void {
  //* debug info *//
  if (world.showLiveDebug) {
    const tracked = player
    drawTextWithBackground(`ANIM: ${tracked.constructor.name}::${tracked.animation.name} - ${Math.round(tracked.animationFrame * 100) / 100 + 1}/${tracked.animation.frames}`, 5, 100, { color: 'cyan' })
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

/**
 * Draws player HP and MP bars relative to the screen.
 */
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

/**
 * Draws the background depending on the time
 */
function drawSky (): void {
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
 * Draws tiles and entities.
 */
function drawWorld (): void {
  //* tiles *//
  for (let y = render.minY; y < render.maxY; y++) {
    for (let x = render.minX; x < render.maxX; x++) {
      const background = level.background[y]?.[x]
      if (background !== undefined) drawTile(y, x, background)
    }
  }
  for (let y = render.minY; y < render.maxY; y++) {
    for (let x = render.minX; x < render.maxX; x++) {
      const foreground = level.foreground[y]?.[x]
      if (foreground !== undefined) drawTile(y, x, foreground)
    }
  }
  //* entities + player *//
  for (let entity of level.entities) {
    entityMovement(entity)
    if (render.isOffScreen(entity.x, entity.y)) continue
    drawEntity(entity)
  }
  entityMovement(player)
  drawEntity(player)
}

/**
 * Draws UI overlay and floating entity stats.
 */
function drawUI (): void {
  //* entity stats *//
  saveRestore(() => {
    ctx.translate(render.focusX, render.focusY)
    for (let entity of level.entities) {
      if (render.isOffScreen(entity.x, entity.y)) continue
      drawStats(entity)
    }
    drawStats(player)
  })
  //* UI *//
  drawPlayerBars()
  drawDebug()
}
