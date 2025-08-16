import Entity from '../classes/Entity'
import { Collision } from '../classes/Tile'
import { $world } from '../globals/world'

// unused for now
function hasCollision(entity: Entity, x: number, y: number, w: number, h: number): boolean {
  return (
    entity.x < x + w &&
    entity.x + entity.width > x &&
    entity.y < y + h &&
    entity.y + entity.height > y &&
    entity.collision.enabled
  )
}

export default function collision(entity: Entity, dx: number, dy: number): void {
  getCollisions(entity, dx, dy)
  handleCollisions(entity, dx, dy)
  borderControl(entity)
}

function getCollisions(entity: Entity, dx: number, dy: number): void {
  entity.collision.left = false
  entity.collision.right = false
  entity.collision.up = false
  entity.collision.down = false
  if (entity.collision.enabled) {
    for (let i = Math.floor(dx); i < Math.ceil(dx + entity.width); i++) {
      for (let j = Math.floor(dy); j < Math.ceil(dy + entity.height); j++) {
        let tile = $world.foreground[j]?.[i]
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
        if (entity.movement.use && (tile?.activator ?? false)) {
          tile?.activate()
        }
      }
    }
  } else {
    //* no collision *//
    entity.stats.jumpTime = 0
    if (entity.movement.down) {
      dy += entity.stats.speed
    }
  }
}

function handleCollisions(entity: Entity, dx: number, dy: number): void {
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
}

/**
 * Checks if the given entity is within the world border and moves it back if needed.
 * @param entity - The entity to check.
 */
function borderControl(entity: Entity): void {
  if (!entity.collision.enabled) return
  if (entity.x + entity.width > $world.properties.borderX + $world.properties.borderW) entity.x = $world.properties.borderX + $world.properties.borderW - entity.width
  if (entity.x < $world.properties.borderX) entity.x = $world.properties.borderX
  if (entity.y + entity.height > $world.properties.borderY + $world.properties.borderH) entity.y = $world.properties.borderY + $world.properties.borderH - entity.height
  if (entity.y < $world.properties.borderY) entity.y = $world.properties.borderY
}
