import { LoadImage, textures } from './textures.js'

const missingEntity = LoadImage(textures.entity.missing_entity)
const missingTile = LoadImage(textures.tile.missing_tile)

export class Entity {
  constructor (hasCollision, cooldown, speed, damage, maxHP, maxMP, maxAir, xp, x, y, width, height) {
    this.cooldown = cooldown || -1
    this.missing = new Animation(missingEntity, 0, 0, 32, 32, 1, 1, 'missing')
    this.frame = {
      x: x || 0,
      y: y || 0,
      width: width || 160,
      height: height || 160,
      currentFrame: 0,
      mirrored: false
    }
    this.defaultWidth = width
    this.attackWidth = width
    this.animation = ''
    this.idle = this.missing
    this.move = this.missing
    this.attack = this.missing
    this.jump = this.missing
    this.fall = this.missing
    this.death = this.missing
    this.stats = {
      damage: damage || 0,
      invulnerable: 0,
      hp: maxHP || 100,
      maxHP: maxHP || 100,
      mp: maxMP || 0,
      maxMP: maxMP || 0,
      xp: xp || 0,
      speed: speed || 10
    }
    this.air = 0
    this.maxAir = maxAir || 15
    this.controls = {
      attack: false,
      down: false,
      left: false,
      right: false,
      jump: false
    }
    this.collision = {
      up: false,
      down: false,
      left: false,
      right: false
    }
    this.hasCollision = hasCollision
  }
}

export class NewEntity {
  constructor (collision, x, y) {
    this.stats = {
      damage: 10,
      hp: 100,
      maxHP: 100,
      mp: 0,
      maxMP: 0,
      xp: 0,
      speed: 0.5,
      jumpHeight: 2
    }
    this.movement = {
      attack: false,
      down: false,
      left: false,
      right: false,
      jump: false
    }
    this.collision = {
      enabled: true,
      up: false,
      down: false,
      left: false,
      right: false
    }
    this.position = {
      x: x || 0,
      y: y || 0,
      mirrored: false
    }
    this.animations = {
      idle: '',
      move: '',
      attack: '',
      jump: '',
      fall: '',
      death: ''
    }
  }
}

export class Tile {
  constructor (hasCollision, x, y, width, height, sprite) {
    this.hasCollision = hasCollision // 2 = only top collision
    this.frame = {
      x: x || 0,
      y: y || 0,
      width: width || 80,
      height: height || 80,
      currentFrame: 0,
      mirrored: false
    }
    this.sprite = sprite || missingTile
    this.animation = new Animation(sprite, 0, 0, 16, 16, 1, 1, 'default')
  }
}

export class NewTile {
  constructor (sprite, width, height, mirrored) {
    this.frame = {
      width: width || 16,
      height: height || 16,
      mirrored
    }
    this.sprite = sprite || missingTile
  }
}

export class TileEntity extends Tile {
  constructor (hasCollision, x, y, width, height, sprite, mirrored) {
    super(hasCollision, x, y, width, height, sprite)
    this.frame.mirrored = mirrored || false
    this.animation = new Animation(this.sprite, 0, 0, 16, 16, 1, 1, 'default')
  }

  activate () {
  }
}

export class Animation {
  constructor (sprite, x, y, width, height, frames, speed, name) {
    this.sprite = sprite
    this.x = x
    this.y = y
    this.frames = frames
    this.width = width
    this.height = height
    this.speed = speed
    this.name = name
  }
}
