import missing_entity from '../../textures/entity/missing_entity.png'
import hero from '../../textures/entity/hero.png'
import skeleton from '../../textures/entity/skeleton.png'
import stick from '../../textures/entity/stick.png'
import door from '../../textures/tileEntity/door.png'
import rain from '../../textures/environment/rain.png'
import snow from '../../textures/environment/snow.png'
import missing_tile from '../../textures/tile/missing_tile.png'
import beam from '../../textures/tile/beam.png'
import brick from '../../textures/tile/brick.png'
import brick_wall from '../../textures/tile/brick_wall.png'
import dirt from '../../textures/tile/dirt.png'
import dirt_wall from '../../textures/tile/dirt_wall.png'
import grass from '../../textures/tile/grass.png'
import painting from '../../textures/tile/painting.png'
import plank from '../../textures/tile/plank.png'


export const textures: Record<string, string> = {
  missing_entity, hero, skeleton, stick, door, rain, snow, missing_tile, beam, brick, brick_wall, dirt, dirt_wall, grass, painting, plank
}

const imageCache: Record<string, HTMLImageElement> = {}

/**
 * Finds the image from the given path.
 * @param path - The path to find the image from.
 * @returns The image at the given path.
 */
export function loadImage (path: string): HTMLImageElement {
  if (imageCache[path]) {
    return imageCache[path]
  }
  const image = new Image()
  image.src = path ?? textures.missing_tile
  imageCache[path] = image
  return image
}
