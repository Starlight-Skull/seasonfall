import Entity from "../classes/Entity"
import Hero from "../classes/Entity/Hero"
import Skeleton from "../classes/Entity/Skeleton"
import Tile, { Collision } from "../classes/Tile"
import Door from "../classes/Tile/Door"
import { $world, $player } from "../globals/level"
import { $game } from '../globals/game'
import { isNotEmpty } from "../helpers"

interface WorldFile {
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
export default function  loadWorld(json: WorldFile, name: string): void {
  if ($world.name === name) return
  $world.name = name
  $world.properties = json.properties
  $game.focusX = $world.properties.rootX
  $game.focusY = $world.properties.rootY
  $player.x = $world.properties.rootX
  $player.y = $world.properties.rootY
  for (let y = 0; y < json.background.length; y++) {
    $world.background[y] = []
    for (let x = 0; x < json.background[y].length; x++) {
      const background = json.background?.[y]?.[x]
      if (isNotEmpty(background)) {
        $world.background[y][x] = toTile(background, true)
      }
    }
  }
  for (let y = 0; y < json.foreground.length; y++) {
    $world.foreground[y] = []
    for (let x = 0; x < json.foreground[y].length; x++) {
      const foreground = json.foreground?.[y]?.[x]
      if (isNotEmpty(foreground)) {
        $world.foreground[y][x] = toTile(foreground)
      }
    }
  }
  json.entities.forEach(entity => {
    $world.entities.push(toEntity(entity.class, entity.x, entity.y))
  })

}

/**
 * Convert a string to a Tile object.
 * @param tile - Example: 'brick:m:r-90:c-none' will have { mirrored: true, rotation: 90, collision: Collision.none }
 * @param background - if true, tile will have Collision.none
 */
function toTile(tile: string, background = false): Tile | undefined {
  const [name, options] = Tile.parse(tile, background)
  switch (name) {
    case 'door':
      return new Door(true, options)
    case 'painting':
      const painting = new Tile(name, { collision: Collision.none, height: 2 })
      painting.animation.height = 32
      return painting
    case 'link':
      return undefined
    default:
      return new Tile(name, options)
  }
}

/**
 * Convert a string to an Entity object.
 */
function toEntity(entity: string, x: number, y: number): Entity {
  switch (entity) {
    case 'skeleton':
      return new Skeleton(x, y)
    case 'hero':
      return new Hero('Hero', x, y)
    default:
      return new Entity(x, y)
  }
}
