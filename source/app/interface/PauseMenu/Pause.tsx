import React from 'react'
import { version } from '../../globals'
import { Menus } from './PauseMenu'

interface Props {
  setMenu: (menu: Menus) => void
  close: () => void
}

export default function Pause(props: Props) {
  return (
    <section id="pause">
      <div className="menuHeader">
        <h3 id="pauseTitle">Paused</h3>
      </div>
      <div className="menuContent">
        <button onClick={() => props.close()} data-action="continue">Continue</button>
        <button disabled data-action="save">
          Save
        </button>
        <button onClick={() => props.setMenu(Menus.load)} data-menu="load">
          Load
        </button>
        <button onClick={() => props.setMenu(Menus.new)} data-menu="new">
          New
        </button>
        <button
          onClick={() => props.setMenu(Menus.settingsGeneral)}
          data-menu="settingsGeneral"
        >
          Settings
        </button>
        <button onClick={() => props.setMenu(Menus.stats)} data-menu="stats">
          Statistics
        </button>
        <button onClick={() => window.close()} data-action="quit">Save & Quit</button>
      </div>
      <div className="menuVersion">
        <p>{version}</p>
      </div>
    </section>
  )
}
