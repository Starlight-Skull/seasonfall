import React, { Component } from "react"
import { Menus } from "../PauseMenu"

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

interface Props {
  setMenu: (menu: Menus) => void
}
interface State {}

export default class SettingsKeybindings extends Component<Props, State> {
  render() {
    return (
      <section id="settingsKeybindings">
      <div className="menuHeader menuHeaderMulti three">
        <button onClick={() => this.props.setMenu(Menus.settingsGeneral)}     data-menu="settingsGeneral">General</button>
        <button onClick={() => this.props.setMenu(Menus.settingsApi)}         data-menu="settingsApi">API</button>
        <button onClick={() => this.props.setMenu(Menus.settingsKeybindings)} className="active">Keybindings</button>
      </div>
      <div id="keybindingsContainer" className="menuContent"></div>
      <div className="menuFooter">
        <button onClick={() => this.props.setMenu(Menus.pause)} data-menu="pause" data-action="saveSettings">Back</button>
      </div>
    </section>
    )
  }
}
