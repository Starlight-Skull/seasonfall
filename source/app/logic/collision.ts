import Entity from '../classes/Entity'
import checkEntityBorder from './collision/border'
import entityToGridCollision from './collision/grid'

export default function checkCollisionsAndMove(entity: Entity, dx: number, dy: number): void {
  entityToGridCollision(entity, dx, dy)
  moveEntity(entity, dx, dy)
  checkEntityBorder(entity)
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
