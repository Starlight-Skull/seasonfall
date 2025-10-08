import { PIXELS_PER_TILE } from '../globals/game'
import { $textures, loadImage } from '../data/textures'

interface Options {
  name?: string
  x?: number
  y?: number
  w?: number
  h?: number
  frames?: number
  speed?: number
  hitboxW?: number
  hitboxH?: number
  offsetX?: number
  offsetY?: number
}

export default class SpriteSet {
  name: string
  imagePath: string
  x: number
  y: number
  imageW: number
  imageH: number
  frames: number
  speed: number
  hitboxW?: number
  hitboxH?: number
  offsetX: number
  offsetY: number

  get image(): HTMLImageElement {
    return loadImage(this.imagePath)
  }

  constructor(imageName: string, options?: Options) {
    const {
      name = 'default',
      x = 0,
      y = 0,
      w = PIXELS_PER_TILE,
      h = PIXELS_PER_TILE,
      frames = 1,
      speed = 0,
      hitboxW,
      hitboxH,
      offsetX = 0,
      offsetY = 0
    } = options ?? {}
    this.x = x
    this.y = y
    this.imagePath = $textures[imageName]
    this.imageW = w
    this.imageH = h
    this.frames = frames
    this.speed = speed
    this.hitboxW = hitboxW
    this.hitboxH = hitboxH
    this.offsetX = offsetX
    this.offsetY = offsetY
    this.name = name
  }
}
