import loadWorld, { $worlds } from './app/data/world'
import { initData } from './app/data/data'
import { $weather } from './app/globals/weather'
import { formatUnixTime } from './app/helpers'
import { $game } from './app/globals/game'
import initUI from './ui/Root'



window.oncontextmenu = () => { return false }
window.addEventListener('load', initUI)

loadWorld($worlds['tower'], 'tower')
initData()

//* temporary debug stuff *//
$weather.time = formatUnixTime(Date.now() / 1000, 2 * 60 * 60)
// $game.showLiveDebug = true
// $game.bootView = 2
