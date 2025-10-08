import Entity from '../../classes/Entity'
import { Collision } from '../../classes/Tile'
import { $world } from '../../globals/world'

/**
 * Checks an entity's bounding grid tiles for collision & sets values in entity.collision
 */
export default function entityToGridCollision(
  entity: Entity,
  dx: number,
  dy: number
) {
  entity.collision.left = false
  entity.collision.right = false
  entity.collision.up = false
  entity.collision.down = false
  if (entity.collision.enabled === false) return
  checkGridBounds(entity, dx, dy)
}

function checkGridBounds(entity: Entity, dx: number, dy: number) {
  for (let x = Math.floor(dx); x < Math.ceil(dx + entity.width); x++) {
    for (let y = Math.floor(dy); y < Math.ceil(dy + entity.height); y++) {
      const tile = $world.foreground[y]?.[x]
      if (tile === undefined) continue
      checkGridCollision(entity, { x, y, collision: tile.collision })

      // todo split up + bigger interaction box
      if (entity.movement.use && tile.activator) {
        tile.activate()
      }
    }
  }
}

/**
 * Checks for horizontal & vertical collision between a tile and an entity
 */
function checkGridCollision(
  entity: Entity,
  tile: { x: number; y: number; collision: Collision }
) {
  if (tile.collision === Collision.none) return

  const inXBounds =
    tile.x >= Math.floor(entity.x) &&
    tile.x < Math.ceil(entity.x + entity.width)
  const inYBounds =
    tile.y >= Math.floor(entity.y) &&
    tile.y < Math.ceil(entity.y + entity.height)

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
