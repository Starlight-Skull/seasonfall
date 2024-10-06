import { SpriteSet } from '../SpiteSet'
import { Tile, Collision } from '../Tile'


export class Door extends Tile {
  isClosed: boolean

  constructor (isClosed = true, options?: { mirrored?: boolean }) {
    const door = 'door'
    super(door, { height: 2, ...options })
    this.animations = {
      closed: new SpriteSet(door, { animName: 'closed', w: 16, h: 32, hitboxWidth: 0.25 }),
      open: new SpriteSet(door, { animName: 'open', x: 16, w: 16, h: 32 })
    }
    this.activator = true
    this.isClosed = !isClosed
    this.activate()
  }

  activate(): void {
    if (this.isClosed) {
      this.isClosed = false
      this.animation = this.animations.open
      this.collision = Collision.none
    } else {
      this.isClosed = true
      this.animation = this.animations.closed
      this.collision = Collision.all
    }
  }
}
