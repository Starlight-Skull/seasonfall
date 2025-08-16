import type Entity from '../classes/Entity'
import Tile from '../classes/Tile'
import Hero from '../classes/Entity/Hero'

export const player = new Hero()

export const world = {
  name: '',
  properties: {
    rootX: 0,
    rootY: 0,
    borderX: 0,
    borderY: 0,
    borderW: 1,
    borderH: 1
  },
  foreground: new Array<Array<Tile | undefined>>(),
  background: new Array<Array<Tile | undefined>>(),
  entities: new Array<Entity>()
}
