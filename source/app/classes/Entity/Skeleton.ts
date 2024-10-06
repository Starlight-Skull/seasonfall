import { Entity } from '../Entity'
import { SpriteSet } from '../SpiteSet'


export class Skeleton extends Entity {
  constructor (x: number, y: number) {
    const skeleton = 'skeleton'
    super (x, y, 'skeleton', { maxHP: 55, maxMP: 25, xp: 1, damage: 10, speed: 0.08, height: 1.95, width: 0.8 })
    this.animations.idle = new SpriteSet(skeleton, { animName: 'idle', y: 32, w: 16, h: 32 })
    this.animations.move = new SpriteSet(skeleton, { animName: 'move', y: 32, w: 16, h: 32, frames: 4, speed: 0.4 })
    this.animations.attack = new SpriteSet(skeleton, { animName: 'attack', w: 16, h: 32, frames: 2, speed: 0.1, hitboxWidth: 1.30 })
    this.animations.jump = new SpriteSet(skeleton, { animName: 'jump', x: 16, y: 32, w: 16, h: 32 })
    this.animations.death = new SpriteSet(skeleton, { animName: 'death', x: 32, w: 16, h: 32, frames: 2, speed: 0.1 })
    this.animation = this.animations.idle
  }
}
