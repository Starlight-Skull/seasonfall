import Entity from '../../classes/Entity'
import { $world } from '../../globals/world'

/**
 * Checks if the given entity is within the world border and moves it back if needed.
 */
export default function checkEntityBorder(entity: Entity) {
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
