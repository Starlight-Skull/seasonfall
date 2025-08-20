import Animatable from './Animatable'

interface Options {
  maxHP?: number
  maxMP?: number
  xp?: number
  damage?: number
  speed?: number
  jumpHeight?: number
  width?: number
  height?: number
   mirrored?: boolean
}

export default class Entity extends Animatable {
  x: number
  y: number
  cooldown: number
  stats: {
    hp: number
    maxHP: number
    mp: number
    maxMP: number
    xp: number
    damage: number
    speed: number
    jumpHeight: number
    jumpTime: number
  }
  movement: {
    attack: boolean
    down: boolean
    left: boolean
    right: boolean
    jump: boolean
    use: boolean
  }
  collision: {
    enabled: boolean
    up: boolean
    down: boolean
    left: boolean
    right: boolean
  }

  constructor(x: number, y: number, name = '', options?: Options) {
    const {
      maxHP = 50,
      maxMP = 0,
      xp = 0,
      damage = 10,
      speed = 0.1,
      jumpHeight = 3,
      width,
      height,
      mirrored
    } = options ?? {}
    super(name, { width, height, mirrored })
    this.x = x
    this.y = y
    this.cooldown = -1
    this.stats = {
      hp: maxHP,
      maxHP,
      mp: maxMP,
      maxMP,
      xp,
      damage,
      speed,
      jumpHeight,
      jumpTime: 0
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
  }

  movementToString(): string {
    let text = ''
    if (this.movement.left) text += '←'
    if (this.movement.down) text += '↓'
    if (this.movement.right) text += '→'
    if (this.movement.attack) text += '$'
    if (this.movement.use) text += '#'
    if (this.movement.jump) text += ` ▲${this.stats.jumpTime}`
    return text
  }

  collisionToString(): string {
    let text = ''
    if (this.collision.left) text += '←'
    if (this.collision.up) text += '↑'
    if (this.collision.down) text += '↓'
    if (this.collision.right) text += '→'
    return text
  }
}
