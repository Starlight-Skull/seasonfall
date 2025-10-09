import loadWorld, { $worlds } from './app/data/world'
import { initData } from './app/data/data'
import { $weather } from './app/globals/weather'
import { formatUnixTime } from './app/helpers'
import { $game } from './app/globals/game'
import initUI from './ui/Root'
import { $editor } from './app/globals/editor'
import { $player, $world } from './app/globals/world'
import { $settings } from './app/globals/settings'

const exposedGlobals = {
  get $settings() { return $settings },
  get $game() { return $game },
  get $editor() { return $editor },
  get $world() { return $world },
  get $player() { return $player },
  get $weather() { return $weather },
}

window.oncontextmenu = () => { return false }
window.addEventListener('load', initUI)

loadWorld(Object.keys($worlds)[0])
initData()

//* temporary debug stuff *//
Object.defineProperty(window, 'g', { value: exposedGlobals, writable: false })
$weather.time = formatUnixTime(Date.now() / 1000, 2 * 60 * 60)
// $game.showLiveDebug = true
// $game.bootView = 2
