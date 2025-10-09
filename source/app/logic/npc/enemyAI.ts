import Entity from '../../classes/Entity'
import { $game } from '../../globals/game'
import { $player } from '../../globals/world'

export function runNpcAI(entity: Entity): void {
  if (entity === $player) return
  if (entity.cooldown > 0) {
    entity.cooldown--
    return
  }
  const maxFollowRange = window.innerWidth / $game.grid / 3
  followAndAttack(entity, $player, maxFollowRange, 1)
}

function followAndAttack(
  npc: Entity,
  target: Entity,
  followRange: number,
  attackRange: number
) {
  const distX = npc.x - target.x
  const distY = npc.y - target.y

  if (Math.abs(distX) > followRange || Math.abs(distY) > followRange) {
    npc.movement.left = false
    npc.movement.right = false
    npc.movement.jump = false
    npc.movement.down = false
    npc.movement.attack = false
  } else {
    npc.movement.left = distX > attackRange
    npc.movement.right = distX < -attackRange
    npc.movement.jump = distY > attackRange
    npc.movement.down = distY < -attackRange
    npc.movement.attack = Math.abs(distX) <= attackRange && Math.abs(distY) <= attackRange
    npc.cooldown = 20
  }
}
