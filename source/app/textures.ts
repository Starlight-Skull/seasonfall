import missing_entity from '../textures/entity/missing_entity.png'
import hero from '../textures/entity/hero.png'
import skeleton from '../textures/entity/skeleton.png'
import stick from '../textures/entity/stick.png'
import door from '../textures/tileEntity/door.png'
import rain from '../textures/environment/rain.png'
import snow from '../textures/environment/snow.png'
import missing_tile from '../textures/tile/missing_tile.png'
import beam from '../textures/tile/beam.png'
import brick from '../textures/tile/brick.png'
import brick_wall from '../textures/tile/brick_wall.png'
import dirt from '../textures/tile/dirt.png'
import dirt_wall from '../textures/tile/dirt_wall.png'
import grass from '../textures/tile/grass.png'
import painting from '../textures/tile/painting.png'
import plank from '../textures/tile/plank.png'
import { level, player, world } from './globals'
import { isNotEmpty } from './helpers'
import { Collision, Entity, Tile } from './classes'
import { Door, Hero, Skeleton } from './classesExtended'

export const textures: Record<string, Record<string, string>> = Object.freeze({
  entity: { missing_entity, hero, skeleton, stick },
  tileEntity: { door },
  environment: { rain, snow },
  tile: { missing_tile, beam, brick, brick_wall, dirt, dirt_wall, grass, painting, plank }
})

/**
 * Finds the image from the given path.
 * @param path - The path to find the image from. If an array is passed a random path will be used.
 * @returns The image at the given path.
 */
export function loadImage (path: string): HTMLImageElement {
  const image = new Image()
  if (Array.isArray(path)) path = path[Math.round(Math.random()) * (path.length - 1)]
  image.src = path ?? textures.tile.missing_tile
  return image
}

interface World {
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
export function initAssets (json: World): void {
  level.properties = json.properties
  world.focusX = level.properties.rootX
  world.focusY = level.properties.rootY
  player.x = level.properties.rootX
  player.y = level.properties.rootY
  for (let y = 0; y < json.background.length; y++) {
    level.background[y] = []
    for (let x = 0; x < json.background[y].length; x++) {
      const background: string = json.background?.[y]?.[x]
      if (isNotEmpty(background)) {
        level.background[y][x] = toTile(background, true)
      }
    }
  }
  for (let y = 0; y < json.foreground.length; y++) {
    level.foreground[y] = []
    for (let x = 0; x < json.foreground[y].length; x++) {
      const foreground: string = json.foreground?.[y]?.[x]
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
export function toTile (tile: string, background = false): Tile | undefined {
  const options: any = {}
  const split = tile.split(':')
  options.name = split[0]
  if (split.includes('m')) options.mirrored = true
  if (split.includes('r-90')) options.rotation = 90
  if (split.includes('r-180')) options.rotation = 180
  if (split.includes('r-270')) options.rotation = 270
  if (split.includes('h-2')) options.height = 2
  if (split.includes('c-all')) options.collision = Collision.all
  if (split.includes('c-top')) options.collision = Collision.top
  if (split.includes('c-none')) options.collision = Collision.none
  if (background) options.collision = Collision.none
  switch (split[0]) {
    case 'door':
      return new Door(true, options)
    case 'link':
      return undefined
    default:
      return new Tile(loadImage(textures.tile[split[0]]), options)
  }
}

/**
 * Convert a string to an Entity object.
 */
export function toEntity (entity: string, x: number, y: number): Entity {
  switch (entity) {
    case 'skeleton':
      return new Skeleton(x, y)
    case 'hero':
      return new Hero('Hero', x, y)
    default:
      return new Entity(x, y, loadImage(textures.entity.missing_entity))
  }
}
