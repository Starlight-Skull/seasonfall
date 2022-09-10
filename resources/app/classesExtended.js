import { LoadImage, textures } from './textures.js'
import { world } from './globals.js'
import { Animation, Entity, TileEntity } from './classes.js'

// entities
const hero = LoadImage(textures.entity.hero)
const skeleton = LoadImage(textures.entity.skeleton)
// environment
const rain = LoadImage(textures.environment.rain)
const snow = LoadImage(textures.environment.snow)

export class Hero extends Entity {
  constructor (x, y, name) {
    super(true, -1, 10, 15, 100, 50, 12, 0, x, y, 60, 155)
    this.name = name
    this.attackWidth = 95
    this.idle = new Animation(hero, 0, 32, 16, 32, 1, 1, 'idle')
    this.move = new Animation(hero, 0, 32, 16, 32, 6, 0.3, 'move')
    this.attack = new Animation(hero, 0, 0, 19, 32, 4, 0.3, 'attack')
    this.jump = new Animation(hero, 80, 32, 16, 32, 1, 1, 'jump')
    this.fall = new Animation(hero, 48, 32, 16, 32, 1, 1, 'fall')
    this.death = new Animation(skeleton, 0, 32, 16, 32, 1, 1, 'idle')
  }
}

export class Skeleton extends Entity {
  constructor (cooldown, x, y) {
    super(true, cooldown, 7, 10, 55, 25, 8, 1, x, y, 65, 155)
    this.attackWidth = 100
    this.idle = new Animation(skeleton, 0, 32, 16, 32, 1, 1, 'idle')
    this.move = new Animation(skeleton, 0, 32, 16, 32, 4, 0.4, 'move')
    this.attack = new Animation(skeleton, 0, 0, 16, 32, 2, 0.1, 'attack')
    this.jump = new Animation(skeleton, 16, 32, 16, 32, 1, 1, 'jump')
    this.fall = new Animation(skeleton, 48, 32, 16, 32, 1, 1, 'fall')
    this.death = new Animation(skeleton, 32, 0, 16, 32, 2, 0.1, 'death')
  }
}

export class Door extends TileEntity {
  constructor (x, y, sprite, mirrored) {
    super(true, x, y, 20, 160, sprite, mirrored)
    this.closedWidth = 20
    this.closed = new Animation(this.sprite, 0, 0, 16, 32, 1, 1, 'closed')
    this.openWidth = 80
    this.open = new Animation(this.sprite, 16, 0, 16, 32, 1, 1, 'open')
    this.animation = this.closed
    if (mirrored) {
      this.frame.x += this.animation.width * world.scale - this.frame.width
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
  constructor (x, y, width, height, mirrored) {
    super(false, x, y, width, height, rain, mirrored)
    this.rain = new Animation(this.sprite, 0, 0, 16, 16, 16, 0.5, 'rain')
    this.animation = this.rain
    this.isSnow = false
    this.activate = function () {
      if (this.isSnow) {
        this.animation.sprite = snow
      } else {
        this.animation.sprite = rain
      }
      if (this.frame.currentFrame < this.animation.frames - 1) {
        this.frame.currentFrame += this.animation.speed
      } else {
        this.frame.currentFrame = 0
      }
    }
  }
}
