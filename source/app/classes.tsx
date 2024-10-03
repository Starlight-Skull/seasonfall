import { loadImage, textures } from './textures'

const missingEntity = loadImage(textures.entity.missing_entity)
const missingTile = loadImage(textures.tile.missing_tile)

/**
 * @enum values all, top, none
 */
export enum Collision { all, top, none }

export class Animatable {
  boxWidth: number
  boxHeight: number
  mirrored: boolean
  animationFrame: number
  animation: SpriteSet
  animations: Record<string, SpriteSet>

  constructor (sprite: HTMLImageElement, { width = 1, height = 1, mirrored = false } = {}) {
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

interface EntityOptions {
  maxHP?: number
  maxMP?: number
  xp?: number
  damage?: number
  speed?: number
  mirrored?: boolean
  width?: number
  height?: number
  jumpHeight?: number
}

export class Entity extends Animatable {
  x: number
  y: number
  cooldown: number
  stats: { hp: number, maxHP: number, mp: number, maxMP: number, xp: number, damage: number, speed: number, jumpHeight: number, jumpTime: number }
  movement: { attack: boolean, down: boolean, left: boolean, right: boolean, jump: boolean, use: boolean }
  collision: { enabled: boolean, up: boolean, down: boolean, left: boolean, right: boolean }
  animations: { idle: SpriteSet, move: SpriteSet, attack: SpriteSet, jump: SpriteSet, fall: SpriteSet, death: SpriteSet }

  constructor (x = 0, y = 0, sprite: HTMLImageElement, { maxHP = 50, maxMP = 0, xp = 0, damage = 10, speed = 0.1, jumpHeight = 3, width, height, mirrored }: EntityOptions = {}) {
    super(sprite, { width, height, mirrored })
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

export interface TileOptions {
  width?: number
  height?: number
  collision?: Collision
  mirrored?: boolean
  rotation?: number
}

export class Tile extends Animatable {
  collision: Collision
  rotation: number
  activator: boolean

  constructor (sprite: HTMLImageElement, { collision = Collision.all, rotation = 0, width, height, mirrored }: TileOptions = {}) {
    super(sprite, { width, height, mirrored })
    this.collision = collision
    this.rotation = rotation
    this.activator = false
  }

  activate (): void {}
}

export class SpriteSet {
  image: HTMLImageElement
  x: number
  y: number
  width: number
  height: number
  frames: number
  speed: number
  boxWidth?: number
  boxHeight?: number

  /**
   * Data class containing information for a single or set of sprites.
   * @param image - The image to draw from.
   * @param x - (optional) X offset on the image. Defaults to 0.
   * @param y - (optional) Y offset on the image. Defaults to 0.
   * @param width - (optional) Width cutoff. Defaults to the width of the image.
   * @param height - (optional) Height cutoff. Defaults to the height of the image.
   * @param frames - (optional) How many frames to take from the image. Defaults to 1.
   * @param speed - (optional) Animation speed. Defaults to 0.
   * @param boxWidth - (optional) Collision box width.
   * @param boxHeight - (optional) Collision box height.
   */
  constructor (image: HTMLImageElement, x = 0, y = 0, width = image.width, height = image.height, frames = 1, speed = 0, boxWidth?: number, boxHeight?: number) {
    this.image = image
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.frames = frames
    this.speed = speed
    this.boxWidth = boxWidth
    this.boxHeight = boxHeight
  }
}
