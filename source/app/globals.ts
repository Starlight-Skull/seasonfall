import { type Entity } from './classes/Entity'
import { type Tile } from './classes/Tile'
import { Hero } from './classes/Entity/Hero'

export const version = '1.2.0'

interface Settings {
  [key: string]: string | number | boolean | object
  scale: number
  showFPS: boolean
  api: {
    enabled: boolean
    key: string
    latitude: number
    longitude: number
    interval: number
  }
  keybindings: {
    [key: string]: string
    attack: string
    jump: string
    down: string
    left: string
    right: string
    use: string
  }
}

export const settings: Settings = {
  scale: 5,
  showFPS: false,
  api: {
    enabled: false,
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

export const PIXELS_PER_TILE = 16

export const world = {
  fps: 0,
  frames: 0,
  focusX: 0,
  focusY: 0,
  shade: 0,
  paused: false,
  showBoxes: false,
  showLiveDebug: false,
  showPlayerStats: false,
  debug: '',
  get grid () {
    // !!! scale must be a positive number or everything breaks => (x / 0 == Infinity) !!!
    if (settings.scale === null || settings.scale === undefined || settings.scale <= 0 || typeof settings.scale !== 'number') settings.scale = 5
    return settings.scale * PIXELS_PER_TILE
  }
}

/**
 * Enum for fonts. Names are defined in css.
 * @readonly
 * @enum {string}
 */
export const fonts = Object.freeze({
  Pixeloid: 'Pixeloid, sans-serif',
  PixeloidMono: 'PixeloidMono, monospace',
  PixeloidBold: 'PixeloidBold, serif'
})

export const UI = {
  fontSize: 25,
  fontStyle: fonts.Pixeloid,
  get font () { return `${this.fontSize}px ${this.fontStyle}` },
  getFont (options?: {size?: number, style?: string}) { return `${options?.size ?? this.fontSize}px ${options?.style ?? this.fontStyle}` }
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

export const player = new Hero()

export const level = {
  properties: {
    rootX: 0,
    rootY: 0,
    borderX: 0,
    borderY: 0,
    borderW: 1,
    borderH: 1
  },
  foreground: new Array<Array<Tile | undefined>>(),
  background: new Array<Array<Tile | undefined>>(),
  entities: new Array<Entity>()
}
