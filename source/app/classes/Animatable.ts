import { SpriteSet } from './SpiteSet'


export class Animatable {
  name: string
  defaultWidth: number
  defaultHeight: number
  mirrored: boolean
  animationFrame: number
  animation: SpriteSet
  animations: Record<string, SpriteSet>

  get width (): number { return this.animation.hitboxWidth ?? this.defaultWidth }
  get height (): number { return this.animation.hitboxHeight ?? this.defaultHeight }

  constructor (name: string, options?: { width?: number, height?: number, mirrored?: boolean, animWidth?: number, animHeight?: number }) {
    const { width = 1, height = 1, mirrored = false } = options ?? {}
    this.name = name
    this.defaultWidth = width
    this.defaultHeight = height
    this.mirrored = mirrored
    this.animationFrame = 0
    this.animation = new SpriteSet(name)
    this.animations = {}
  }

  nextFrame(loop: boolean) {
    if (this.animationFrame < this.animation.frames - 1) {
      this.animationFrame += this.animation.speed
    } else if (loop) {
      this.animationFrame = 0
    }
  }

  changeAnimation(animation: SpriteSet) {
    if (this.animation !== animation) {
      this.animationFrame = 0
      this.animation = animation
    }
  }
}
