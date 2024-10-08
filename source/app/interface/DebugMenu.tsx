import React, { Component } from "react"
import { player, UIState, world } from "../globals";


/**
 * Toggles the visibility of the debug menu and handles the associated data.
 */
export function openDebugMenu (): void {
  UIState.debugMenuVisible = !UIState.debugMenuVisible
  if (UIState.debugMenuVisible) {
    // for (const weatherKey in weather) {
    //   ;(element(weatherKey) as HTMLInputElement).value = weather[weatherKey].toString()
    // }
  } else {
    // general
    // world.showBoxes = inputElement('showBoxes')?.checked ?? false
    // world.showLiveDebug = inputElement('showLiveDebug')?.checked ?? false
    // world.showPlayerStats = inputElement('showPlayerStats')?.checked ?? false
    // player
    // player.stats.hp = parseFloat(inputElement('hp')?.value ?? '0')
    // player.stats.maxHP = parseFloat(inputElement('maxHp')?.value ?? '0')
    // player.stats.mp = parseFloat(inputElement('mp')?.value ?? '0')
    // player.stats.maxMP = parseFloat(inputElement('maxMp')?.value ?? '0')
    // player.stats.xp = parseFloat(inputElement('xp')?.value ?? '0')
    // player.stats.damage = parseFloat(inputElement('damage')?.value ?? '0')
    // player.stats.speed = parseFloat(inputElement('speed')?.value ?? '0')
    // player.stats.jumpHeight = parseFloat(inputElement('maxAir')?.value ?? '0')
    // player.x = parseFloat(inputElement('x')?.value ?? '0')
    // player.y = parseFloat(inputElement('y')?.value ?? '0')
    // player.collision.enabled = inputElement('hasCollision')?.checked ?? true
    // weather
    // for (const weatherKey in weather) {
    //   const el = (element(weatherKey) as HTMLInputElement).value
    //   if (!isNaN(parseFloat(el))) {
    //     weather[weatherKey] = parseFloat(el)
    //   } else {
    //     weather[weatherKey] = el
    //   }
    // }
  }
}

export default class DebugMenu extends Component {
  render() {
    return (
      <div id="debugMenu">
      <section>
        <h3>General</h3>
        <div>
          <label htmlFor="showBoxes">Show Hit Boxes</label>
          <input onInput={(e) => world.showBoxes = (e.target as HTMLInputElement).checked} value={world.showBoxes.toString()} type="checkbox" id="showBoxes" />
        </div>
        <div>
          <label htmlFor="showLiveDebug">Show Live Debug</label>
          <input onInput={(e) => world.showLiveDebug = (e.target as HTMLInputElement).checked} value={world.showLiveDebug.toString()} type="checkbox" id="showLiveDebug" />
        </div>
        <div>
          <label htmlFor="showPlayerStats">Show Player Stats</label>
          <input onInput={(e) => world.showPlayerStats = (e.target as HTMLInputElement).checked} value={world.showPlayerStats.toString()} type="checkbox" id="showPlayerStats" />
        </div>
        <br />
        <h3>Player</h3>
        <div>
          <label htmlFor="hp">HP</label>
          <input onInput={(e) => player.stats.hp = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={player.stats.hp} type="number" id="hp" min="0" />
        </div>
        <div>
          <label htmlFor="maxHp">Max HP</label>
          <input onInput={(e) => player.stats.maxHP = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={player.stats.maxHP} type="number" id="maxHp" min="1" />
        </div>
        <div>
          <label htmlFor="mp">MP</label>
          <input onInput={(e) => player.stats.mp = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={player.stats.mp} type="number" id="mp" min="0" />
        </div>
        <div>
          <label htmlFor="maxMp">Max MP</label>
          <input onInput={(e) => player.stats.maxMP = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={player.stats.maxMP} type="number" id="maxMp" min="0" />
        </div>
        <div>
          <label htmlFor="xp">XP</label>
          <input onInput={(e) => player.stats.xp = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={player.stats.xp} type="number" id="xp" min="0" />
        </div>
        <div>
          <label htmlFor="damage">Damage</label>
          <input onInput={(e) => player.stats.damage = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={player.stats.damage} type="number" id="damage" min="0" />
        </div>
        <div>
          <label htmlFor="speed">Speed</label>
          <input onInput={(e) => player.stats.speed = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={player.stats.speed} type="number" id="speed" min="0" />
        </div>
        <div>
          <label htmlFor="maxAir">Jump Height</label>
          <input onInput={(e) => player.stats.jumpHeight = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={player.stats.jumpHeight} type="number" id="maxAir" min="0" />
        </div>
        <div>
          <label htmlFor="x">x</label>
          <input onInput={(e) => player.x = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={player.x} type="number" id="x" min="0" />
        </div>
        <div>
          <label htmlFor="y">y</label>
          <input onInput={(e) => player.y = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={player.y} type="number" id="y" min="0" />
        </div>
        <div>
          <label htmlFor="hasCollision">Collision</label>
          <input value={player.collision.enabled.toString()} type="checkbox" id="hasCollision" />
        </div>
      </section>
      <section>
        <h3>Weather</h3>
        <div>
          <label htmlFor="main">Name</label>
          <select name="main" id="main">
            <option value="Thunderstorm">Thunderstorm</option>
            <option value="Drizzle">Drizzle</option>
            <option value="Rain">Rain</option>
            <option value="Snow">Snow</option>
            <option value="Mist">Mist</option>
            <option value="Smoke">Smoke</option>
            <option value="Haze">Haze</option>
            <option value="Dust">Dust</option>
            <option value="Fog">Fog</option>
            <option value="Sand">Sand</option>
            <option value="Ash">Ash</option>
            <option value="Squall">Squall</option>
            <option value="Tornado">Tornado</option>
            <option value="Clear">Clear</option>
            <option value="Clouds">Clouds</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" />
        </div>
        <div>
          <label htmlFor="time">Timestamp (hmm)</label>
          <input type="number" id="time" min="0" />
        </div>
        <div>
          <label htmlFor="sunrise">Sunrise (hmm)</label>
          <input type="number" id="sunrise" min="0" />
        </div>
        <div>
          <label htmlFor="sunset">Sunset (hmm)</label>
          <input type="number" id="sunset" min="0" />
        </div>
        <div>
          <label htmlFor="temp">Temperature (&deg;C)</label>
          <input type="number" id="temp" step="0.01" />
        </div>
        <div>
          <label htmlFor="tempFeelsLike">Feels Like (&deg;C)</label>
          <input type="number" id="tempFeelsLike" step="0.01" />
        </div>
        <div>
          <label htmlFor="pressure">Pressure (hPa)</label>
          <input type="number" id="pressure" min="0" />
        </div>
        <div>
          <label htmlFor="humidity">Humidity (%)</label>
          <input type="number" id="humidity" min="0" />
        </div>
        <div>
          <label htmlFor="dewPoint">Dew Point (&deg;C)</label>
          <input type="number" id="dewPoint" step="0.01" />
        </div>
        <div>
          <label htmlFor="clouds">Clouds (%)</label>
          <input type="number" id="clouds" min="0" />
        </div>
        <div>
          <label htmlFor="uvi">UV Index</label>
          <input type="number" id="uvi" step="0.01" />
        </div>
        <div>
          <label htmlFor="visibility">Visibility (m)</label>
          <input type="number" id="visibility" min="0" />
        </div>
        <div>
          <label htmlFor="windSpeed">Wind Speed (m/s)</label>
          <input type="number" id="windSpeed" step="0.01" min="0" />
        </div>
        <div>
          <label htmlFor="windDeg">Wind Degrees</label>
          <select id="windDeg" name="windDeg">
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </div>
        <div>
          <label htmlFor="windGust">Wind Gust (m/s)</label>
          <input type="number" id="windGust" step="0.01" min="0" />
        </div>
        <div>
          <label htmlFor="rain">Rain (mm/h)</label>
          <input type="number" id="rain" step="0.01" min="0" />
        </div>
        <div>
          <label htmlFor="snow">Snow (mm/h)</label>
          <input type="number" id="snow" step="0.01" min="0" />
        </div>
      </section>
    </div>
    )
  }

  style: React.CSSProperties = {}
}
