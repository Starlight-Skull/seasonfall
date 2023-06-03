import missingEntity from '../textures/entity/missing_entity.png'
import hero from '../textures/entity/hero.png'
import skeleton from '../textures/entity/skeleton.png'
// import stick from '../textures/entity/stick.png'
// import kain from '../textures/entity/kain.png'
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

import { Assets } from 'pixi.js'

export const textures = Object.freeze({
  entity: {
    missing_entity: missingEntity,
    hero,
    skeleton
    // stick,
    // kain
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

export function addAssets (): void {
  Assets.add('missingEntity', missingEntity)
  Assets.add('hero', hero)
  Assets.add('skeleton', skeleton)
  // Assets.add('stick', stick)
  // Assets.add('kain', kain)
  Assets.add('door', door)
  Assets.add('rain', rain)
  Assets.add('snow', snow)
  Assets.add('missingTile', missingTile)
  Assets.add('beam', beam)
  Assets.add('brick', brick)
  Assets.add('brick_wall', brick_wall)
  Assets.add('dirt', dirt)
  Assets.add('dirt_wall', dirt_wall)
  Assets.add('grass', grass)
  Assets.add('painting', painting)
  Assets.add('plank', plank)
}
