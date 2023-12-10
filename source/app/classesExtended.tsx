import { SpriteSet, Entity, TileEntity } from './classes'
import { settings } from './globals'
import { loadImage, textures } from './textures'

// entities
const hero = loadImage(textures.entity.hero)
const skeleton = loadImage(textures.entity.skeleton)
// environment
const rain = loadImage(textures.environment.rain)
const snow = loadImage(textures.environment.snow)

export class Hero extends Entity {
  name: string

  constructor (x: number, y: number, name: string) {
    super(true, -1, 10, 15, 100, 50, 12, 0, x, y, 60, 155)
    this.name = name
    this.attackWidth = 95
    this.idle = new SpriteSet(hero, 0, 32, 16, 32, 1, 1)
    this.move = new SpriteSet(hero, 0, 32, 16, 32, 6, 0.3)
    this.attack = new SpriteSet(hero, 0, 0, 19, 32, 4, 0.3)
    this.jump = new SpriteSet(hero, 80, 32, 16, 32, 1, 1)
    this.fall = new SpriteSet(hero, 48, 32, 16, 32, 1, 1)
    this.death = new SpriteSet(skeleton, 0, 32, 16, 32, 1, 1)
  }
}

export class Skeleton extends Entity {
  constructor (cooldown: number, x: number, y: number) {
    super(true, cooldown, 7, 10, 55, 25, 8, 1, x, y, 65, 155)
    this.attackWidth = 100
    this.idle = new SpriteSet(skeleton, 0, 32, 16, 32, 1, 1)
    this.move = new SpriteSet(skeleton, 0, 32, 16, 32, 4, 0.4)
    this.attack = new SpriteSet(skeleton, 0, 0, 16, 32, 2, 0.1)
    this.jump = new SpriteSet(skeleton, 16, 32, 16, 32, 1, 1)
    this.fall = new SpriteSet(skeleton, 48, 32, 16, 32, 1, 1)
    this.death = new SpriteSet(skeleton, 32, 0, 16, 32, 2, 0.1)
  }
}

export class Door extends TileEntity {
  closedWidth: number
  closed: SpriteSet
  openWidth: number
  open: SpriteSet

  constructor (x: number, y: number, sprite: HTMLImageElement, mirrored = false) {
    super(true, x, y, 20, 160, sprite, mirrored)
    this.closedWidth = 20
    this.closed = new SpriteSet(this.sprite, 0, 0, 16, 32, 1, 1)
    this.openWidth = 80
    this.open = new SpriteSet(this.sprite, 16, 0, 16, 32, 1, 1)
    this.animation = this.closed
    if (mirrored) {
      this.frame.x += this.animation.width * settings?.scale - this.frame.width
    }
    this.activate = function () {
      if (this.frame.width === this.closedWidth) {
        if (mirrored) {
          this.frame.x -= (this.openWidth - this.closedWidth)
        }
        this.hasCollision = false
        this.frame.width = this.openWidth
        this.animation = this.open
      } else {
        if (mirrored) {
          this.frame.x += (this.openWidth - this.closedWidth)
        }
        this.hasCollision = true
        this.frame.width = this.closedWidth
        this.animation = this.closed
      }
    }
  }
}

export class Rain extends TileEntity {
  rain: SpriteSet
  isSnow: boolean

  constructor (x: number, y: number, width: number, height: number, mirrored = false) {
    super(false, x, y, width, height, rain, mirrored)
    this.rain = new SpriteSet(this.sprite, 0, 0, 16, 16, 16, 0.5)
    this.animation = this.rain
    this.isSnow = false
    this.activate = function () {
      if (this.isSnow) {
        this.animation.image = snow
      } else {
        this.animation.image = rain
      }
      if (this.frame.currentFrame < this.animation.frames - 1) {
        this.frame.currentFrame += this.animation.speed
      } else {
        this.frame.currentFrame = 0
      }
    }
  }
}
