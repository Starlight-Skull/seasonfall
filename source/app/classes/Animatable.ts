import SpriteSet from './SpiteSet'

interface Options {
  width?: number
  height?: number
  mirrored?: boolean
}

export default class Animatable {
  name: string
  defaultWidth: number
  defaultHeight: number
  mirrored: boolean
  animationFrame: number
  animation: SpriteSet
  animations: Record<string, SpriteSet>

  get width (): number { return this.animation.hitboxW ?? this.defaultWidth }
  get height (): number { return this.animation.hitboxH ?? this.defaultHeight }

  constructor (name?: string, options?: Options) {
    const { width = 1, height = 1, mirrored = false } = options ?? {}
    this.name = name ?? 'Animatable'
    this.defaultWidth = width
    this.defaultHeight = height
    this.mirrored = mirrored
    this.animationFrame = 0
    this.animation = new SpriteSet(this.name)
    this.animations = {}
  }

  nextFrame() {
    if (this.animation.frames <= 1) return
    if (this.animationFrame < this.animation.frames - 1) {
      this.animationFrame += this.animation.speed
    } else if (this.animation.loop) {
      this.animationFrame = 0
    }
  }

  changeAnimation(animation?: SpriteSet) {
    if (this.animation !== animation && animation !== undefined) {
      this.animationFrame = 0
      this.animation = animation
    }
  }

  animToString(): string {
    return `${this.name}::${this.animation.name} - [${Math.round(this.animationFrame * 100) / 100 + 1}/${this.animation.frames}]`
  }
}
