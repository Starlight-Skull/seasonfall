import { playerStats, world } from './globals'

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
