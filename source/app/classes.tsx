import { loadImage, textures } from './textures'

const missingEntity = loadImage(textures.entity.missing_entity)
const missingTile = loadImage(textures.tile.missing_tile)

export class Entity {
  cooldown: number
  missing: SpriteSet
  frame: { x: number, y: number, width: number, height: number, currentFrame: number, mirrored: boolean }
  defaultWidth: number
  attackWidth: number
  animation: SpriteSet
  idle: SpriteSet
  move: SpriteSet
  attack: SpriteSet
  jump: SpriteSet
  fall: SpriteSet
  death: SpriteSet
  stats: { damage: number, invulnerable: number, hp: number, maxHP: number, mp: number, maxMP: number, xp: number, speed: number }
  air: number
  maxAir: number
  controls: { attack: boolean | number, down: boolean, left: boolean, right: boolean, jump: boolean, use: boolean | number }
  collision: { up: boolean, down: boolean, left: boolean, right: boolean }
  hasCollision: boolean

  constructor (hasCollision: boolean, cooldown = -1, speed = 10, damage = 0, maxHP = 100, maxMP = 0, maxAir = 15, xp = 0, x = 0, y = 0, width = 160, height = 160) {
    this.cooldown = cooldown
    this.missing = new SpriteSet(missingEntity, 0, 0, 32, 32, 1, 1)
    this.frame = {
      x,
      y,
      width,
      height,
      currentFrame: 0,
      mirrored: false
    }
    this.defaultWidth = width
    this.attackWidth = width
    this.animation = this.missing
    this.idle = this.missing
    this.move = this.missing
    this.attack = this.missing
    this.jump = this.missing
    this.fall = this.missing
    this.death = this.missing
    this.stats = {
      damage,
      invulnerable: 0,
      hp: maxHP,
      maxHP,
      mp: maxMP,
      maxMP,
      xp,
      speed
    }
    this.air = 0
    this.maxAir = maxAir
    this.controls = {
      attack: false,
      down: false,
      left: false,
      right: false,
      jump: false,
      use: false
    }
    this.collision = {
      up: false,
      down: false,
      left: false,
      right: false
    }
    this.hasCollision = hasCollision
  }
}

interface EntityOptions {
  maxHP?: number
  maxMP?: number
  xp?: number
  damage?: number
  speed?: number
  mirrored?: boolean
  boxWidth?: number
  boxHeight?: number
  jumpHeight?: number
}

export class NewEntity {
  x: number
  y: number
  cooldown: number
  mirrored: boolean
  stats: { hp: number, maxHP: number, mp: number, maxMP: number, xp: number, damage: number, speed: number, jumpHeight: number, jumpTime: number }
  movement: { attack: boolean, down: boolean, left: boolean, right: boolean, jump: boolean, use: boolean }
  collision: { enabled: boolean, up: boolean, down: boolean, left: boolean, right: boolean }
  animationFrame: number
  animation: SpriteSet
  animations: { idle: SpriteSet, move: SpriteSet, attack: SpriteSet, jump: SpriteSet, fall: SpriteSet, death: SpriteSet }
  boxWidth: number
  boxHeight: number

  constructor (x = 0, y = 0, sprite: HTMLImageElement, { maxHP = 50, maxMP = 0, xp = 0, damage = 10, speed = 0.1, mirrored = false, jumpHeight = 3, boxWidth = 1, boxHeight = 1 }: EntityOptions = {}) {
    this.x = x
    this.y = y
    this.cooldown = -1
    this.mirrored = mirrored
    this.boxWidth = boxWidth
    this.boxHeight = boxHeight
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
    this.animationFrame = 0
    this.animation = new SpriteSet(sprite)
    this.animations = {
      idle: new SpriteSet(sprite),
      move: new SpriteSet(sprite),
      attack: new SpriteSet(sprite),
      jump: new SpriteSet(sprite),
      fall: new SpriteSet(sprite),
      death: new SpriteSet(sprite)
    }
  }

  get width (): number { return this.animation.boxWidth ?? this.boxWidth }
  get height (): number { return this.animation.boxWidth ?? this.boxHeight }
}

export class Tile {
  hasCollision: boolean | number
  frame: { x: number, y: number, width: number, height: number, currentFrame: number, mirrored: boolean }
  sprite: HTMLImageElement
  animation: SpriteSet

  constructor (hasCollision: boolean | number, x: number, y: number, width = 80, height = 80, sprite = missingTile) {
    this.hasCollision = hasCollision // 2 = only top collision
    this.frame = {
      x,
      y,
      width,
      height,
      currentFrame: 0,
      mirrored: false
    }
    this.sprite = sprite
    this.animation = new SpriteSet(sprite, 0, 0, 16, 16, 1, 1)
  }
}

export interface NewTileOptions {
  width?: number
  height?: number
  collision?: Collision
  mirrored?: boolean
  rotation?: number
}

/**
 * @enum values all, top, none
 */
export enum Collision { all, top, none }

export class NewTile {
  width: number
  height: number
  collision: Collision
  mirrored: boolean
  rotation: number
  sprite: SpriteSet

  constructor (sprite: HTMLImageElement, { width = 1, height = 1, collision = Collision.all, mirrored = false, rotation = 0 }: NewTileOptions = {}) {
    this.width = width
    this.height = height
    this.collision = collision
    this.mirrored = mirrored
    this.rotation = rotation
    this.sprite = new SpriteSet(sprite)
  }

  activate (): void {}
}

export class TileEntity extends Tile {
  constructor (hasCollision: boolean | number, x: number, y: number, width?: number, height?: number, sprite?: HTMLImageElement, mirrored = false) {
    super(hasCollision, x, y, width, height, sprite)
    this.frame.mirrored = mirrored
    this.animation = new SpriteSet(this.sprite, 0, 0, 16, 16, 1, 1)
  }

  activate (): void {}
}

// todo overload?
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
