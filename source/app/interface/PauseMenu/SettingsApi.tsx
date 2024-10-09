import React, { Component } from "react"
import { settings } from "../../globals"
import { Menus } from "../PauseMenu"


interface Props {
  setMenu: (menu: Menus) => void
}
interface State {}

export default class SettingsApi extends Component<Props, State> {
  render() {
    return (
      <section id="settingsApi">
      <div className="menuHeader menuHeaderMulti three">
        <button onClick={() => this.props.setMenu(Menus.settingsGeneral)}     data-menu="settingsGeneral">General</button>
        <button onClick={() => this.props.setMenu(Menus.settingsApi)}         className="active">API</button>
        <button onClick={() => this.props.setMenu(Menus.settingsKeybindings)} data-menu="settingsKeybindings">Keybindings</button>
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
          <input onInput={(e) => settings.api.latitude = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={settings.api.latitude} type="text" title="Latitude" id="lat" placeholder="lat" />
          <input onInput={(e) => settings.api.longitude = parseFloat((e.target as HTMLInputElement).value ?? 0)} value={settings.api.longitude} type="text" title="Longitude" id="lon" placeholder="lon" />
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
          <input onInput={(e) => settings.api.interval = parseInt((e.target as HTMLInputElement).value ?? 0)} value={settings.api.interval} type="number" id="interval" />
        </div>
      </div>
      <div className="menuFooter">
        <button onClick={() => this.props.setMenu(Menus.pause)} data-menu="pause" data-action="saveSettings">Back</button>
      </div>
    </section>
    )
  }
}
