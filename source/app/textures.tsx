import missingEntity from '../textures/entity/missing_entity.png'
import hero from '../textures/entity/hero.png'
import skeleton from '../textures/entity/skeleton.png'
import stick from '../textures/entity/stick.png'
import kain from '../textures/entity/kain.png'
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

export const textures = Object.freeze({
  entity: {
    missing_entity: missingEntity,
    hero,
    skeleton,
    stick,
    kain
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
