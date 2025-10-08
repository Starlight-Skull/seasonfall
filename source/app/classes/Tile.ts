import Animatable from './Animatable'

interface Options {
  collision?: Collision
  rotation?: number
  width?: number
  height?: number
  mirrored?: boolean
}

/**
 * @enum values all, top, none
 */
export enum Collision {
  all = 'all',
  top = 'top',
  none = 'none'
}

export default class Tile extends Animatable {
  collision: Collision
  rotation: number
  activator: boolean

  constructor(name?: string, options?: Options) {
    const {
      collision = Collision.all,
      rotation = 0,
      width,
      height,
      mirrored
    } = options ?? {}
    super(name, { width, height, mirrored })
    this.collision = collision
    this.rotation = rotation
    this.activator = false
  }

  activate(): void {}

  toString(background = false): string {
    let name = this.name
    if (this.mirrored) name += ':m'
    if (this.rotation !== 0) name += `:r-${this.rotation}`
    if (!background && this.collision !== Collision.all)
      name += `:c-${this.collision.toString()}`
    return name
  }

  static parse(tile: string, background = false): [string, Options] {
    const options: Options = {}
    const split = tile.split(':')
    if (split.includes('m')) options.mirrored = true
    if (split.includes('r-90')) options.rotation = 90
    if (split.includes('r-180')) options.rotation = 180
    if (split.includes('r-270')) options.rotation = 270
    if (background === false) {
      if (split.includes('c-all')) options.collision = Collision.all
      if (split.includes('c-top')) options.collision = Collision.top
      if (split.includes('c-none')) options.collision = Collision.none
    } else options.collision = Collision.none
    return [split[0], options]
  }
}
