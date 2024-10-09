import React, { Component } from "react"
import { Menus } from "../PauseMenu"


interface Props {
  setMenu: (menu: Menus) => void
}
interface State {}

export default class New extends Component<Props, State> {
  render() {
    return (
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
        <button onClick={() => this.props.setMenu(Menus.pause)} data-menu="pause">Cancel</button>
        <button data-action="create">Create</button>
      </div>
    </section>
    )
  }
}
