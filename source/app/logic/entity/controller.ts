import Entity from '../../classes/Entity'
import { $playerStats } from '../../globals/playerStats'
import { $player } from '../../globals/world'
import { entityToEntityCollision } from '../collision/box'
import runEntityAnimation from './animation'
import { heal, knockback } from './effects'
import runEntityMovement from './movement'
import { runNpcAI } from './npcAI'

export default function runEntityController(entity: Entity, isPlayer = false) {
  if (entity.stats.hp > 0) {
    heal(entity)
    if (isPlayer === false) runNpcAI(entity)
  }

  if (isPlayer === false) {
    runEntityHitDetection(entity, $player, false)
    runEntityHitDetection($player, entity, true)
  }
  runEntityMovement(entity)
  runEntityAnimation(entity)
}

function runEntityHitDetection(entity: Entity, target: Entity, isPlayer: boolean) {
  if (entity.animation === entity.animations.attack && entity.movement.attack) {
    if (entity.animationFrame >= entity.animation.frames - 1) {
      if (entityToEntityCollision(entity, target)) {
        knockback(entity, target)
        if (!target.isAlive) return
        if (isPlayer) {
          $playerStats.attacksHit++
          $playerStats.damageDealt += $player.stats.damage
        }
        if (target === $player) $playerStats.damageTaken += entity.stats.damage

        entity.movement.attack = false
        target.stats.hp -= target.stats.damage

        if (!target.isAlive) {
          entity.stats.xp += target.stats.xp
          if (isPlayer) $playerStats.kills++
        }
      }
    }
  }
}
