import { settings } from './settings';

export const PIXELS_PER_TILE = 16

export const world = {
  fps: 0,
  frames: 0,
  focusX: 0,
  focusY: 0,
  shade: 0,
  paused: true,
  showBoxes: false,
  showLiveDebug: false,
  showPlayerStats: false,
  debug: '',
  get grid() {
    // !!! scale must be a positive number or everything breaks => (x / 0 == Infinity) !!!
    if (settings.scale === null || settings.scale === undefined || settings.scale <= 0 || typeof settings.scale !== 'number') settings.scale = 5
    return settings.scale * PIXELS_PER_TILE
  }
}
