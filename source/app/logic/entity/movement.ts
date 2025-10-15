import Entity from '../../classes/Entity'
import checkEntityBorder from '../collision/border'
import entityToGridCollision from '../collision/grid'

export default function runEntityMovement(entity: Entity) {
  if (entity.isAlive === false) entity.resetMovement()
  const { dx, dy } = applyMovement(entity)

  entityToGridCollision(entity, dx, dy)
  entity.x = applyHorizontalCollision(entity, dx)
  entity.y = applyVerticalCollision(entity, dy)

  checkEntityBorder(entity)
}

function applyMovement(entity: Entity) {
  let dx = entity.x
  let dy = entity.y

  const gravity = entity.stats.speed * 1.5
  if (entity.collision.enabled) dy += gravity

  if (entity.movement.right) dx += entity.stats.speed
  if (entity.movement.left) dx -= entity.stats.speed
  if (entity.movement.down) dy += entity.stats.speed

  if (entity.movement.jump && entity.stats.jumpTime < entity.stats.jumpHeight) {
    dy -= entity.stats.speed
    if (entity.collision.enabled) dy -= gravity
    entity.stats.jumpTime += 0.1
  }
  return { dx, dy }
}

function applyHorizontalCollision(entity: Entity, dx: number) {
  if (entity.collision.left && !entity.collision.right) {
    return Math.floor(entity.x)
  }
  if (entity.collision.right && !entity.collision.left) {
    return Math.ceil(entity.x + entity.width) - entity.width
  }
  return dx
}

function applyVerticalCollision(entity: Entity, dy: number) {
  if (entity.collision.enabled === false) entity.stats.jumpTime = 0
  if (entity.collision.up) {
    entity.stats.jumpTime = entity.stats.jumpHeight
    return Math.floor(entity.y)
  } else if (entity.collision.down) {
    entity.stats.jumpTime = 0
    return Math.ceil(entity.y + entity.height) - entity.height
  }
  return dy
}
