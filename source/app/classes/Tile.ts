import { Animatable } from './Animatable'


/**
 * @enum values all, top, none
 */
export enum Collision { all, top, partial, none }

export class Tile extends Animatable {
  collision: Collision
  rotation: number
  activator: boolean

  constructor (name: string, options?: { collision?: Collision, rotation?: number, width?: number, height?: number, mirrored?: boolean }) {
    const { collision = Collision.all, rotation = 0, width, height, mirrored } = options ?? {}
    super(name, { width, height, mirrored })
    this.collision = collision
    this.rotation = rotation
    this.activator = false
  }

  activate (): void {}
}
