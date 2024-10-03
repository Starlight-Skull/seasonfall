import { SpriteSet, Entity, Tile, Collision } from './classes'
import { loadImage, textures } from './textures'

// entities
const hero = loadImage(textures.entity.hero)
const skeleton = loadImage(textures.entity.skeleton)
// environment
const door = loadImage(textures.tileEntity.door)

export class Hero extends Entity {
  heroName: string
  constructor (name = 'Player', x = 0, y = 0) {
    super(x, y, hero, { name, maxHP: 100, maxMP: 50, speed: 0.1, damage: 15, height: 1.95, width: 0.75 })
    this.heroName = name
    this.animations.idle = new SpriteSet(hero, { name: 'idle', y: 32, w: 16, h: 32 })
    this.animations.move = new SpriteSet(hero, { name: 'move', y: 32, w: 16, h: 32, frames: 6, speed: 0.3 })
    this.animations.attack = new SpriteSet(hero, { name: 'attack', w: 19, h: 32, frames: 4, speed: 0.3, boxWidth: 1.25 })
    this.animations.jump = new SpriteSet(hero, { name: 'jump', x: 80, y: 32, w: 16, h: 32 })
    this.animations.death = new SpriteSet(skeleton, { name: 'death', y: 32, w: 16, h: 32 })
    this.animation = this.animations.idle
  }
}

export class Skeleton extends Entity {
  constructor (x: number, y: number) {
    super(x, y, skeleton, { maxHP: 55, maxMP: 25, xp: 1, damage: 10, speed: 0.08, height: 1.95, width: 0.8 })
    this.animations.idle = new SpriteSet(skeleton, { name: 'idle', y: 32, w: 16, h: 32 })
    this.animations.move = new SpriteSet(skeleton, { name: 'move', y: 32, w: 16, h: 32, frames: 4, speed: 0.4 })
    this.animations.attack = new SpriteSet(skeleton, { name: 'attack', w: 16, h: 32, frames: 2, speed: 0.1, boxWidth: 1.30 })
    this.animations.jump = new SpriteSet(skeleton, { name: 'jump', x: 16, y: 32, w: 16, h: 32 })
    this.animations.death = new SpriteSet(skeleton, { name: 'death', x: 32, w: 16, h: 32, frames: 2, speed: 0.1 })
    this.animation = this.animations.idle
  }
}

export class Door extends Tile {
  isClosed: boolean

  constructor (isClosed = true, options?: { collision?: Collision, rotation?: number, mirrored?: boolean }) {
    super(door, { height: 2, ...options })
    this.isClosed = isClosed
    this.animations = {
      closed: new SpriteSet(door, { name: 'closed', w: 16, h: 32, boxWidth: 0.25 }),
      open: new SpriteSet(door, { name: 'open', x: 16, w: 16, h: 32 })
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
