import { PIXELS_PER_TILE } from '../globals'
import { loadImage, textures } from '../rendering/textures'

/**
 * @enum values all, top, none
 */
export enum Collision { all, top, partial, none }

export class Animatable {
  name: string
  defaultWidth: number
  defaultHeight: number
  mirrored: boolean
  animationFrame: number
  animation: SpriteSet
  animations: Record<string, SpriteSet>

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
  get width (): number { return this.animation.hitboxWidth ?? this.defaultWidth }
  get height (): number { return this.animation.hitboxHeight ?? this.defaultHeight }
}

export class Entity extends Animatable {
  x: number
  y: number
  cooldown: number
  stats: { hp: number, maxHP: number, mp: number, maxMP: number, xp: number, damage: number, speed: number, jumpHeight: number, jumpTime: number }
  movement: { attack: boolean, down: boolean, left: boolean, right: boolean, jump: boolean, use: boolean }
  collision: { enabled: boolean, up: boolean, down: boolean, left: boolean, right: boolean }

  constructor (x: number, y: number, name = '', options?: { maxHP?: number, maxMP?: number, xp?: number, damage?: number, speed?: number, jumpHeight?: number, width?: number, height?: number, mirrored?: boolean }) {
    const { maxHP = 50, maxMP = 0, xp = 0, damage = 10, speed = 0.1, jumpHeight = 3, width, height, mirrored } = options ?? {}
    super(name, { width, height, mirrored })
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
      idle: new SpriteSet(textures.missing_entity),
      move: new SpriteSet(textures.missing_entity),
      attack: new SpriteSet(textures.missing_entity),
      jump: new SpriteSet(textures.missing_entity),
      death: new SpriteSet(textures.missing_entity)
    }
  }
}

export class Tile extends Animatable {
  collision: Collision
  rotation: number
  activator: boolean

  constructor (name: string, options?: { collision?: Collision, rotation?: number, width?: number, height?: number, mirrored?: boolean }) {
    const { collision = Collision.all, rotation = 0, width, height, mirrored } = options ?? {}
    super(name, { width, height, mirrored })
    this.collision = collision
    this.rotation = rotation
    this.activator = false
  }

  activate (): void {}
}

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

  get image (): HTMLImageElement {
    return loadImage(this.imagePath)
  }
}
