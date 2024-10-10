import React from 'react'
import { Menus } from './PauseMenu'
import { player } from '../../globals'

// ;(element('nameStats') as HTMLElement).innerText = `Statistics (${player.name})`
// const stats = element('statsContainer')
// stats?.replaceChildren()
// for (const playerStatsKey in playerStats) {
//   const statItem = document.createElement('p')
//   statItem.textContent = `${playerStatsKey}: ${playerStats[playerStatsKey].toString()}`
//   stats?.appendChild(statItem)
// }

interface Props {
  setMenu: (menu: Menus) => void
}

export default function Stats(props: Props) {
  return (
    <section id="stats">
      <div className="menuHeader">
        <h3 id="nameStats">Statistics ({player.heroName})</h3>
      </div>
      <div id="statsContainer" className="menuContent"></div>
      <div className="menuFooter">
        <button onClick={() => props.setMenu(Menus.pause)} data-menu="pause">
          Back
        </button>
      </div>
    </section>
  )
}
