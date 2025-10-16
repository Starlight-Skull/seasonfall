import Entity from '../Entity'
import SpriteSet from '../SpiteSet'

export default class Skeleton extends Entity {
  constructor (x: number, y: number) {
    const skeleton = 'skeleton'
    super (x, y, skeleton, { maxHP: 55, xp: 1, damage: 10, speed: 0.08, height: 1.95, width: 0.8 })

    this.animations.idle = new SpriteSet(skeleton, { name: 'idle', y: 32, w: 16, h: 32 })
    this.animations.move = new SpriteSet(skeleton, { name: 'move', y: 32, w: 16, h: 32, frames: 4, speed: 0.4 })
    this.animations.attack = new SpriteSet(skeleton, { name: 'attack', w: 16, h: 32, frames: 2, speed: 0.1, loop: false })
    this.animations.jump = new SpriteSet(skeleton, { name: 'jump', x: 16, y: 32, w: 16, h: 32 })
    this.animations.death = new SpriteSet(skeleton, { name: 'death', x: 32, w: 16, h: 32, frames: 2, speed: 0.1, loop: false })

    this.animation = this.animations.idle
  }
}
