import React from "react"
import { settings } from "../../globals"
import InputBoolean from "../Components/InputBoolean"
import InputNumber from "../Components/InputNumber"
import { Menus } from "./PauseMenu"


interface Props {
  setMenu: (menu: Menus) => void
}

export default function SettingsGeneral(props: Props) {
  return (
    <section id="settingsGeneral">
      <div className="menuHeader menuHeaderMulti three">
        <button onClick={() => props.setMenu(Menus.settingsGeneral)}     className="active">General</button>
        <button onClick={() => props.setMenu(Menus.settingsApi)}         data-menu="settingsApi">API</button>
        <button onClick={() => props.setMenu(Menus.settingsKeybindings)} data-menu="settingsKeybindings">Keybindings</button>
      </div>
      <div className="menuContent">
        <InputBoolean label="Show FPS" value={settings.showFPS} onChange={val => settings.showFPS = val} />
        <InputNumber label="" value={settings.scale} onChange={val => settings.scale = val} min={1} />
      </div>
      <div className="menuFooter">
        <button onClick={() => props.setMenu(Menus.pause)} data-menu="pause" data-action="saveSettings">Back</button>
      </div>
    </section>
  )
}
