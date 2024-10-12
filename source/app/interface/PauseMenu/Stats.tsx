import React from 'react'
import { Menus } from './PauseMenu'
import { player, playerStats } from '../../globals'
import MenuHeader from './Components/MenuHeader'
import MenuContent from './Components/MenuContent'
import MenuContainer from './Components/MenuContainer'
import MenuFooter from './Components/MenuFooter'

import './Stats.scss'

interface Props {
  setMenu: (menu: Menus) => void
}

export default function Stats(props: Props) {
  return (
    <MenuContainer id="Stats">
      <MenuHeader>Statistics (<i>{player.heroName}</i>)</MenuHeader>
      <MenuContent>
        <ul>
          <li>Time Taken: {playerStats.timeTaken}</li>
          <li>Kills: {playerStats.kills}</li>
          <li>Attacks: {playerStats.attacks}</li>
          <li>Attacks Hit: {playerStats.attacksHit}</li>
          <li>Damage Taken: {playerStats.damageTaken}</li>
          <li>Damage Dealt: {playerStats.damageDealt}</li>
        </ul>
      </MenuContent>
      <MenuFooter
        nav={{
          Back: () => props.setMenu(Menus.pause)
        }}
      />
    </MenuContainer>
  )
}
