import type Entity from '../classes/Entity'
import type Tile from '../classes/Tile'
import Hero from '../classes/Entity/Hero'
import Rain from '../classes/Weather/Rain'

export const $player = new Hero()

export const $world = {
  name: '',
  properties: {
    rootX: 0,
    rootY: 0,
    borderX: 0,
    borderY: 0,
    borderW: 1,
    borderH: 1,
    solidBorder: false
  },
  // links: new Array<Tile>(),
  rain: new Rain(),
  foreground: new Array<Array<Tile | undefined>>(),
  background: new Array<Array<Tile | undefined>>(),
  entities: new Array<Entity>()
}
