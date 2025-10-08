import Entity from '../classes/Entity'
import { Collision } from '../classes/Tile'
import { $world } from '../globals/world'

export default function checkCollisionsAndMove(entity: Entity, dx: number, dy: number): void {
  entity.collision.left = false
  entity.collision.right = false
  entity.collision.up = false
  entity.collision.down = false
  checkGridBounds(entity, dx, dy)
  moveEntity(entity, dx, dy)
  borderControl(entity)
}

function checkGridBounds(entity: Entity, dx: number, dy: number) {
  if (entity.collision.enabled === false) return
  for (let x = Math.floor(dx); x < Math.ceil(dx + entity.width); x++) {
    for (let y = Math.floor(dy); y < Math.ceil(dy + entity.height); y++) {
      const tile = $world.foreground[y]?.[x]
      if (tile === undefined) continue
      checkGrid(entity, { x, y, collision: tile.collision })

      // todo split up + bigger interaction box
      if (entity.movement.use && tile.activator) {
        tile.activate()
      }
    }
  }
}

/***
 * Checks for horizontal & vertical collision between a tile and an entity
 */
function checkGrid(entity: Entity, tile: { x: number; y: number; collision: Collision }): void {
  if (tile.collision === Collision.none) return

  const inXBounds = tile.x >= Math.floor(entity.x) && tile.x < Math.ceil(entity.x + entity.width)
  const inYBounds = tile.y >= Math.floor(entity.y) && tile.y < Math.ceil(entity.y + entity.height)

  if (!inXBounds && inYBounds) {
    if (tile.x < entity.x) {
      entity.collision.left ||= tile.collision === Collision.all
    } else if (tile.x >= entity.x + entity.width) {
      entity.collision.right ||= tile.collision === Collision.all
    }
  }
  if (inXBounds && !inYBounds) {
    if (tile.y < entity.y) {
      entity.collision.up ||= tile.collision === Collision.all
    } else if (tile.y > entity.y) {
      let fallThrough = entity.movement.down && tile.collision === Collision.top
      entity.collision.down ||= tile.collision === Collision.all || !fallThrough
    }
  }
}

// todo - could be better
function moveEntity(entity: Entity, dx: number, dy: number): void {
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
