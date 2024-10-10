import React from 'react'
import { Menus } from '../PauseMenu'

interface Props {
  setMenu: (menu: Menus) => void
}

export default function Load(props: Props) {
  return (
    <section id="load">
      <div className="menuHeader">
        <h3>Load Game</h3>
      </div>
      <div className="menuContent"></div>
      <div className="menuFooter">
        <button onClick={() => props.setMenu(Menus.pause)} data-menu="pause">
          Cancel
        </button>
        <button data-action="load">Load</button>
      </div>
    </section>
  )
}
