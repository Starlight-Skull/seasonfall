import { Collision, type NewEntity, type SpriteSet } from './classes'
import { player, weather, level } from './globals'
import { borderControl } from './helpers'

function nextFrame (entity: NewEntity, loop = false): void {
  if (entity.animationFrame < entity.animation.frames - 1) {
    entity.animationFrame += entity.animation.speed
  } else if (loop) {
    entity.animationFrame = 0
  }
}

function changeAnimation (entity: NewEntity, animation: SpriteSet): void {
  if (entity.animation !== animation) {
    entity.animationFrame = 0
    entity.animation = animation
  }
}

function tick (entity: NewEntity): void {
  if (entity.stats.hp < entity.stats.maxHP && entity.stats.mp > 0 && entity.stats.mp > entity.stats.maxMP / 3) {
    entity.stats.hp += 0.02
    entity.stats.mp -= 0.02
  } else if (entity.stats.mp < entity.stats.maxMP) {
    entity.stats.mp += Math.abs(weather.temp / 1000)
  }
  if (entity !== player) {
    if (entity.cooldown > 0) {
      entity.cooldown--
    } else if (entity.cooldown < 20) {
      if (Math.abs(entity.x - player.x) < window.innerWidth / 2) {
        entity.movement.attack = Math.abs(entity.x - (player.x + player.width)) < 15 || Math.abs(player.x - (entity.x + entity.width)) < 15
        if (player.y - entity.y > 0 && entity.stats.jumpTime !== entity.stats.jumpHeight) {
          entity.movement.jump = true
          entity.movement.down = false
        } else if (entity.y - player.y > 0) {
          entity.movement.jump = false
          entity.movement.down = true
        } else {
          entity.movement.jump = false
          entity.movement.down = false
        }
        if (entity.x - (player.x + player.width) > 5 && (entity.x - (player.x + player.width) < 600)) {
          entity.movement.left = true
          entity.movement.right = false
        } else if (player.x - (entity.x + entity.width) > 5 && (player.x - (entity.x + entity.width) < 600)) {
          entity.movement.left = false
          entity.movement.right = true
        }
        entity.cooldown = 20
      } else {
        entity.movement.left = false
        entity.movement.right = false
      }
    }
  }
}

export function entityMovement (entity: NewEntity): void {
  borderControl(entity)

  if (entity.animation === entity.animations.death && entity.stats.hp <= 0) {
    nextFrame(entity)
    // entity.movement.attack = false
    // entity.movement.jump = false
    // entity.movement.down = false
    // entity.movement.left = false
    // entity.movement.right = false
    // for (let i = 0; i < tileList.length; i++) {
    //   collision(entity, tileList[i])
    // }
    // if (!entity.collision.down && entity.hasCollision) {
    //   entity.y -= 9.81 * 2
    // }
  } else {
    // if (entity.movement.attack && entity.width !== entity.defaultWidth) {
    //   entity.width = entity.defaultWidth
    //   entity.x += (entity.attackWidth - entity.defaultWidth) / 2
    // }
    tick(entity)

    // for (let i = 0; i < tileEntityList.length; i++) {
    //   collision(entity, tileEntityList[i])
    // }
    // if (entity.collision.down && entity.air !== 0) {
    //   if (!entity.movement.left && !entity.movement.right) {
    //     entity.animationFrame = 0
    //     entity.animation = entity.idle
    //   }
    //   if (!entity.movement.jump) {
    //     entity.air = 0
    //   }
    // }

    let dx = entity.x
    let dy = entity.y
    //* idle *//
    if (((entity.movement.left === entity.movement.right)) && !entity.movement.attack && entity.animation !== entity.animations.fall && !entity.movement.jump) {
      changeAnimation(entity, entity.animations.idle)
    } else {
      //* right *//
      if (entity.movement.right && !(entity.movement.attack && (entity.stats.jumpTime === 0 || entity.stats.jumpTime === entity.stats.jumpHeight))) {
        dx += entity.stats.speed
        changeAnimation(entity, entity.animations.move)
        entity.mirrored = false
      }
      //* left *//
      if (entity.movement.left && !(entity.movement.attack && (entity.stats.jumpTime === 0 || entity.stats.jumpTime === entity.stats.jumpHeight))) {
        dx -= entity.stats.speed
        changeAnimation(entity, entity.animations.move)
        entity.mirrored = true
      }
    }
    //* jump *//
    if ((entity.movement.jump) && entity.stats.jumpTime >= 0 && entity.stats.jumpTime < entity.stats.jumpHeight) {
      dy -= entity.stats.speed
      entity.stats.jumpTime += 0.1
      changeAnimation(entity, entity.animations.jump)
    } else if (entity.collision.enabled) {
      //* fall *//
      dy += entity.stats.speed * 1.5
    }

    if (entity.collision.enabled) {
      entity.collision.left = false
      entity.collision.right = false
      entity.collision.up = false
      entity.collision.down = false
      for (let i = Math.floor(dx); i < Math.ceil(dx + entity.width); i++) {
        for (let j = Math.floor(dy); j < Math.ceil(dy + entity.height); j++) {
          let tile = level.foreground[j]?.[i]
          if (tile !== undefined && tile.collision !== Collision.none) {
            const xRange = i >= Math.floor(entity.x) && (i < Math.ceil(entity.x + entity.width))
            const yRange = j >= Math.floor(entity.y) && j < Math.ceil(entity.y + entity.height)
            if (yRange && !xRange) {
              if (i < entity.x && tile.collision === Collision.all) {
                entity.collision.left = true
              } else if (i > entity.x && tile.collision === Collision.all) {
                entity.collision.right = true
              }
            }
            if (xRange && !yRange) {
              if (j < entity.y && tile.collision === Collision.all) {
                entity.collision.up = true
              } else if (j > entity.y && (tile.collision === Collision.all || (!entity.movement.down && tile.collision === Collision.top))) {
                entity.collision.down = true
              }
            }
          }
        }
      }
    } else {
      //* no collision *//
      entity.collision.left = false
      entity.collision.right = false
      entity.collision.up = false
      entity.collision.down = false
      entity.stats.jumpTime = 0
      if (entity.movement.down) {
        dy += entity.stats.speed
      }
    }
    if (!entity.collision.left && !entity.collision.right) {
      entity.x = dx
    } else {
      if (entity.collision.left && !entity.collision.right) {
        entity.x = Math.floor(entity.x)
      }
      if (entity.collision.right && !entity.collision.left) {
        entity.x = Math.ceil(entity.x + entity.width) - entity.width
      }
    }
    if (!entity.collision.up && !entity.collision.down) {
      entity.y = dy
    } else {
      if (entity.collision.up) {
        entity.y = Math.floor(entity.y)
        entity.stats.jumpTime = entity.stats.jumpHeight
      } else if (entity.collision.down) {
        entity.y = Math.ceil(entity.y + entity.height) - entity.height
        entity.stats.jumpTime = 0
      }
    }
    nextFrame(entity, true)

    // if (entity.movement.jump && (entity.air < entity.maxAir) && !entity.collision.up && entity.hasCollision) {
    //   entity.y += 20
    //   entity.air++
    //   if (entity.animation !== entity.jump) {
    //     entity.animationFrame = 0
    //     entity.animation = entity.jump
    //   }
    //   entity.animationFrame = entity.air / entity.maxAir * entity.animation.frames - 1
    //   if (entity.animationFrame < entity.animation.frames - 1) {
    //     entity.animationFrame += entity.animation.speed
    //   }
    // } else if (((entity.air > entity.maxAir) || (!entity.movement.jump && entity.air > (entity.maxAir / 2)) || !entity.collision.down) && entity.hasCollision) {
    //   entity.y -= 9.81 * 2
    //   entity.air = entity.maxAir
    //   if (entity.animation !== entity.fall) {
    //     entity.animationFrame = 0
    //     entity.animation = entity.fall
    //   }
    //   if (entity.animationFrame < entity.animation.frames - 1) {
    //     entity.animationFrame += entity.animation.speed
    //   } else {
    //     entity.animationFrame = 0
    //   }
    // }
    // if (!entity.hasCollision) {
    //   entity.air = 0
    //   if (entity.movement.jump) {
    //     entity.y += entity.stats.speed
    //   }
    //   if (entity.movement.down) {
    //     entity.y -= entity.stats.speed
    //   }
    // }
    // entity.collision.up = false
    // entity.collision.down = false
    // entity.collision.left = false
    // entity.collision.right = false
    // if (entity.movement.attack) {
    //   if (entity.animation !== entity.attack && !entity.movement.jump) {
    //     entity.animationFrame = 0
    //     entity.animation = entity.attack
    //     entity.width = entity.animations.attack.boxWidth
    //     entity.x -= (entity.attackWidth - entity.defaultWidth) / 2
    //   }
    //   if (entity.animationFrame < entity.animation.frames - 1) {
    //     entity.animationFrame += entity.animation.speed
    //   } else {
    //     if (entity === player) {
    //       playerStats.attacks++
    //     }
    //     for (let i = 0; i < entityList.length; i++) {
    //       let entity2: NewEntity | null
    //       if (entity === player) {
    //         entity2 = collision(entity, entityList[i].x, entityList[i].y, entityList[i].width, entityList[i].height, true) ? entityList[i] : null
    //       } else {
    //         entity2 = collision(entity, player.x, player.y, player.width, player.height, true) ? player : null
    //       }
    //       if (entity2 !== null) {
    //         if (entity.mirrored ? entity.collision.left : entity.collision.right) {
    //           if (entity2.stats.hp > 0) {
    //             entity2.stats.hp -= entity.stats.damage
    //             entity2.x += (entity.mirrored ? -50 : 50)
    //             entity2.cooldown = 8
    //             entity2.movement.left = false
    //             entity2.movement.right = false
    //             if (entity === player) {
    //               playerStats.damageDealt += entity.stats.damage
    //               playerStats.attacksHit++
    //             }
    //             if (entity2 === player) {
    //               playerStats.damageTaken += entity.stats.damage
    //             }
    //           }
    //           if (entity2.stats.hp <= 0 && entity2.animation !== entity2.death) {
    //             entity2.animation = entity2.death
    //             entity2.animationFrame = 0
    //             entity.stats.xp += entity2.stats.xp
    //             if (entity.stats.mp < entity.stats.maxMP - entity2.stats.mp) {
    //               entity.stats.mp += entity2.stats.mp
    //             }
    //             entity2.stats.mp = 0
    //             if (entity === player) {
    //               playerStats.kills++
    //             }
    //           }
    //         }
    //       }
    //     }
    //     entity.movement.attack = 2
    //   }
    // }
    // if (entity.movement.use) {
    //   for (let i = 0; i < tileEntityList.length; i++) {
    //     let tile: Tile | null = null
    //     if (entity === player) {
    //       tile = collision(entity, tileEntityList[i].x, tileEntityList[i].y, tileEntityList[i].width, tileEntityList[i].height, true) ? tileEntityList[i] : null
    //     }
    //     if (tile instanceof TileEntity && (entity.mirrored ? entity.collision.left : entity.collision.right)) {
    //       tile.activate()
    //     }
    //   }
    //   entity.movement.use = 2
    // }
  }
}
