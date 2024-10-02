import missingEntity from '../textures/entity/missing_entity.png'
import hero from '../textures/entity/hero.png'
import skeleton from '../textures/entity/skeleton.png'
import stick from '../textures/entity/stick.png'
import door from '../textures/tileEntity/door.png'
import rain from '../textures/environment/rain.png'
import snow from '../textures/environment/snow.png'
import missingTile from '../textures/tile/missing_tile.png'
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
import { Collision, NewTile, type NewTileOptions } from './classes'

interface Textures {
  entity: any
  tileEntity: any
  environment: any
  tile: any
}

export const textures: Textures = Object.freeze({
  entity: {
    missing_entity: missingEntity,
    hero,
    skeleton,
    stick
  },
  tileEntity: {
    door
  },
  environment: {
    rain,
    snow
  },
  tile: {
    missing_tile: missingTile,
    beam,
    brick,
    brick_wall,
    dirt,
    dirt_wall,
    grass,
    painting,
    plank
  }
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

/**
 * Parses data in the world file into Tile objects.
 * @param json - World data file.
 */
export function initAssets (json: any): void {
  for (let y = 0; y < json.background.length; y++) {
    level.background[y] = []
    level.foreground[y] = []
    for (let x = 0; x < json.foreground[y].length; x++) {
      const background: string = json.background?.[y]?.[x]
      const foreground: string = json.foreground?.[y]?.[x]
      if (isNotEmpty(background)) {
        level.background[y][x] = toTile(background, true)
      }
      if (isNotEmpty(foreground)) {
        level.foreground[y][x] = toTile(foreground)
      }
    }
  }
  level.properties = json.properties
  world.focusX = level.properties.rootX
  world.focusY = level.properties.rootY
  player.x = level.properties.rootX
  player.y = level.properties.rootY
}

/**
 * Convert a string to Tile object
 * @param tile - Example: 'brick:m:r-90:c-none' will have { mirrored: true, rotation: 90, collision: Collision.none }
 * @param background - if true, tile will have Collision.none
 */
export function toTile (tile: string, background = false): NewTile {
  const options: NewTileOptions = {}
  const split = tile.split(':')
  if (split.includes('m')) options.mirrored = true
  if (split.includes('r-90')) options.rotation = 90
  if (split.includes('r-180')) options.rotation = 180
  if (split.includes('r-270')) options.rotation = 270
  if (split.includes('h-2')) options.height = 2
  if (split.includes('c-all')) options.collision = Collision.all
  if (split.includes('c-top')) options.collision = Collision.top
  if (split.includes('c-none')) options.collision = Collision.none
  if (background) options.collision = Collision.none
  return new NewTile(loadImage(textures.tile[split[0]]), options)
}
