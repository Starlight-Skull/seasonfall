import Entity from '../../classes/Entity'
import { $player } from '../../globals/world'

export function runNpcAI(entity: Entity): void {
  if (entity.cooldown > 0) {
    entity.cooldown--
    return
  }
  const followRange = 8 // tiles
  const attackRange = 1 // tiles
  followAndAttack(entity, $player, followRange, attackRange)
}

function followAndAttack(
  npc: Entity,
  target: Entity,
  followRange: number,
  attackRange: number
) {
  const distX = npc.x - target.x
  const distY = npc.y - target.y
  const isInFollowRange = Math.abs(distX) <= followRange && Math.abs(distY) <= followRange
  const isInAttackRange = Math.abs(distX) <= attackRange && Math.abs(distY) <= attackRange

  if (target.isAlive && isInFollowRange) {
    npc.movement.left = distX > attackRange
    npc.movement.right = distX < -attackRange
    npc.movement.jump = distY > attackRange
    npc.movement.down = distY < -attackRange
    npc.movement.attack = isInAttackRange
    npc.cooldown = 20 // ms
  } else npc.resetMovement()
}
