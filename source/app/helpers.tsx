import type { NewEntity, Tile } from './classes'
import { level, player, settings, world } from './globals'
import { openDebugMenu, openPauseMenu } from './menu'

/**
 * Shorthand for document.getElementById().
 * @param id - The ID of the element to locate.
 * @returns The matching element.
 */
export function element (id: string): HTMLElement | null {
  return document.getElementById(id)
}

/**
 * Shorthand for document.getElementById(). Cast to HTMLInputElement.
 * @param id - The ID of the element to locate.
 * @returns The matching element.
 */
export function inputElement (id: string): HTMLInputElement | null {
  return document.getElementById(id) as HTMLInputElement
}

/**
 * Function to download data to a file
 * @param data
 * @param filename
 * @param type
 */
export function download (data: any, filename: string, type: string): void {
  let file = new Blob([data], { type })
  let a = document.createElement('a')
  let url = URL.createObjectURL(file)
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, 0)
}

/**
 * Closes the window
 */
export function quit (): void {
  window.close()
}

/**
 * Returns data for the given key from localStorage.
 * @param key - The name of requested key.
 * @returns The requested data or .
 */
export function fromStorage (key: string): any {
  return JSON.parse(localStorage.getItem(key) ?? '{}')
}

/**
 * Saves a given key-value pair to localStorage.
 * @param key - The name of the key to store the value as.
 * @param value - The value to store. If this is null or undefined, the record will be erased.
 */
export function toStorage (key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * Receives the code of a mouse or key event and acts accordingly.
 * @param key - Can be 'KeyboardEvent.code' or 'Mouse + MouseEvent.button'.
 * @param down - Boolean of whether the event is up or down.
 */
export function handleMouseKeyEvent (key: string, down: boolean): void {
  switch (key) {
    case settings.keybindings.attack:
      if (!world.paused) player.movement.attack = down
      break
    case settings.keybindings.down:
      if (!world.paused) player.movement.down = down
      break
    case settings.keybindings.left:
      if (!world.paused) player.movement.left = down
      break
    case settings.keybindings.right:
      if (!world.paused) player.movement.right = down
      break
    case settings.keybindings.jump:
      if (!world.paused) player.movement.jump = down
      break
    case settings.keybindings.use:
      if (!world.paused) player.movement.use = down
      break
    case 'Backquote':
      if (down) openDebugMenu()
      break
    case 'Escape':
      if (down) openPauseMenu()
      break
  }
}

/**
 * Converts a Unix timestamp with a given timezone into a simple h:mm number format.
 * @param timestamp - Unix timestamp in seconds.
 * @param timezone - Timezone difference from UTC in seconds.
 * @returns The given time as h:mm. (Example: 1300 for 1 PM)
 */
export function formatUnixTime (timestamp: number, timezone: number): number {
  const date = new Date((timestamp + timezone) * 1000)
  return date.getUTCHours() * 100 + date.getUTCMinutes()
}

/**
 * Checks if the given entity is within the world border and moves it back if needed.
 * @param entity - The entity to check.
 */
export function borderControl (entity: NewEntity): void {
  if (!entity.collision.enabled) return
  if (entity.x + entity.width > level.properties.borderW) entity.x = level.properties.borderW
  if (entity.x < level.properties.borderX) entity.x = level.properties.borderX
  if (entity.y + entity.height > level.properties.borderH) entity.y = level.properties.borderH
  if (entity.y < level.properties.borderY) entity.y = level.properties.borderY
}

export function hasCollision (entity: NewEntity, x: number, y: number, w: number, h: number): boolean {
  return (
    entity.x < x + w &&
    entity.x + entity.width > x &&
    entity.y < y + h &&
    entity.y + entity.height > y &&
    entity.collision.enabled
  )
}

export function collision (entity: NewEntity, x: number, y: number, w: number, h: number): boolean {
  if (entity.collision.enabled) {
    const values = {
      up: entity.collision.up,
      down: entity.collision.down,
      left: entity.collision.left,
      right: entity.collision.right
    }
    if (!entity.collision.up) {
      entity.collision.up =
        entity.x < x + w &&
        entity.x + entity.width > x &&
        entity.y < y &&
        entity.y + entity.height >= y
        // object.hasCollision !== 2
      if (entity.collision.up && (entity.y + entity.height - y <= 30)) {
        entity.y = y - entity.height
      }
    }
    if (!entity.collision.down) {
      entity.collision.down =
        entity.x < x + w &&
        entity.x + entity.width > x &&
        entity.y <= y + h &&
        entity.y > y &&
        entity.y + entity.height > y + h
      // if (object.hasCollision === 2 && entity.controls.down) {
      //   entity.collision.down = false
      // } else if (entity.collision.down && (y + h - entity.y <= 30) && object.constructor.name === 'Tile') {
      //   entity.y = object.y + object.height
      // }
    }
    if (!entity.collision.left) {
      entity.collision.left =
        entity.x <= x + w &&
        entity.x + entity.width > x + w &&
        entity.y < y + h &&
        entity.y + entity.height > y
        // object.hasCollision !== 2
      if (entity.collision.left && (x + w - entity.x <= 20)) {
        entity.x = x + w
      }
    }
    if (!entity.collision.right) {
      entity.collision.right =
        entity.x < x &&
        entity.x + entity.width >= x &&
        entity.y < y + h &&
        entity.y + entity.height > y
        // object.hasCollision !== 2
      if (entity.collision.right && (entity.x + entity.width - x <= 20)) {
        entity.x = x - entity.width
      }
    }
    if (
      entity.collision.left && entity.collision.right &&
      entity.x <= x &&
      entity.x + entity.width >= x + w
      // !isAttack
    ) {
      entity.collision.left = false
      entity.collision.right = false
    }
    if (
      ((!values.up && entity.collision.up) || (!values.down && entity.collision.down) || (!values.left && entity.collision.left) || (!values.right && entity.collision.right)) &&
      ((entity.constructor.name !== 'Tile'))
    ) {
      return true
    } else return false
  } else return false
}
