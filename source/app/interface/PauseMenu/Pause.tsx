import React from 'react'
import { settings, version } from '../../globals'
import { toStorage } from '../../helpers'
import { Menus } from './PauseMenu'
import MenuHeader from './Components/MenuHeader'
import NavButton from './Components/NavButton'
import MenuContent from './Components/MenuContent'
import MenuContainer from './Components/MenuContainer'

import './Pause.scss'

interface Props {
  setMenu: (menu: Menus) => void
  close: () => void
}

export default function Pause(props: Props) {
  function setMenu(menu: Menus) {
    return () => props.setMenu(menu)
  }

  return (
    <MenuContainer id="Pause">
      <MenuHeader>Paused</MenuHeader>
      <MenuContent>
        <NavButton onClick={() => props.close()}>Continue</NavButton>
        <NavButton disabled onClick={setMenu(Menus.load)}>
          Load
        </NavButton>
        {/* <NavButton onClick={setMenu(Menus.new)}>New</NavButton> */}
        <NavButton onClick={setMenu(Menus.settingsGeneral)}>Settings</NavButton>
        <NavButton onClick={setMenu(Menus.stats)}>Statistics</NavButton>
        <NavButton onClick={() => toStorage('settings', settings)}>Save</NavButton>
      </MenuContent>
      <span className="Version">{version}</span>
    </MenuContainer>
  )
}
