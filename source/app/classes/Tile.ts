import Animatable from "./Animatable"

interface Options {
  collision?: Collision
  rotation?: number
  width?: number
  height?: number
  mirrored?: boolean
}

/**
 * @enum values all, top, partial, none
 */
export enum Collision { all = 'all', top = 'top', partial = 'part', none = 'none' }

export default class Tile extends Animatable {
  collision: Collision
  rotation: number
  activator: boolean

  constructor (name: string, options?: Options) {
    const { collision = Collision.all, rotation = 0, width, height, mirrored } = options ?? {}
    super(name, { width, height, mirrored })
    this.collision = collision
    this.rotation = rotation
    this.activator = false
  }

  activate (): void {}
}
