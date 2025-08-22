import './Pause.scss'
import { VERSION } from '../../../app/globals/game'
import { $settings } from '../../../app/globals/settings'
import { toStorage } from '../../../app/helpers'
import { Menus } from './PauseMenu'
import MenuHeader from '../../Components/MenuHeader'
import NavButton from '../../Components/NavButton'
import MenuContent from '../../Components/MenuContent'
import MenuContainer from '../../Components/MenuContainer'

interface Props {
  setMenu: (menu: Menus) => void
  close: () => void
  exit: () => void
}

export default function Pause(props: Props) {
  function setMenu(menu: Menus) {
    return () => props.setMenu(menu)
  }

  function toMainMenu() {
    toStorage('settings', $settings)
    props.exit()
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
        <NavButton onClick={toMainMenu}>Save & Quit</NavButton>
      </MenuContent>
      <span className="Version">{VERSION}</span>
    </MenuContainer>
  )
}
