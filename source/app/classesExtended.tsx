import { SpriteSet, Entity, Tile, Collision, type TileOptions } from './classes'
import { loadImage, textures } from './textures'

// entities
const hero = loadImage(textures.entity.hero)
const skeleton = loadImage(textures.entity.skeleton)
// environment
const rain = loadImage(textures.environment.rain)
const snow = loadImage(textures.environment.snow)
const door = loadImage(textures.tileEntity.door)

export class NewHero extends Entity {
  name: string
  constructor (name = 'Player') {
    super(0, 0, hero, { maxHP: 100, maxMP: 50, speed: 0.1, damage: 15, height: 1.95, width: 0.75 })
    this.name = name
    this.animations.idle = new SpriteSet(hero, 0, 32, 16, 32, 1, 1)
    this.animations.move = new SpriteSet(hero, 0, 32, 16, 32, 6, 0.3)
    this.animations.attack = new SpriteSet(hero, 0, 0, 19, 32, 4, 0.3, 1.25)
    this.animations.jump = new SpriteSet(hero, 80, 32, 16, 32, 1, 1)
    this.animations.fall = new SpriteSet(hero, 48, 32, 16, 32, 1, 1)
    this.animations.death = new SpriteSet(skeleton, 0, 32, 16, 32, 1, 1)
    this.animation = this.animations.idle
  }
}

export class NewSkeleton extends Entity {
  constructor (x: number, y: number) {
    super(x, y, skeleton, { maxHP: 55, maxMP: 25, xp: 1, damage: 10, speed: 0.08, height: 1.95, width: 0.8 })
    this.animations.idle = new SpriteSet(skeleton, 0, 32, 16, 32, 1, 1)
    this.animations.move = new SpriteSet(skeleton, 0, 32, 16, 32, 4, 0.4)
    this.animations.attack = new SpriteSet(skeleton, 0, 0, 16, 32, 2, 0.1, 1.30)
    this.animations.jump = new SpriteSet(skeleton, 16, 32, 16, 32, 1, 1)
    this.animations.fall = new SpriteSet(skeleton, 48, 32, 16, 32, 1, 1)
    this.animations.death = new SpriteSet(skeleton, 32, 0, 16, 32, 2, 0.1)
    this.animation = this.animations.idle
  }
}

export class Door extends Tile {
  isClosed: boolean

  constructor (isClosed = true, options?: TileOptions) {
    super(door, { height: 2, ...options })
    this.isClosed = isClosed
    this.animations = {
      closed: new SpriteSet(door, 0, 0, 16, 32, 1, 1, 0.25),
      open: new SpriteSet(door, 16, 0, 16, 32, 1, 1)
    }
    this.animation = isClosed ? this.animations.closed : this.animations.open
    this.activator = true
    this.activate = function () {
      if (this.isClosed) {
        this.isClosed = false
        this.animation = this.animations.open
        this.collision = Collision.none
      } else {
        this.isClosed = true
        this.animation = this.animations.closed
        this.collision = Collision.all
      }
    }
  }
}

// export class Rain extends TileEntity {
//   rain: SpriteSet
//   isSnow: boolean

//   constructor (x: number, y: number, width: number, height: number, mirrored = false) {
//     super(false, x, y, width, height, rain, mirrored)
//     this.rain = new SpriteSet(this.sprite, 0, 0, 16, 16, 16, 0.5)
//     this.animation = this.rain
//     this.isSnow = false
//     this.activate = function () {
//       if (this.isSnow) {
//         this.animation.image = snow
//       } else {
//         this.animation.image = rain
//       }
//       if (this.frame.currentFrame < this.animation.frames - 1) {
//         this.frame.currentFrame += this.animation.speed
//       } else {
//         this.frame.currentFrame = 0
//       }
//     }
//   }
// }
