import React from 'react'
import { Menus } from './PauseMenu'
import MenuHeader from './Components/MenuHeader'
import MenuContent from './Components/MenuContent'
import MenuContainer from './Components/MenuContainer'
import MenuFooter from './Components/MenuFooter'

interface Props {
  setMenu: (menu: Menus) => void
}

export default function New(props: Props) {
  return (
    <MenuContainer id="New">
      <MenuHeader>New Character</MenuHeader>
      <MenuContent></MenuContent>
      <MenuFooter
        nav={{
          Cancel: () => props.setMenu(Menus.pause),
          Create: () => {}
        }}
      />
    </MenuContainer>
  )
}
