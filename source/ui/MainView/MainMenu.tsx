import React from 'react'
import MenuContainer from '../Components/MenuContainer'
import MenuContent from '../Components/MenuContent'
import MenuHeader from '../Components/MenuHeader'
import NavButton from '../Components/NavButton'
import { Views } from '../Root'
import { VERSION } from '../../app/globals/game'

import './MainMenu.scss'

interface Props {
  setView: (view: Views) => void
}

export default function MainMenu(props: Props) {
  function setView(view: Views) {
    return () => props.setView(view)
  }

  return (
    <div id="MainMenu">
      <MenuContainer>
        <MenuHeader>Seasonfall</MenuHeader>
        <MenuContent>
          <NavButton onClick={setView(Views.game)}>Play Game</NavButton>
          <NavButton onClick={setView(Views.editor)}>Editor</NavButton>
        </MenuContent>
        <span className="Version">{VERSION}</span>
      </MenuContainer>
    </div>
  )
}
