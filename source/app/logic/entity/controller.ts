import Entity from '../../classes/Entity'
import runEntityAnimation from './animation'
import runEntityMovement from './movement'
import { runNpcAI } from './npcAI'

export default function runEntityController(entity: Entity, isPlayer = false) {
  if (entity.stats.hp <= 0) {
  } else {
    heal(entity)
    if (isPlayer === false) runNpcAI(entity)
  }

  runEntityMovement(entity)
  runEntityAnimation(entity)
}

// todo expand to tick function
// needs dt to work
function heal(entity: Entity) {
  if (entity.stats.hp < entity.stats.maxHP) {
    entity.stats.hp += 0.01
  }
  if (entity.stats.mp < entity.stats.maxMP) {
    entity.stats.mp += 0.01
  }
}
