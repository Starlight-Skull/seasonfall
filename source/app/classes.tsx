import { world } from './globals'
import { loadImage, textures } from './textures'

const missingEntity = loadImage(textures.entity.missing_entity)
const missingTile = loadImage(textures.tile.missing_tile)

export class Entity {
  cooldown: number
  missing: Animation
  frame: { x: number, y: number, width: number, height: number, currentFrame: number, mirrored: boolean }
  defaultWidth: number
  attackWidth: number
  animation: Animation
  idle: Animation
  move: Animation
  attack: Animation
  jump: Animation
  fall: Animation
  death: Animation
  stats: { damage: number, invulnerable: number, hp: number, maxHP: number, mp: number, maxMP: number, xp: number, speed: number }
  air: number
  maxAir: number
  controls: { attack: boolean | number, down: boolean, left: boolean, right: boolean, jump: boolean, use: boolean | number }
  collision: { up: boolean, down: boolean, left: boolean, right: boolean }
  hasCollision: boolean | number

  constructor (hasCollision: boolean, cooldown = -1, speed = 10, damage = 0, maxHP = 100, maxMP = 0, maxAir = 15, xp = 0, x = 0, y = 0, width = 160, height = 160) {
    this.cooldown = cooldown
    this.missing = new Animation(missingEntity, 0, 0, 32, 32, 1, 1, 'missing')
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
  jumpHeight?: number
}

export class NewEntity {
  x: number
  y: number
  width: number
  height: number
  mirrored: boolean
  stats: { hp: number, maxHP: number, mp: number, maxMP: number, xp: number, damage: number, speed: number, jumpHeight: number }
  movement: { attack: boolean, down: boolean, left: boolean, right: boolean, jump: boolean, use: boolean }
  collision: { enabled: boolean, up: boolean, down: boolean, left: boolean, right: boolean }
  animation: SpriteSet
  animations: { idle: SpriteSet, move: SpriteSet, attack: SpriteSet, jump: SpriteSet, fall: SpriteSet, death: SpriteSet }

  constructor (x = 0, y = 0, sprite: HTMLImageElement, { maxHP = 100, maxMP = 100, xp = 0, damage = 10, speed = 1, mirrored = false, jumpHeight = 3 }: EntityOptions = {}) {
    this.x = x
    this.y = y
    this.width = sprite?.width ?? world.grid
    this.height = sprite?.height ?? world.grid
    this.mirrored = mirrored
    this.stats = {
      hp: maxHP,
      maxHP,
      mp: maxMP,
      maxMP,
      xp,
      damage,
      speed,
      jumpHeight
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
}

export class Tile {
  hasCollision: boolean | number
  frame: { x: number, y: number, width: number, height: number, currentFrame: number, mirrored: boolean }
  sprite: HTMLImageElement
  animation: Animation

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
    this.animation = new Animation(sprite, 0, 0, 16, 16, 1, 1, 'default')
  }
}

interface NewTileOptions {
  width?: number
  height?: number
  collision?: Collision
  mirrored?: boolean
  rotation?: number
}

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
    this.animation = new Animation(this.sprite, 0, 0, 16, 16, 1, 1, 'default')
  }

  activate (): void {}
}

export class Animation {
  sprite: HTMLImageElement
  x: number
  y: number
  frames: number
  width: number
  height: number
  speed: number
  name: string

  constructor (sprite: HTMLImageElement, x: number, y: number, width: number, height: number, frames: number, speed: number, name: string) {
    this.sprite = sprite
    this.x = x
    this.y = y
    this.frames = frames
    this.width = width
    this.height = height
    this.speed = speed
    this.name = name
  }
}

interface SpriteSetOptions {
  x?: number
  y?: number
  width?: number
  height?: number
  frames?: number
  speed?: number
}

export class SpriteSet {
  image: HTMLImageElement
  x: number
  y: number
  width: number
  height: number
  frames: number
  speed: number

  constructor (image: HTMLImageElement, { x = 0, y = 0, width = image?.width ?? missingTile.width, height = image?.height ?? missingTile.height, frames = 1, speed = 0 }: SpriteSetOptions = {}) {
    this.image = image ?? missingTile
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.frames = frames
    this.speed = speed
  }
}
