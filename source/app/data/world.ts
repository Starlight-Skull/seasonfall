import Entity from "../classes/Entity"
import Hero from "../classes/Entity/Hero"
import Skeleton from "../classes/Entity/Skeleton"
import Tile, { Collision } from "../classes/Tile"
import Door from "../classes/Tile/Door"
import { $world, $player } from "../globals/world"
import { $game, PIXELS_PER_TILE } from '../globals/game'
import { isNotEmpty } from "../helpers"

import tower from '../../worlds/tower.world.json'
import test from '../../worlds/test.world.json'

export const $worlds: Record<string, WorldFile> = {
  tower, test
}

interface WorldFile {
  $schema: string
  properties: {
    rootX: number
    rootY: number
    borderX: number
    borderY: number
    borderW: number
    borderH: number
    solidBorder: boolean
  }
  entities: Array<{
    class: string
    x: number
    y: number
  }>
  foreground: string[][]
  background: string[][]
}

/**
 * Parses data in the world file into Tile objects.
 * @param json - World data file.
 */
export default function  loadWorld(json: WorldFile, name: string): void {
  if ($world.name === name) return
  $world.name = name
  $world.properties = json.properties
  $game.focusX = $world.properties.rootX
  $game.focusY = $world.properties.rootY
  $player.x = $world.properties.rootX
  $player.y = $world.properties.rootY
  $world.background = []
  $world.foreground = []
  $world.entities = []
  for (let y = 0; y < json.background.length; y++) {
    $world.background[y] = []
    for (let x = 0; x < json.background[y].length; x++) {
      const background = json.background?.[y]?.[x]
      if (isNotEmpty(background)) {
        $world.background[y][x] = toTile(background, true)
      }
    }
  }
  for (let y = 0; y < json.foreground.length; y++) {
    $world.foreground[y] = []
    for (let x = 0; x < json.foreground[y].length; x++) {
      const foreground = json.foreground?.[y]?.[x]
      if (isNotEmpty(foreground)) {
        $world.foreground[y][x] = toTile(foreground)
      }
    }
  }
  json.entities.forEach(entity => {
    $world.entities.push(toEntity(entity.class, entity.x, entity.y))
  })
  // $world.links.forEach(tile => {
  //   // todo make into new class
  //   const split = tile.name.split(':')
  //   if (split.length < 3) return
  //   const x = parseInt(split[1])
  //   const y = parseInt(split[2])
  //   tile.name = split[0]
  //   tile.activator = true
  //   tile.collision = Collision.none
  //   tile.activate = () => $world.foreground[y]?.[x]?.activate()
  // })
}

/**
 * Convert a string to a Tile object.
 * @param tile - Example: 'brick:m:r-90:c-none' will have { mirrored: true, rotation: 90, collision: Collision.none }
 * @param background - if true, tile will have Collision.none
 */
function toTile(tile: string, background = false): Tile | undefined {
  const [name, options] = Tile.parse(tile, background)
  switch (name) {
    case 'door':
      return new Door(true, options)
    case 'painting':
      const painting = new Tile(name, { collision: Collision.none, height: 2 })
      painting.animation.imageH = 2 * PIXELS_PER_TILE
      return painting
    case 'link':
      // const link = new Tile(tile)
      // $world.links.push(link)
      // return link
      return undefined
    case 'platform':
      return new Tile('platform', { collision: Collision.top })
    default:
      return new Tile(name, options)
  }
}

/**
 * Convert a string to an Entity object.
 */
function toEntity(entity: string, x: number, y: number): Entity {
  switch (entity) {
    case 'skeleton':
      return new Skeleton(x, y)
    case 'hero':
      return new Hero('Hero', x, y)
    default:
      return new Entity(x, y)
  }
}

/**
 * Function to download data to a file
 */
export function saveWorld(): void {
  const world: WorldFile = {
    $schema: "./_schema.json",
    properties: $world.properties,
    entities: [],
    foreground: [],
    background: []
  }
  $world.foreground.forEach((row, i) => {
    world.foreground[i] = []
    for (let j = 0; j < row.length; j++) {
      const tile = row[j]
      world.foreground[i][j] = (tile !== undefined ? tile.toString() : '')
    }
  })
  $world.background.forEach((row, i) => {
    world.background[i] = []
    for (let j = 0; j < row.length; j++) {
      const tile = row[j]
      world.background[i][j] = (tile !== undefined ? tile.toString(true) : '')
    }
  })
  // world.entities = $world.entities.map(entity => ({ class: entity.name, x: entity.x, y: entity.y }))
  download(world, $world.name)
}

function download(data: WorldFile, filename: string): void {
  const file = new Blob([JSON.stringify(data)], { type: 'json' })
  let a = document.createElement('a')
  const url = URL.createObjectURL(file)
  a.href = url
  a.download = `${filename}.world.json`
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, 0)
}
