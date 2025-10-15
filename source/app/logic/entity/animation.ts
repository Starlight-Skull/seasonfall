import Entity from '../../classes/Entity'

export default function runEntityAnimation(entity: Entity) {
  entity.changeAnimation(getAnimation(entity))
  if (entity.movement.left) entity.mirrored = true
  if (entity.movement.right) entity.mirrored = false
  entity.nextFrame()
}

function getAnimation(entity: Entity) {
  if (entity.isAlive === false) return entity.animations.death

  let animation = entity.animations.idle
  if (entity.movement.attack) animation = entity.animations.attack
  if (entity.movement.left !== entity.movement.right) animation = entity.animations.move
  if (entity.movement.jump) animation = entity.animations.jump
  return animation
}
