import { Animatable } from './Animatable'


export class Entity extends Animatable {
  x: number;
  y: number;
  cooldown: number;
  stats: { hp: number; maxHP: number; mp: number; maxMP: number; xp: number; damage: number; speed: number; jumpHeight: number; jumpTime: number; };
  movement: { attack: boolean; down: boolean; left: boolean; right: boolean; jump: boolean; use: boolean; };
  collision: { enabled: boolean; up: boolean; down: boolean; left: boolean; right: boolean; };

  constructor(x: number, y: number, name = '', options?: { maxHP?: number, maxMP?: number, xp?: number, damage?: number, speed?: number, jumpHeight?: number, width?: number, height?: number, mirrored?: boolean }) {
    const { maxHP = 50, maxMP = 0, xp = 0, damage = 10, speed = 0.1, jumpHeight = 3, width, height, mirrored } = options ?? {}
    super(name, { width, height, mirrored })
    this.x = x
    this.y = y
    this.cooldown = -1
    this.stats = {
      hp: maxHP,
      maxHP,
      mp: maxMP,
      maxMP,
      xp,
      damage,
      speed,
      jumpHeight,
      jumpTime: 0
    }
    this.movement = {
      attack: false,
      down: false,
      left: false,
      right: false,
      jump: false,
      use: false
    }
    this.collision = {
      enabled: true,
      up: false,
      down: true,
      left: false,
      right: false
    }
  }
}
