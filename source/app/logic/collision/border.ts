import Entity from '../../classes/Entity'
import { $world } from '../../globals/world'
import { entityToBoxCollision } from './box'

/**
 * Checks if the given Entity is within the world border and moves it back if needed.
 * If solidBorder === true the Entity will be moved to world root instead.
 */
export default function checkEntityBorder(entity: Entity) {
  if ($world.properties.solidBorder) {
    checkBorderAsSolid(entity)
  } else checkBorderWithTeleport(entity)
}

function checkBorderAsSolid(entity: Entity) {
  if (!entity.collision.enabled) return
  if (entity.x + entity.width > $world.properties.borderX + $world.properties.borderW)
     entity.x = $world.properties.borderX + $world.properties.borderW - entity.width
  if (entity.x < $world.properties.borderX)
     entity.x = $world.properties.borderX
  if (entity.y + entity.height > $world.properties.borderY + $world.properties.borderH)
     entity.y = $world.properties.borderY + $world.properties.borderH - entity.height
  if (entity.y < $world.properties.borderY)
     entity.y = $world.properties.borderY
}

function checkBorderWithTeleport(entity: Entity) {
  if (!entity.collision.enabled) return
  if (!entityToBoxCollision(entity, $world.properties.borderX, $world.properties.borderY, $world.properties.borderW, $world.properties.borderH)) {
    entity.x = $world.properties.rootX
    entity.y = $world.properties.rootY
  }
}
