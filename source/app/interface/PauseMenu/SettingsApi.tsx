import React, { useState } from 'react'
import { settings } from '../../globals'
import { Menus } from './PauseMenu'
import MenuHeader from './Components/MenuHeader'
import MenuContent from './Components/MenuContent'
import MenuContainer from './Components/MenuContainer'
import MenuFooter from './Components/MenuFooter'

import './Settings.scss'
import InputString from '../Components/InputString'
import InputNumber from '../Components/InputNumber'

interface Props {
  setMenu: (menu: Menus) => void
}

export default function SettingsApi(props: Props) {
  const [location, setLocation] = useState('')

  return (
    <MenuContainer id="Settings">
      <MenuHeader
        nav={{
          General: Menus.settingsGeneral,
          API: Menus.settingsApi,
          Keybindings: Menus.settingsKeybindings
        }}
        active={1}
        setMenu={props.setMenu}
      />
      <MenuContent>
        <div>
          <a href="https://openweathermap.org" target="_blank">
            openweathermap.org
          </a>
        </div>
        <InputString
          label="API Key"
          value={settings.api.key}
          onChange={(val) => (settings.api.key = val)}
        />
        <InputNumber
          label="Latitude"
          value={settings.api.latitude}
          onChange={(val) => (settings.api.latitude = val)}
        />
        <InputNumber
          label="Longitude"
          value={settings.api.longitude}
          onChange={(val) => (settings.api.longitude = val)}
        />
        <div>
          <button>Use Current Location</button>
        </div>
        <InputString
          label="Location"
          value={location}
          onChange={(val) => setLocation(val)}
        />
        <div>
          <button>Search</button>
          <select id="searchResults"></select>
        </div>
        <InputNumber
          label="Interval (s)"
          value={settings.api.interval}
          onChange={(val) => (settings.api.interval = val)}
        />
      </MenuContent>
      <MenuFooter
        nav={{
          Back: () => props.setMenu(Menus.pause)
        }}
      />
    </MenuContainer>
  )
}
