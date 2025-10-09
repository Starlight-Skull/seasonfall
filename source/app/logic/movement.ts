import Entity from '../classes/Entity'
import { $weather } from '../globals/weather'
import checkCollisionsAndMove from './collision'
import { runNpcAI } from './npc/enemyAI'

function heal(entity: Entity) {
  if (entity.stats.hp < entity.stats.maxHP && entity.stats.mp > 0 && entity.stats.mp > entity.stats.maxMP / 3) {
    entity.stats.hp += 0.02
    entity.stats.mp -= 0.02
  } else if (entity.stats.mp < entity.stats.maxMP) {
    entity.stats.mp += Math.abs($weather.temp / 1000)
  }
}

export default function entityMovement (entity: Entity): void {
  let dx = entity.x
  let dy = entity.y
  let loop = true
  const GRAVITY = entity.stats.speed * 1.5
  //* dead *//
  if (entity.animation === entity.animations.death || entity.stats.hp <= 0) {
    entity.changeAnimation(entity.animations.death)
    loop = false
    entity.movement.attack = false
    entity.movement.jump = false
    entity.movement.down = false
    entity.movement.left = false
    entity.movement.right = false
    if (entity.collision.enabled) dy += GRAVITY
  } else {
    heal(entity)
    runNpcAI(entity)
    //* idle *//
    if (((entity.movement.left === entity.movement.right)) && !entity.movement.attack && entity.animation !== entity.animations.fall && !entity.movement.jump) {
      entity.changeAnimation(entity.animations.idle)
    } else {
      //* right *//
      if (entity.movement.right && !(entity.movement.attack && (entity.stats.jumpTime === 0 || entity.stats.jumpTime === entity.stats.jumpHeight))) {
        dx += entity.stats.speed
        entity.changeAnimation(entity.animations.move)
        entity.mirrored = false
      }
      //* left *//
      if (entity.movement.left && !(entity.movement.attack && (entity.stats.jumpTime === 0 || entity.stats.jumpTime === entity.stats.jumpHeight))) {
        dx -= entity.stats.speed
        entity.changeAnimation(entity.animations.move)
        entity.mirrored = true
      }
    }
    //* jump *//
    if ((entity.movement.jump) && entity.stats.jumpTime >= 0 && entity.stats.jumpTime < entity.stats.jumpHeight) {
      dy -= entity.stats.speed
      entity.stats.jumpTime += 0.1
      entity.changeAnimation(entity.animations.jump)
    } else if (entity.collision.enabled) {
      //* fall *//
      dy += GRAVITY
      if (entity.movement.down) dy += GRAVITY
    } else {
      //* no collision *//
      entity.stats.jumpTime = 0
      if (entity.movement.down) {
        dy += entity.stats.speed
      }
    }
    if (entity.movement.attack) {
      entity.changeAnimation(entity.animations.attack)
      loop = false
    }
  }
  checkCollisionsAndMove(entity, dx, dy)
  entity.nextFrame(loop)
}
