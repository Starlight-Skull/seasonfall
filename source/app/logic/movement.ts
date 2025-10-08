import Entity from '../classes/Entity'
import { $weather } from '../globals/weather'
import checkCollisionsAndMove from './collision'

function tick (entity: Entity): void {
  //* healing *//
  if (entity.stats.hp < entity.stats.maxHP && entity.stats.mp > 0 && entity.stats.mp > entity.stats.maxMP / 3) {
    entity.stats.hp += 0.02
    entity.stats.mp -= 0.02
  } else if (entity.stats.mp < entity.stats.maxMP) {
    entity.stats.mp += Math.abs($weather.temp / 1000)
  }
  //* AI pathing *//
  // if (entity !== player) {
  //   if (entity.cooldown > 0) {
  //     entity.cooldown--
  //   } else if (entity.cooldown < 20) {
  //     if (Math.abs(entity.x - player.x) < window.innerWidth / 2) {
  //       entity.movement.attack = Math.abs(entity.x - (player.x + player.width)) < 15 || Math.abs(player.x - (entity.x + entity.width)) < 15
  //       if (player.y - entity.y > 0 && entity.stats.jumpTime !== entity.stats.jumpHeight) {
  //         entity.movement.jump = true
  //         entity.movement.down = false
  //       } else if (entity.y - player.y > 0) {
  //         entity.movement.jump = false
  //         entity.movement.down = true
  //       } else {
  //         entity.movement.jump = false
  //         entity.movement.down = false
  //       }
  //       if (entity.x - (player.x + player.width) > 5 && (entity.x - (player.x + player.width) < 600)) {
  //         entity.movement.left = true
  //         entity.movement.right = false
  //       } else if (player.x - (entity.x + entity.width) > 5 && (player.x - (entity.x + entity.width) < 600)) {
  //         entity.movement.left = false
  //         entity.movement.right = true
  //       }
  //       entity.cooldown = 20
  //     } else {
  //       entity.movement.left = false
  //       entity.movement.right = false
  //     }
  //   }
  // }
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
    tick(entity)
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
