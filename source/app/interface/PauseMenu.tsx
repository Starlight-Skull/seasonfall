import React, { Component } from "react"
import { settings } from "../globals"
import { toStorage } from "../helpers"
import Pause from "./PauseMenu/Pause"
import Load from "./PauseMenu/Load"
import New from "./PauseMenu/New"
import SettingsGeneral from "./PauseMenu/SettingsGeneral"
import SettingsApi from "./PauseMenu/SettingsApi"
import SettingsKeybindings from "./PauseMenu/SettingsKeybindings"
import Stats from "./PauseMenu/Stats"

/**
 * Saves most settings from the global settings to storage.
 */
function saveSettings (): void {
  // keybindings are saved automatically
  toStorage('settings', settings)
}

interface Props {}
interface State {
  currentMenu: Menus
}

export enum Menus { pause, load, new, settingsGeneral, settingsApi, settingsKeybindings, stats }

export default class PauseMenu extends Component {
  state: State = {
    currentMenu: Menus.pause
  }

  setMenu(currentMenu: Menus) {
    this.setState({ currentMenu })
  }

  getMenu() {
    switch(this.state.currentMenu) {
      case Menus.pause:
        return <Pause setMenu={(menu) => this.setMenu(menu)} />
      case Menus.load:
        return <Load setMenu={(menu) => this.setMenu(menu)} />
      case Menus.new:
        return <New setMenu={(menu) => this.setMenu(menu)} />
      case Menus.settingsGeneral:
        return <SettingsGeneral setMenu={(menu) => this.setMenu(menu)} />
      case Menus.settingsApi:
        return <SettingsApi setMenu={(menu) => this.setMenu(menu)} />
      case Menus.settingsKeybindings:
        return <SettingsKeybindings setMenu={(menu) => this.setMenu(menu)} />
      case Menus.stats:
        return <Stats setMenu={(menu) => this.setMenu(menu)} />
    }
  }

  render() {
    return (
      <div id="pauseMenu">
        {this.getMenu()}
      </div>
    )
  }

  style: React.CSSProperties = {}
}
