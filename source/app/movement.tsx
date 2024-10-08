import { TileEntity, type Entity, type Tile } from './classes'
import { entityList, player, playerStats, tileEntityList, tileList, weather } from './globals'
import { borderControl, collision } from './helpers'

export function entityMovement (entity: Entity): void {
  borderControl(entity)

  if (entity.animation === entity.death && entity.stats.hp <= 0) {
    if (entity.frame.currentFrame < entity.animation.frames - 1) {
      entity.frame.currentFrame += entity.animation.speed
    }
    entity.controls.attack = false
    entity.controls.jump = false
    entity.controls.down = false
    entity.controls.left = false
    entity.controls.right = false
    for (let i = 0; i < tileList.length; i++) {
      collision(entity, tileList[i])
    }
    if (!entity.collision.down && entity.hasCollision) {
      entity.frame.y -= 9.81 * 2
    }
  } else {
    if (entity.stats.hp < entity.stats.maxHP && entity.stats.mp > 0 && entity.stats.mp > entity.stats.maxMP / 3) {
      entity.stats.hp += 0.02
      entity.stats.mp -= 0.02
    } else if (entity.stats.mp < entity.stats.maxMP) {
      entity.stats.mp += Math.abs(weather.temp / 1000)
    }
    if (entity.controls.attack !== false && entity.frame.width !== entity.defaultWidth) {
      entity.frame.width = entity.defaultWidth
      entity.frame.x += (entity.attackWidth - entity.defaultWidth) / 2
    }
    if (entity !== player) {
      if (entity.cooldown > 0) {
        entity.cooldown--
      } else if (entity.cooldown < 20) {
        if (Math.abs(entity.frame.x - player.frame.x) < window.innerWidth / 2) {
          entity.controls.attack = Math.abs(entity.frame.x - (player.frame.x + player.frame.width)) < 15 || Math.abs(player.frame.x - (entity.frame.x + entity.frame.width)) < 15
          if (player.frame.y - entity.frame.y > 0 && entity.air !== entity.maxAir) {
            entity.controls.jump = true
            entity.controls.down = false
          } else if (entity.frame.y - player.frame.y > 0) {
            entity.controls.jump = false
            entity.controls.down = true
          } else {
            entity.controls.jump = false
            entity.controls.down = false
          }
          if (entity.frame.x - (player.frame.x + player.frame.width) > 5 && (entity.frame.x - (player.frame.x + player.frame.width) < 600)) {
            entity.controls.left = true
            entity.controls.right = false
          } else if (player.frame.x - (entity.frame.x + entity.frame.width) > 5 && (player.frame.x - (entity.frame.x + entity.frame.width) < 600)) {
            entity.controls.left = false
            entity.controls.right = true
          }
          entity.cooldown = 20
        } else {
          entity.controls.left = false
          entity.controls.right = false
        }
      }
    }
    entity.collision.up = false
    entity.collision.down = false
    entity.collision.left = false
    entity.collision.right = false
    for (let i = 0; i < tileList.length; i++) {
      collision(entity, tileList[i])
    }
    for (let i = 0; i < tileEntityList.length; i++) {
      collision(entity, tileEntityList[i])
    }
    if (entity.collision.down && entity.air !== 0) {
      if (!entity.controls.left && !entity.controls.right) {
        entity.frame.currentFrame = 0
        entity.animation = entity.idle
      }
      if (!entity.controls.jump) {
        entity.air = 0
      }
    }
    if (entity.controls.right && !entity.collision.right && !(entity.controls.attack !== false && (entity.air === 0 || entity.air === entity.maxAir))) {
      entity.frame.x += entity.stats.speed
      if (entity.animation !== entity.move) {
        entity.frame.currentFrame = 0
        entity.animation = entity.move
      }
      entity.frame.mirrored = false
      if (entity.frame.currentFrame < entity.animation.frames - 1) {
        entity.frame.currentFrame += entity.animation.speed
      } else {
        entity.frame.currentFrame = 0
      }
    }
    if (entity.controls.left && !entity.collision.left && !(entity.controls.attack !== false && (entity.air === 0 || entity.air === entity.maxAir))) {
      entity.frame.x -= entity.stats.speed
      if (entity.animation !== entity.move) {
        entity.frame.currentFrame = 0
        entity.animation = entity.move
      }
      entity.frame.mirrored = true
      if (entity.frame.currentFrame < entity.animation.frames - 1) {
        entity.frame.currentFrame += entity.animation.speed
      } else {
        entity.frame.currentFrame = 0
      }
    }
    if (((entity.controls.left && entity.controls.right) || (!entity.controls.left && !entity.controls.right)) && entity.controls.attack === false && entity.animation !== entity.fall && !entity.controls.jump) {
      if (entity.animation !== entity.idle) {
        entity.frame.currentFrame = 0
        entity.animation = entity.idle
      }
      if (entity.frame.currentFrame < entity.animation.frames - 1) {
        entity.frame.currentFrame += entity.animation.speed
      } else {
        entity.frame.currentFrame = 0
      }
    }
    if (entity.controls.jump && (entity.air < entity.maxAir) && !entity.collision.up && entity.hasCollision) {
      entity.frame.y += 20
      entity.air++
      if (entity.animation !== entity.jump) {
        entity.frame.currentFrame = 0
        entity.animation = entity.jump
      }
      entity.frame.currentFrame = entity.air / entity.maxAir * entity.animation.frames - 1
      if (entity.frame.currentFrame < entity.animation.frames - 1) {
        entity.frame.currentFrame += entity.animation.speed
      }
    } else if (((entity.air > entity.maxAir) || (!entity.controls.jump && entity.air > (entity.maxAir / 2)) || !entity.collision.down) && entity.hasCollision) {
      entity.frame.y -= 9.81 * 2
      entity.air = entity.maxAir
      if (entity.animation !== entity.fall) {
        entity.frame.currentFrame = 0
        entity.animation = entity.fall
      }
      if (entity.frame.currentFrame < entity.animation.frames - 1) {
        entity.frame.currentFrame += entity.animation.speed
      } else {
        entity.frame.currentFrame = 0
      }
    }
    if (!entity.hasCollision) {
      entity.air = 0
      if (entity.controls.jump) {
        entity.frame.y += entity.stats.speed
      }
      if (entity.controls.down) {
        entity.frame.y -= entity.stats.speed
      }
    }
    entity.collision.up = false
    entity.collision.down = false
    entity.collision.left = false
    entity.collision.right = false
    if (entity.controls.attack === true) {
      if (entity.animation !== entity.attack && !entity.controls.jump) {
        entity.frame.currentFrame = 0
        entity.animation = entity.attack
        entity.frame.width = entity.attackWidth
        entity.frame.x -= (entity.attackWidth - entity.defaultWidth) / 2
      }
      if (entity.frame.currentFrame < entity.animation.frames - 1) {
        entity.frame.currentFrame += entity.animation.speed
      } else {
        if (entity === player) {
          playerStats.attacks++
        }
        for (let i = 0; i < entityList.length; i++) {
          let entity2: Entity | null
          if (entity === player) {
            entity2 = collision(entity, entityList[i], true) ? entityList[i] : null
          } else {
            entity2 = collision(entity, player, true) ? player : null
          }
          if (entity2 !== null) {
            if (entity.frame.mirrored ? entity.collision.left : entity.collision.right) {
              if (entity2.stats.hp > 0) {
                entity2.stats.hp -= entity.stats.damage
                entity2.frame.x += (entity.frame.mirrored ? -50 : 50)
                entity2.cooldown = 8
                entity2.controls.left = false
                entity2.controls.right = false
                if (entity === player) {
                  playerStats.damageDealt += entity.stats.damage
                  playerStats.attacksHit++
                }
                if (entity2 === player) {
                  playerStats.damageTaken += entity.stats.damage
                }
              }
              if (entity2.stats.hp <= 0 && entity2.animation !== entity2.death) {
                entity2.animation = entity2.death
                entity2.frame.currentFrame = 0
                entity.stats.xp += entity2.stats.xp
                if (entity.stats.mp < entity.stats.maxMP - entity2.stats.mp) {
                  entity.stats.mp += entity2.stats.mp
                }
                entity2.stats.mp = 0
                if (entity === player) {
                  playerStats.kills++
                }
              }
            }
          }
        }
        entity.controls.attack = 2
      }
    }
    if (entity.controls.use === true) {
      for (let i = 0; i < tileEntityList.length; i++) {
        let tile: Tile | null = null
        if (entity === player) {
          tile = collision(entity, tileEntityList[i], true) ? tileEntityList[i] : null
        }
        if (tile instanceof TileEntity && (entity.frame.mirrored ? entity.collision.left : entity.collision.right)) {
          tile.activate()
        }
      }
      entity.controls.use = 2
    }
  }
}
