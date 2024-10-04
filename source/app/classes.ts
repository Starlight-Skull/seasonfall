import { isNotEmpty } from './helpers'

/**
 * @enum values all, top, none
 */
export enum Collision { all, top, partial, none }

export class Animatable {
  name: string
  boxWidth: number
  boxHeight: number
  mirrored: boolean
  animationFrame: number
  animation: SpriteSet
  animations: Record<string, SpriteSet>

  constructor (sprite: HTMLImageElement, options?: { width?: number, height?: number, mirrored?: boolean, name?: string }) {
    const { width = 1, height = 1, mirrored = false, name } = options ?? {}
    this.name = this.constructor.name + (isNotEmpty(name) ? `:${name}` : '')
    this.boxWidth = width
    this.boxHeight = height
    this.mirrored = mirrored
    this.animationFrame = 0
    this.animation = new SpriteSet(sprite)
    this.animations = {}
  }

  get width (): number { return this.animation.boxWidth ?? this.boxWidth }
  get height (): number { return this.animation.boxHeight ?? this.boxHeight }
}

export class Entity extends Animatable {
  x: number
  y: number
  cooldown: number
  stats: { hp: number, maxHP: number, mp: number, maxMP: number, xp: number, damage: number, speed: number, jumpHeight: number, jumpTime: number }
  movement: { attack: boolean, down: boolean, left: boolean, right: boolean, jump: boolean, use: boolean }
  collision: { enabled: boolean, up: boolean, down: boolean, left: boolean, right: boolean }

  constructor (x: number, y: number, sprite: HTMLImageElement, options?: { maxHP?: number, maxMP?: number, xp?: number, damage?: number, speed?: number, jumpHeight?: number, width?: number, height?: number, mirrored?: boolean, name?: string }) {
    const { maxHP = 50, maxMP = 0, xp = 0, damage = 10, speed = 0.1, jumpHeight = 3, width, height, mirrored, name } = options ?? {}
    super(sprite, { width, height, mirrored, name })
    this.x = x
    this.y = y
    this.cooldown = -1
    this.stats = {
      hp: maxHP,
      maxHP,
      mp: maxMP,
      maxMP,
      xp,
      damage,
      speed,
      jumpHeight,
      jumpTime: 0
    }
    this.movement = {
      attack: false,
      down: false,
      left: false,
      right: false,
      jump: false,
      use: false
    }
    this.collision = {
      enabled: true,
      up: false,
      down: true,
      left: false,
      right: false
    }
    this.animations = {
      idle: new SpriteSet(sprite),
      move: new SpriteSet(sprite),
      attack: new SpriteSet(sprite),
      jump: new SpriteSet(sprite),
      fall: new SpriteSet(sprite),
      death: new SpriteSet(sprite)
    }
  }
}

export class Tile extends Animatable {
  collision: Collision
  rotation: number
  activator: boolean

  constructor (sprite: HTMLImageElement, options?: { collision?: Collision, rotation?: number, width?: number, height?: number, mirrored?: boolean, name?: string }) {
    const { collision = Collision.all, rotation = 0, width, height, mirrored, name } = options ?? {}
    super(sprite, { width, height, mirrored, name })
    this.collision = collision
    this.rotation = rotation
    this.activator = false
  }

  activate (): void {}
}

export class SpriteSet {
  name: string
  image: HTMLImageElement
  x: number
  y: number
  width: number
  height: number
  frames: number
  speed: number
  boxWidth?: number
  boxHeight?: number
  offsetX: number
  offsetY: number

  constructor (image: HTMLImageElement, options?: { x?: number, y?: number, w?: number, h?: number, frames?: number, speed?: number, boxWidth?: number, boxHeight?: number, name?: string, offsetX?: number, offsetY?: number }) {
    const { x = 0, y = 0, w = image.width, h = image.height, frames = 1, speed = 0, boxWidth, boxHeight, name = this.constructor.name, offsetX = 0, offsetY = 0 } = options ?? {}
    this.image = image
    this.x = x
    this.y = y
    this.width = w
    this.height = h
    this.frames = frames
    this.speed = speed
    this.boxWidth = boxWidth
    this.boxHeight = boxHeight
    this.offsetX = offsetX
    this.offsetY = offsetY
    this.name = name
  }
}
