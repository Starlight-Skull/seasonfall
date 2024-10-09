import React, { Component } from "react"
import { version } from "../../globals"
import { Menus } from "../PauseMenu"


interface Props {
  setMenu: (menu: Menus) => void
}
interface State {}

export default class Pause extends Component<Props, State> {
  render() {
    return (
      <section id="pause">
        <div className="menuHeader">
          <h3 id="pauseTitle">Paused</h3>
        </div>
        <div className="menuContent">
          <button data-action="continue">Continue</button>
          <button disabled data-action="save">Save</button>
          <button onClick={() => this.props.setMenu(Menus.load)} data-menu="load">Load</button>
          <button onClick={() => this.props.setMenu(Menus.new)} data-menu="new">New</button>
          <button onClick={() => this.props.setMenu(Menus.settingsGeneral)} data-menu="settingsGeneral">Settings</button>
          <button onClick={() => this.props.setMenu(Menus.stats)} data-menu="stats">Statistics</button>
          <button data-action="quit">Save & Quit</button>
        </div>
        <div className="menuVersion">
          <p>{version}</p>
        </div>
      </section>
    )
  }
}
