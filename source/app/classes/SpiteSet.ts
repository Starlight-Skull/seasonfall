import { PIXELS_PER_TILE } from '../globals'
import { textures, loadImage } from '../rendering/textures'


export class SpriteSet {
  name: string
  imagePath: string
  x: number
  y: number
  width: number
  height: number
  frames: number
  speed: number
  hitboxWidth?: number
  hitboxHeight?: number
  offsetX: number
  offsetY: number

  get image (): HTMLImageElement { return loadImage(this.imagePath) }

  constructor (imageName: string, options?: { animName?: string, x?: number, y?: number, w?: number, h?: number, frames?: number, speed?: number, hitboxWidth?: number, hitboxHeight?: number, offsetX?: number, offsetY?: number }) {
    const { animName = 'default', x = 0, y = 0, w = PIXELS_PER_TILE, h = PIXELS_PER_TILE, frames = 1, speed = 0, hitboxWidth, hitboxHeight, offsetX = 0, offsetY = 0 } = options ?? {}
    this.x = x
    this.y = y
    this.imagePath = textures[imageName]
    this.width = w
    this.height = h
    this.frames = frames
    this.speed = speed
    this.hitboxWidth = hitboxWidth
    this.hitboxHeight = hitboxHeight
    this.offsetX = offsetX
    this.offsetY = offsetY
    this.name = animName
  }
}
