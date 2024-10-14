import { type Entity } from './classes/Entity'
import { player, playerStats, settings, world } from './globals'

/**
 * Shorthand for document.getElementById().
 * @param id - The ID of the element to locate.
 * @returns The matching element.
 */
export function element (id: string): HTMLElement | null {
  return document.getElementById(id)
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
  }
}

/**
 * Updates the FPS counter.
 */
export function getFrameCount (): void {
  if (!world.paused) playerStats.timeTaken++
  world.fps = world.frames
  world.frames = 0
}

/**
 * value !== '' && value !== null && value !== undefined
 */
export function isNotEmpty (value?: string): boolean {
  return value !== '' && value !== null && value !== undefined
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

export function hasCollision (entity: Entity, x: number, y: number, w: number, h: number): boolean {
  return (
    entity.x < x + w &&
    entity.x + entity.width > x &&
    entity.y < y + h &&
    entity.y + entity.height > y &&
    entity.collision.enabled
  )
}
