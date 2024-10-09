import React, { Component } from "react"
import { settings } from "../../globals"
import InputBoolean from "../Components/InputBoolean"
import InputNumber from "../Components/InputNumber"
import { Menus } from "../PauseMenu"


interface Props {
  setMenu: (menu: Menus) => void
}
interface State {}

export default class SettingsGeneral extends Component<Props, State> {
  render() {
    return (
      <section id="settingsGeneral">
      <div className="menuHeader menuHeaderMulti three">
        <button onClick={() => this.props.setMenu(Menus.settingsGeneral)}     className="active">General</button>
        <button onClick={() => this.props.setMenu(Menus.settingsApi)}         data-menu="settingsApi">API</button>
        <button onClick={() => this.props.setMenu(Menus.settingsKeybindings)} data-menu="settingsKeybindings">Keybindings</button>
      </div>
      <div className="menuContent">
        <InputBoolean label="Show FPS" value={settings.showFPS} onChange={val => settings.showFPS = val} />
        <InputNumber label="" value={settings.scale} onChange={val => settings.scale = val} min={1} />
      </div>
      <div className="menuFooter">
        <button onClick={() => this.props.setMenu(Menus.pause)} data-menu="pause" data-action="saveSettings">Back</button>
      </div>
    </section>
    )
  }
}
