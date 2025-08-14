import initAssets from './app/data/assets'
import { initData } from './app/data/data'
import { weather } from './app/globals/weather'
import { formatUnixTime } from './app/helpers'
import initUI from './ui/Root'

import worldJson from './worlds/tower.world.json'


window.oncontextmenu = () => { return false }
window.addEventListener('load', initUI)

initAssets(worldJson, 'Tower')
initData()

//* temporary debug stuff *//
weather.time = formatUnixTime(Date.now() / 1000, 2 * 60 * 60)
