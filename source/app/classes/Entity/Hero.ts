import { Entity } from '../Entity'
import { SpriteSet } from '../SpiteSet'

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
