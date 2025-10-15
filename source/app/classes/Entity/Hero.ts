import Entity from '../Entity'
import SpriteSet from '../SpiteSet'

export default class Hero extends Entity {
  userName: string

  constructor(userName = 'Player', x = 0, y = 0) {
    const hero = 'hero'
    super(x, y, hero, { maxHP: 100, maxMP: 50, speed: 0.1, damage: 15, height: 1.95, width: 0.75 })

    this.userName = userName

    this.animations.idle = new SpriteSet(hero, { name: 'idle', y: 32, w: 16, h: 32 })
    this.animations.move = new SpriteSet(hero, { name: 'move', y: 32, w: 16, h: 32, frames: 6, speed: 0.3 })
    this.animations.attack = new SpriteSet(hero, { name: 'attack', x: 19, w: 19, h: 32, frames: 3, speed: 0.3, hitboxW: 1.25, loop: false })
    this.animations.jump = new SpriteSet(hero, { name: 'jump', x: 80, y: 32, w: 16, h: 32 })
    this.animations.death = new SpriteSet('skeleton', { name: 'death', y: 32, w: 16, h: 32 })

    this.animation = this.animations.idle
  }
}
