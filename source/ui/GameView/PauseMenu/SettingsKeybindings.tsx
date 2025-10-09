import './Settings.scss'
import { useEffect, useState } from 'react'
import { Menus } from './PauseMenu'
import MenuHeader from '../../Components/MenuHeader'
import MenuContent from '../../Components/MenuContent'
import MenuContainer from '../../Components/MenuContainer'
import MenuFooter from '../../Components/MenuFooter'
import InputButton from '../../Components/InputButton'
import { $settings } from '../../../app/globals/settings'
import { upperCaseFirst } from '../../../app/helpers'

interface Props {
  setMenu: (menu: Menus) => void
}

export default function SettingsKeybindings(props: Props) {
  const [listening, setListening] = useState(false)
  const [action, setAction] = useState('')

  function changeKey(key: string) {
    setAction(key)
    setListening(true)
  }

  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      $settings.keybindings[action] = event.code
      setListening(false)
      setAction('')
    }
    if (listening && action !== '')
      window.addEventListener('keydown', handleKeyboardEvent)
    return () => window.removeEventListener('keydown', handleKeyboardEvent)
  })

  useEffect(() => {
    const handleMouseEvent = (event: MouseEvent) => {
      $settings.keybindings[action] = `Mouse${event.button}`
      setListening(false)
      setAction('')
    }
    if (listening && action !== '')
      window.addEventListener('mousedown', handleMouseEvent)
    return () => window.removeEventListener('mousedown', handleMouseEvent)
  })

  // todo add reset
  return (
    <MenuContainer id="Settings">
      <MenuHeader
        nav={{
          General: Menus.settingsGeneral,
          API: Menus.settingsApi,
          Keybindings: Menus.settingsKeybindings
        }}
        active={2}
        setMenu={props.setMenu}
      />
      <MenuContent>
        {listening && (
          <div className="Blackout">
            Press any key or mouse button for: (<b>{upperCaseFirst(action)}</b>)
          </div>
        )}
        <div className='Keybindings'>
          <InputButton disabled={true} label='Pause'>Escape</InputButton>
          <InputButton disabled={true} label='Debug'>Backquote</InputButton>
          {Object.entries($settings.keybindings).map((element, i) => {
            return (
              <InputButton
                key={i}
                label={upperCaseFirst(element[0])}
                onClick={() => changeKey(element[0])}
              >
                {element[1].replace('Key', '').replace('Mouse', 'Mouse ')}
              </InputButton>
            )
          })}
        </div>
      </MenuContent>
      <MenuFooter
        nav={{
          Back: () => props.setMenu(Menus.pause)
        }}
      />
    </MenuContainer>
  )
}
