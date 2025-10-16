import Entity from "../../classes/Entity";

export function knockback(entity: Entity, target: Entity) {
  // ! this way of adding knockback skips collision checks
  // todo - disabled until vectors are added to entities
  // if (entity.x < target.x) {
  //   target.x += 1.5
  //   target.y -= 0.3
  // } else {
  //   target.x -= 1.5
  //   target.y -= 0.3
  // }
}

export function heal(entity: Entity) {
  if (entity.stats.hp < entity.stats.maxHP) {
    entity.stats.hp += 0.01
  }
  if (entity.stats.mp < entity.stats.maxMP) {
    entity.stats.mp += 0.01
  }
}
