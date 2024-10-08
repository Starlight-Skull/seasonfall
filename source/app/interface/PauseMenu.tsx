import React, { Component } from "react"
import VersionTag from "./Components/VersionTag"
import { settings, UIState, version } from "../globals"
import { toStorage } from "../helpers"

/**
 * Toggles the visibility of the pause menu and handles the associated values.
 */
export function openPauseMenu (): void {
  UIState.pauseMenuVisible = !UIState.pauseMenuVisible
  if (UIState.pauseMenuVisible) {
    loadSettings()
  } else {
    saveSettings()
  }
}

/**
 * Saves most settings from the global settings to storage.
 */
function saveSettings (): void {
  // keybindings are saved automatically
  toStorage('settings', settings)
}

/**
 * Loads most settings from the global settings into the settings menu.
 */
function loadSettings (): void {
  // // keybindings
  // const keys = element('keybindingsContainer')
  // keys?.replaceChildren()
  // for (const key in settings.keybindings) {
  //   const div = document.createElement('div')
  //   const label = document.createElement('label')
  //   label.textContent = key
  //   div.appendChild(label)
  //   const button = document.createElement('button')
  //   button.dataset.action = 'changeKey'
  //   button.dataset.key = key
  //   button.textContent = settings.keybindings[key]
  //   div.appendChild(button)
  //   keys?.appendChild(div)
  // }
  // // statistics
  // ;(element('nameStats') as HTMLElement).innerText = `Statistics (${player.name})`
  // const stats = element('statsContainer')
  // stats?.replaceChildren()
  // for (const playerStatsKey in playerStats) {
  //   const statItem = document.createElement('p')
  //   statItem.textContent = `${playerStatsKey}: ${playerStats[playerStatsKey].toString()}`
  //   stats?.appendChild(statItem)
  // }
}

export default class PauseMenu extends Component {
  render() {
    return (
      <div id="pauseMenu">
        <section id="pause">
          <div className="menuHeader">
            <h3 id="pauseTitle">Paused</h3>
          </div>
          <div className="menuContent">
            <button data-action="continue">Continue</button>
            <button disabled data-action="save">Save</button>
            <button disabled data-menu="load">Load</button>
            <button disabled data-menu="new">New</button>
            <button data-menu="settingsGeneral">Settings</button>
            <button data-menu="stats">Statistics</button>
            <button data-action="quit">Save & Quit</button>
          </div>
          <div className="menuVersion">
            <p>{version}</p>
          </div>
        </section>
        <section id="load">
          <div className="menuHeader">
            <h3>Load Game</h3>
          </div>
          <div className="menuContent"></div>
          <div className="menuFooter">
            <button data-menu="pause">Cancel</button>
            <button data-action="load">Load</button>
          </div>
        </section>
        <section id="new">
          <div className="menuHeader">
            <h3>New Character</h3>
          </div>
          <div className="menuContent">
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Name" />
            </div>
            <div>
              <label htmlFor="model">Model</label>
              <select name="model" id="model"></select>
            </div>
          </div>
          <div className="menuFooter">
            <button data-menu="pause">Cancel</button>
            <button data-action="create">Create</button>
          </div>
        </section>
        <section id="settingsGeneral">
          <div className="menuHeader menuHeaderMulti three">
            <button className="active">General</button>
            <button data-menu="settingsApi">API</button>
            <button data-menu="settingsKeybindings">Keybindings</button>
          </div>
          <div className="menuContent">
            <div>
              <label htmlFor="showFps">Show FPS</label>
              <input onInput={(e) => settings.showFPS = (e.target as HTMLInputElement).checked} value={settings.showFPS.toString()} type="checkbox" id="showFps" />
            </div>
            <div>
              <label htmlFor="scale">World Scale</label>
              <input onInput={(e) => settings.scale = parseFloat((e.target as HTMLInputElement).value ?? 5)} value={settings.scale} type="number" id="scale" />
            </div>
          </div>
          <div className="menuFooter">
            <button data-menu="pause" data-action="saveSettings">Back</button>
          </div>
        </section>
        <section id="settingsApi">
          <div className="menuHeader menuHeaderMulti three">
            <button data-menu="settingsGeneral">General</button>
            <button className="active">API</button>
            <button data-menu="settingsKeybindings">Keybindings</button>
          </div>
          <div className="menuContent">
            <div>
              <p>
                <a href="https://openweathermap.org" target="_blank">
                  openweathermap.org
                </a>
              </p>
            </div>
            <div>
              <label htmlFor="apiKey">API Key</label>
              <input onInput={(e) => settings.api.key = (e.target as HTMLInputElement).value} value={settings.api.key} type="text" id="apiKey" />
            </div>
            <div>
              <label htmlFor="lat">Coordinates</label>
              <input onInput={(e) => settings.api.latitude = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={settings.api.latitude.toString()} type="text" title="Latitude" id="lat" placeholder="lat" />
              <input onInput={(e) => settings.api.longitude = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={settings.api.longitude.toString()} type="text" title="Longitude" id="lon" placeholder="lon" />
            </div>
            <div>
              <button data-action="navigator">Use Current Location</button>
            </div>
            <div>
              <button data-action="search">Search</button>
              <input
                type="text"
                title="Location"
                id="location"
                placeholder="Location"
              />
              <select
                data-action="selectResult"
                title="Search Results"
                name="searchResults"
                id="searchResults"
              ></select>
            </div>
            <div>
              <label htmlFor="interval">Interval (s)</label>
              <input onInput={(e) => settings.api.interval = parseInt((e.target as HTMLInputElement).value ?? 0)} value={settings.api.interval.toString()} type="number" id="interval" />
            </div>
          </div>
          <div className="menuFooter">
            <button data-menu="pause" data-action="saveSettings">Back</button>
          </div>
        </section>
        <section id="settingsKeybindings">
          <div className="menuHeader menuHeaderMulti three">
            <button data-menu="settingsGeneral">General</button>
            <button data-menu="settingsApi">API</button>
            <button className="active">Keybindings</button>
          </div>
          <div id="keybindingsContainer" className="menuContent"></div>
          <div className="menuFooter">
            <button data-menu="pause" data-action="saveSettings">Back</button>
          </div>
        </section>
        <section id="stats">
          <div className="menuHeader">
            <h3 id="nameStats">Statistics (playerName)</h3>
          </div>
          <div id="statsContainer" className="menuContent"></div>
          <div className="menuFooter">
            <button data-menu="pause">Back</button>
          </div>
        </section>
      </div>
    )
  }

  style: React.CSSProperties = {}
}
