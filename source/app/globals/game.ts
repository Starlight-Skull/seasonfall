import { $settings } from './settings'

export const VERSION = '2.0.0-beta'
export const PIXELS_PER_TILE = 16

/**
 * Game settings at runtime.
 */
export const $game = {
  fps: 0,
  frames: 0,
  focusX: 0,
  focusY: 0,
  paused: false,
  showBoxes: false,
  showLiveDebug: false,
  showPlayerStats: false,
  debug: '',
  get grid() {
    // !!! scale must be a positive number or everything breaks => (x / 0 == Infinity) !!!
    if ($settings.scale === null || $settings.scale === undefined || $settings.scale <= 0 || typeof $settings.scale !== 'number') $settings.scale = 5
    return $settings.scale * PIXELS_PER_TILE
  }
}
