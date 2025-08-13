import { weather, world } from '../globals'

/**
 * Constants for the color and shade of the sky.
 */
const sky = Object.freeze({
  morning: { shade: 0.2, color: 'rgb(207,113,175)' },
  beforeNoon: { shade: 0.1, color: 'rgb(135,206,235)' },
  noon: { shade: 0, color: 'rgb(178, 255, 255)' },
  afterNoon: { shade: 0.1, color: 'rgb(140,190,214)' },
  evening: { shade: 0.5, color: 'rgb(0,73,83)' },
  night: { shade: 0.7, color: 'rgb(25,25,112)' }
})

/**
 * Draws the background depending on the time
 */
export function drawSky(ctx: CanvasRenderingContext2D): void {
  let timeSet
  switch (true) {
    case (weather.time >= weather.sunrise - 50 && weather.time <= weather.sunrise + 50):
      timeSet = sky.morning
      break
    case (weather.time > weather.sunrise + 50 && weather.time < 1150):
      timeSet = sky.beforeNoon
      break
    case (weather.time >= 1150 && weather.time <= 1250):
      timeSet = sky.noon
      break
    case (weather.time > 1250 && weather.time < weather.sunset - 50):
      timeSet = sky.afterNoon
      break
    case (weather.time >= weather.sunset - 50 && weather.time <= weather.sunset + 50):
      timeSet = sky.evening
      break
    default:
      timeSet = sky.night
      break
  }
  world.shade = timeSet.shade
  ctx.fillStyle = timeSet.color
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
}
