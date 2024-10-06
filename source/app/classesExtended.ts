import { SpriteSet, Entity, Tile, Collision } from './classes'

export class Hero extends Entity {
  heroName: string
  constructor (name = 'Player', x = 0, y = 0) {
    const hero = 'hero'
    super(x, y, hero, { maxHP: 100, maxMP: 50, speed: 0.1, damage: 15, height: 1.95, width: 0.75 })
    this.heroName = name
    this.animations.idle = new SpriteSet(hero, { animName: 'idle', y: 32, w: 16, h: 32 })
    this.animations.move = new SpriteSet(hero, { animName: 'move', y: 32, w: 16, h: 32, frames: 6, speed: 0.3 })
    this.animations.attack = new SpriteSet(hero, { animName: 'attack', w: 19, h: 32, frames: 4, speed: 0.3, hitboxWidth: 1.25 })
    this.animations.jump = new SpriteSet(hero, { animName: 'jump', x: 80, y: 32, w: 16, h: 32 })
    this.animations.death = new SpriteSet('skeleton', { animName: 'death', y: 32, w: 16, h: 32 })
    this.animation = this.animations.idle
  }
}

export class Skeleton extends Entity {
  constructor (x: number, y: number) {
    const skeleton = 'skeleton'
    super(x, y, skeleton, { maxHP: 55, maxMP: 25, xp: 1, damage: 10, speed: 0.08, height: 1.95, width: 0.8 })
    this.animations.idle = new SpriteSet(skeleton, { animName: 'idle', y: 32, w: 16, h: 32 })
    this.animations.move = new SpriteSet(skeleton, { animName: 'move', y: 32, w: 16, h: 32, frames: 4, speed: 0.4 })
    this.animations.attack = new SpriteSet(skeleton, { animName: 'attack', w: 16, h: 32, frames: 2, speed: 0.1, hitboxWidth: 1.30 })
    this.animations.jump = new SpriteSet(skeleton, { animName: 'jump', x: 16, y: 32, w: 16, h: 32 })
    this.animations.death = new SpriteSet(skeleton, { animName: 'death', x: 32, w: 16, h: 32, frames: 2, speed: 0.1 })
    this.animation = this.animations.idle
  }
}

export class Door extends Tile {
  isClosed: boolean

  constructor (isClosed = true, options?: { mirrored?: boolean }) {
    const door = 'door'
    super(door, { height: 2, ...options })
    this.animations = {
      closed: new SpriteSet(door, { animName: 'closed', w: 16, h: 32, hitboxWidth: 0.25 }),
      open: new SpriteSet(door, { animName: 'open', x: 16, w: 16, h: 32 })
    }
    this.activator = true
    this.isClosed = !isClosed
    this.activate()
  }

  activate(): void {
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
