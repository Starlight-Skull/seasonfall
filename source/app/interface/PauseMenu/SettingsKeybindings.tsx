import React, { useEffect, useState } from 'react'
import { Menus } from './PauseMenu'
import MenuHeader from './Components/MenuHeader'
import MenuContent from './Components/MenuContent'
import MenuContainer from './Components/MenuContainer'
import MenuFooter from './Components/MenuFooter'
import { settings } from '../../globals'

import './Settings.scss'

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
      settings.keybindings[action] = event.code
      setListening(false)
      setAction('')
    }
    if (listening && action !== '')
      window.addEventListener('keydown', handleKeyboardEvent)
    return () => window.removeEventListener('keydown', handleKeyboardEvent)
  })

  useEffect(() => {
    const handleMouseEvent = (event: MouseEvent) => {
      settings.keybindings[action] = `Mouse${event.button}`
      setListening(false)
      setAction('')
    }
    if (listening && action !== '')
      window.addEventListener('mousedown', handleMouseEvent)
    return () => window.removeEventListener('mousedown', handleMouseEvent)
  })

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
            Press any key or button for: (<b>{upperCaseFirst(action)}</b>)
          </div>
        )}
        {Object.entries(settings.keybindings).map((element, i) => {
          return (
            <label key={i}>
              {upperCaseFirst(element[0])}
              <button onClick={() => changeKey(element[0])}>
                {element[1].replace('Key', '').replace('Mouse', 'Mouse ')}
              </button>
            </label>
          )
        })}
      </MenuContent>
      <MenuFooter
        nav={{
          Back: () => props.setMenu(Menus.pause)
        }}
      />
    </MenuContainer>
  )
}

function upperCaseFirst(text: string): string {
  return text[0].toUpperCase() + text.slice(1)
}
