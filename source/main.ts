import loadWorld from './app/data/world'
import { initData } from './app/data/data'
import { $weather } from './app/globals/weather'
import { formatUnixTime } from './app/helpers'
import { $game } from './app/globals/game'
import initUI from './ui/Root'

import worldFile from './worlds/tower.world.json'


window.oncontextmenu = () => { return false }
window.addEventListener('load', initUI)

loadWorld(worldFile, 'Tower')
initData()

//* temporary debug stuff *//
$weather.time = formatUnixTime(Date.now() / 1000, 2 * 60 * 60)
// $game.showLiveDebug = true
// $game.bootView = 1
