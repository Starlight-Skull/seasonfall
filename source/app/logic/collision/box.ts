import Entity from '../../classes/Entity'

export function boxToBoxCollision(
  x: number, y: number, w: number, h: number,
  x2: number, y2: number, w2: number, h2: number
): boolean {
  return x < x2 + w2 && x + w > x2 && y < y2 + h2 && y + h > y2
}

export function entityToBoxCollision(
  entity: Entity,
  x: number, y: number, w: number, h: number
): boolean {
  return (
    boxToBoxCollision(
      entity.x,
      entity.y,
      entity.width,
      entity.height,
      x, y, w, h
    ) && entity.collision.enabled
  )
}

export function entityToEntityCollision(
  entity1: Entity,
  entity2: Entity
): boolean {
  return (
    entityToBoxCollision(
      entity1,
      entity2.x,
      entity2.y,
      entity2.width,
      entity2.height
    ) && entity2.collision.enabled
  )
}
