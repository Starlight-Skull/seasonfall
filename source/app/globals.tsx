import { NewEntity, Tile } from './classes'
import { Door, Hero, Rain, Skeleton } from './classesExtended'
import { loadImage, textures } from './textures'

// entities
const skeleton = loadImage(textures.entity.skeleton)
// tileEntities
const door = loadImage(textures.tileEntity.door)
// tiles
const beam = loadImage(textures.tile.beam)
const brick = loadImage(textures.tile.brick)
const brickWall = loadImage(textures.tile.brick_wall)
const dirt = loadImage(textures.tile.dirt)
const dirtWall = loadImage(textures.tile.dirt_wall)
const grass = loadImage(textures.tile.grass)
const painting = loadImage(textures.tile.painting)
const plank = loadImage(textures.tile.plank)

export const version = '1.2.0'

interface Settings {
  [key: string]: string | number | boolean | object
  scale: number
  showFPS: boolean
  api: ApiSettings
  keybindings: KeyBindingsSettings
}

interface KeyBindingsSettings {
  [key: string]: string
  attack: string
  jump: string
  down: string
  left: string
  right: string
  use: string
}

interface ApiSettings {
  [key: string]: string | number
  key: string
  latitude: number
  longitude: number
  interval: number
}

export const settings: Settings = {
  scale: 5,
  showFPS: false,
  api: {
    key: '',
    latitude: 0,
    longitude: 0,
    interval: 600 // seconds
  },
  keybindings: {
    attack: 'Mouse0',
    jump: 'Space',
    down: 'KeyS',
    left: 'KeyA',
    right: 'KeyD',
    use: 'KeyE'
  }
}

interface World {
  width: number
  height: number
  shade: number
  paused: boolean
  showBoxes: boolean
  showLiveDebug: boolean
  showPlayerStats: boolean
  get grid(): number
}

export const world: World = {
  width: 5200,
  height: 2400,
  shade: 0,
  paused: false,
  showBoxes: false,
  showLiveDebug: false,
  showPlayerStats: false,
  get grid () { return settings.scale * 16 }
}

/**
 * Enum for fonts. Names are defined in css.
 * @readonly
 * @enum {string}
 */
export const fonts = Object.freeze({
  Pixeloid: 'Pixeloid',
  PixeloidMono: 'PixeloidMono',
  PixeloidBold: 'PixeloidBold'
})

export const UI = {
  fontSize: 25,
  fontStyle: fonts.Pixeloid,
  get font () { return `${this.fontSize}px ${this.fontStyle}` }
}

interface Weather {
  [key: string]: string | number
  main: string
  description: string
  time: number
  sunrise: number
  sunset: number
  temp: number
  tempFeelsLike: number
  pressure: number
  humidity: number
  dewPoint: number
  clouds: number
  uvi: number
  visibility: number
  windSpeed: number
  windDeg: string
  windGust: number
  rain: number
  snow: number
}

export const weather: Weather = {
  main: 'Clear',
  description: 'clear sky',
  time: 1200, // h:mm
  sunrise: 700, // h:mm
  sunset: 1900, // h:mm
  temp: 20, // °C
  tempFeelsLike: 20, // °C
  pressure: 0, // hPa
  humidity: 0, // %
  dewPoint: 0, // °C
  clouds: 50, // %
  uvi: 0,
  visibility: 1000, // meter
  windSpeed: 0, // m/s
  windDeg: 'East', // East|West
  windGust: 0, // m/s
  rain: 0, // mm/h
  snow: 0 // mm/h
}

interface PlayerStats {
  [key: string]: number
  timeTaken: number
  kills: number
  attacks: number
  attacksHit: number
  damageTaken: number
  damageDealt: number
}

export const playerStats: PlayerStats = {
  timeTaken: 0,
  kills: 0,
  attacks: 0,
  attacksHit: 0,
  damageTaken: 0,
  damageDealt: 0
}

export const player = new Hero(320, 640, 'Hero')

export const animTileList = [
  new Rain(-1040, 640, 1040, world.height, false),
  new Rain(0, 640, 1040, world.height, false),
  new Rain(1040, 640, 1040, world.height, false),
  new Rain(2080, 640, 1040, world.height, false),
  new Rain(3120, 640, 1040, world.height, false),
  new Rain(4160, 640, 1040, world.height, false),
  new Rain(5200, 640, 1040, world.height, false)
]

export const entityList = [
  new Skeleton(1, 1680, 640),
  new Skeleton(1, 2160, 640),
  new Skeleton(1, 3600, 1040),
  new Skeleton(1, 4000, 1040),
  new Skeleton(1, 4480, 1040),
  new Skeleton(1, 4400, 640),
  new Skeleton(1, 3440, 160),
  new Skeleton(1, 4000, 160),
  new Skeleton(1, 4640, 160),
  new Skeleton(1, 4640, 1920)
]

export const newEntities = [
  new NewEntity(0, 0, skeleton),
  new NewEntity(5.5, 2, skeleton)
]

export const tileList = [
  // surface
  new Tile(false, -1040, 640, 1040, 80, grass),
  new Tile(false, 0, 640, 160, 80, grass),
  new Tile(false, 5280, 960, 960, 80, grass),
  new Tile(true, 1040, 560, 1440, 80, grass),
  new Tile(true, 2480, 640, 160, 80, grass),
  new Tile(true, 2640, 720, 160, 80, grass),
  new Tile(true, 3040, 720, 160, 80, grass),
  new Tile(true, 3200, 800, 160, 80, grass),
  new Tile(true, 3360, 880, 160, 80, grass),
  // dirt
  new Tile(false, -1040, 80, 1040, 560, dirt),
  new Tile(false, -1040, -240, 1040, 320, dirt),
  new Tile(false, 5280, 0, 960, 960, dirt),
  new Tile(false, 0, 560, 160, 80, dirt),
  new Tile(false, 0, 80, 2400, 480, dirt),
  new Tile(true, 5200, 0, 80, 960, dirt),
  new Tile(true, 0, -240, 2560, 320, dirt),
  new Tile(true, 2560, -240, 2640, 320, dirt),
  // cave lower
  new Tile(false, 2480, 160, 2560, 160, dirtWall),
  new Tile(false, 2400, 320, 2720, 240, dirtWall),
  new Tile(false, 2560, 80, 640, 80, dirtWall),
  new Tile(true, 2400, 80, 80, 480, dirt),
  new Tile(true, 2480, 480, 160, 160, dirt),
  new Tile(true, 2640, 560, 160, 160, dirt),
  new Tile(true, 2480, 80, 80, 240, dirt),
  new Tile(true, 3200, 80, 2000, 80, dirt),
  new Tile(true, 4960, 160, 80, 80, dirt),
  new Tile(true, 5040, 160, 80, 160, dirt),
  new Tile(true, 5120, 160, 80, 400, dirt),
  // cave upper
  new Tile(false, 3600, 640, 1600, 320, dirtWall),
  new Tile(false, 4960, 560, 240, 80, dirtWall),
  new Tile(true, 2960, 560, 2000, 80, dirt),
  new Tile(true, 3520, 880, 1200, 80, dirt),
  new Tile(false, 3040, 640, 160, 80, dirt),
  new Tile(false, 3200, 640, 160, 160, dirt),
  new Tile(false, 3360, 640, 640, 240, dirt),
  new Tile(true, 4000, 480, 80, 480, dirt),
  new Tile(true, 4080, 480, 400, 80, dirt),
  new Tile(true, 4080, 800, 80, 80, dirt),
  // well
  new Tile(false, 2880, 480, 80, 400, brickWall),
  new Tile(true, 2800, 560, 80, 320, brick),
  new Tile(true, 2960, 560, 80, 320, brick),
  new Tile(2, 2880, 880, 80, 40, plank),
  new Tile(false, 2800, 880, 80, 240, beam),
  new Tile(false, 2960, 880, 80, 240, beam),
  new Tile(2, 2800, 1120, 240, 40, plank),
  // house
  new Tile(false, 240, 640, 800, 320, brickWall),
  new Tile(true, 160, 560, 880, 80, brick),
  new Tile(true, 160, 640, 80, 400, brick),
  new Tile(true, 960, 800, 80, 240, brick),
  new Tile(true, 240, 960, 720, 40, plank),
  // tower
  new Tile(false, 3760, 1040, 480, 240, brickWall),
  new Tile(false, 4240, 1040, 960, 960, brickWall),
  new Tile(false, 4720, 960, 80, 80, brickWall),
  new Tile(false, 4320, 2000, 80, 80, brickWall),
  new Tile(false, 4480, 2000, 80, 80, brickWall),
  new Tile(false, 4640, 2000, 160, 80, brickWall),
  new Tile(false, 4880, 2000, 80, 80, brickWall),
  new Tile(false, 5040, 2000, 80, 80, brickWall),
  new Tile(false, 4880, 2000, 80, 80, brickWall),
  new Tile(false, 5040, 2000, 80, 80, brickWall),
  new Tile(true, 3520, 960, 1200, 80, brick),
  new Tile(true, 4800, 960, 400, 80, brick),
  new Tile(2, 4720, 880, 80, 40, plank),
  new Tile(2, 4720, 960, 80, 40, plank),
  new Tile(2, 4720, 1040, 80, 40, plank),
  new Tile(true, 3760, 1200, 80, 160, brick),
  new Tile(true, 4160, 1200, 80, 880, brick),
  new Tile(true, 5200, 960, 80, 1120, brick),
  new Tile(true, 3840, 1280, 320, 80, brick),
  new Tile(true, 4240, 1840, 800, 80, brick),
  new Tile(false, 5040, 1040, 160, 840, beam),
  new Tile(2, 5040, 1040, 160, 40, plank),
  new Tile(2, 5040, 1120, 160, 40, plank),
  new Tile(2, 5040, 1200, 160, 40, plank),
  new Tile(2, 5040, 1280, 160, 40, plank),
  new Tile(2, 4240, 1360, 960, 40, plank),
  new Tile(2, 5040, 1440, 160, 40, plank),
  new Tile(2, 5040, 1520, 160, 40, plank),
  new Tile(2, 5040, 1600, 160, 40, plank),
  new Tile(2, 5040, 1680, 160, 40, plank),
  new Tile(2, 5040, 1760, 160, 40, plank),
  new Tile(2, 5040, 1840, 160, 40, plank),
  new Tile(2, 5040, 1920, 160, 40, plank),
  new Tile(false, 4560, 1520, 80, 80, painting)
]

export const tileEntityList = [
  new Door(960, 640, door, true),
  new Door(4160, 1040, door, true),
  new Door(3760, 1040, door)
]
