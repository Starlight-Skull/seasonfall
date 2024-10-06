import { Entity } from "../classes/Entity"
import { Hero } from "../classes/Entity/Hero"
import { Skeleton } from "../classes/Entity/Skeleton"
import { Tile, Collision } from "../classes/Tile"
import { Door } from "../classes/Tile/Door"
import { level, world, player } from "../globals"
import { isNotEmpty } from "../helpers"


export interface World {
  $schema: string
  properties: {
    rootX: number
    rootY: number
    borderX: number
    borderY: number
    borderW: number
    borderH: number
  }
  entities: Array<{
    class: string
    x: number
    y: number
  }>
  foreground: string[][]
  background: string[][]
}

/**
 * Parses data in the world file into Tile objects.
 * @param json - World data file.
 */
export function initAssets(json: World): void {
  level.properties = json.properties
  world.focusX = level.properties.rootX
  world.focusY = level.properties.rootY
  player.x = level.properties.rootX
  player.y = level.properties.rootY
  for (let y = 0; y < json.background.length; y++) {
    level.background[y] = []
    for (let x = 0; x < json.background[y].length; x++) {
      const background = json.background?.[y]?.[x]
      if (isNotEmpty(background)) {
        level.background[y][x] = toTile(background, true)
      }
    }
  }
  for (let y = 0; y < json.foreground.length; y++) {
    level.foreground[y] = []
    for (let x = 0; x < json.foreground[y].length; x++) {
      const foreground = json.foreground?.[y]?.[x]
      if (isNotEmpty(foreground)) {
        level.foreground[y][x] = toTile(foreground)
      }
    }
  }
  json.entities.forEach(entity => {
    level.entities.push(toEntity(entity.class, entity.x, entity.y))
  })

}

/**
 * Convert a string to a Tile object.
 * @param tile - Example: 'brick:m:r-90:c-none' will have { mirrored: true, rotation: 90, collision: Collision.none }
 * @param background - if true, tile will have Collision.none
 */
export function toTile(tile: string, background = false): Tile | undefined {
  const options: any = {}
  const split = tile.split(':')
  options.name = split[0]
  if (split.includes('m')) options.mirrored = true
  if (split.includes('r-90')) options.rotation = 90
  if (split.includes('r-180')) options.rotation = 180
  if (split.includes('r-270')) options.rotation = 270
  if (split.includes('c-all')) options.collision = Collision.all
  if (split.includes('c-top')) options.collision = Collision.top
  if (split.includes('c-none')) options.collision = Collision.none
  if (background) options.collision = Collision.none
  switch (split[0]) {
    case 'door':
      return new Door(true, options)
    case 'painting':
      const painting = new Tile(split[0], { collision: Collision.none, height: 2 })
      painting.animation.height = 32
      return painting
    case 'link':
      return undefined
    default:
      return new Tile(split[0], options)
  }
}

/**
 * Convert a string to an Entity object.
 */
export function toEntity(entity: string, x: number, y: number): Entity {
  switch (entity) {
    case 'skeleton':
      return new Skeleton(x, y)
    case 'hero':
      return new Hero('Hero', x, y)
    default:
      return new Entity(x, y)
  }
}
