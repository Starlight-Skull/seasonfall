import React, { Component } from "react"
import { Menus } from "../PauseMenu"


interface Props {
  setMenu: (menu: Menus) => void
}
interface State {}

export default class Load extends Component<Props, State> {
  render() {
    return (
      <section id="load">
        <div className="menuHeader">
          <h3>Load Game</h3>
        </div>
        <div className="menuContent"></div>
        <div className="menuFooter">
          <button onClick={() => this.props.setMenu(Menus.pause)} data-menu="pause">Cancel</button>
          <button data-action="load">Load</button>
        </div>
      </section>
    )
  }
}
