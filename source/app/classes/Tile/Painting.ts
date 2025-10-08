import { Collision } from './../Tile'
import Tile from '../Tile'
import SpriteSet from '../SpiteSet'

export default class Painting extends Tile {
  constructor(options?: {}) {
    const painting = 'painting'
    super(painting, { height: 2, collision: Collision.none, ...options })

    this.animation = new SpriteSet(painting, { w: 16, h: 32 })
  }
}
