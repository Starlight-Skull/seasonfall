import React, { type ChangeEvent, useEffect, useState } from 'react'
import { settings } from '../../globals'
import { geoCoderAPI, type GeoCoderModel } from '../../logic/data'
import { Menus } from './PauseMenu'
import MenuHeader from './Components/MenuHeader'
import MenuContent from './Components/MenuContent'
import MenuContainer from './Components/MenuContainer'
import MenuFooter from './Components/MenuFooter'
import InputString from '../Components/InputString'
import InputNumber from '../Components/InputNumber'
import InputBoolean from '../Components/InputBoolean'

import './Settings.scss'

interface Props {
  setMenu: (menu: Menus) => void
}

export default function SettingsApi(props: Props) {
  const [lat, setLat] = useState(settings.api.latitude)
  const [lon, setLon] = useState(settings.api.longitude)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(new Array<GeoCoderModel>())

  function navigate() {
    navigator.geolocation.getCurrentPosition((location) => {
      setLat(location.coords.latitude)
      setLon(location.coords.longitude)
    })
  }

  function search() {
    if (!settings.api.enabled || query === '' || settings.api.key === '') return
    geoCoderAPI(query, settings.api.key)
      .then((locations) => {
        console.log(locations)
        if (locations.length === 0) return
        setResults(locations)
      })
      .catch(console.warn)
  }

  function selectLocation(event: ChangeEvent) {
    const target = event.target as HTMLSelectElement
    if (target.children.length === 0) return
    const option = target.children.item(
      target.selectedIndex
    ) as HTMLOptionElement
    setLat(parseFloat(option.dataset?.lat ?? '0'))
    setLon(parseFloat(option.dataset?.lon ?? '0'))
  }

  function handleLatChange(event: ChangeEvent) {
    const target = event?.target as HTMLInputElement
    setLat(parseFloat(target.value))
  }

  function handleLonChange(event: ChangeEvent) {
    const target = event?.target as HTMLInputElement
    setLon(parseFloat(target.value))
  }

  useEffect(() => {
    if (lat !== settings.api.latitude) settings.api.latitude = lat
    if (lon !== settings.api.longitude) settings.api.longitude = lon
  })

  // todo add explanation
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
        <a className="row" href="https://openweathermap.org" target="_blank">
          Get your free API key from OpenWeatherMap
        </a>
        <div>
          <InputBoolean
            label="Enabled"
            value={settings.api.enabled}
            onChange={(val) => (settings.api.enabled = val)}
          />
          <InputString
            label="API Key"
            value={settings.api.key}
            onChange={(val) => (settings.api.key = val)}
          />
          <InputNumber
            label="Interval (s)"
            value={settings.api.interval}
            onChange={(val) => (settings.api.interval = val)}
            step={60}
            min={180}
          />
          <label>
            Latitude
            <input value={lat} onChange={handleLatChange} type="number" />
          </label>
          <label>
            Longitude
            <input value={lon} onChange={handleLonChange} type="number" />
          </label>
        </div>
        <div className="row left">
          <button onClick={() => navigate()}>Request Current Location</button>
        </div>
        {settings.api.key && <i className="row"></i>}
        {settings.api.key && (
          <div className="row">
            <button onClick={() => search()}>Search</button>
            <InputString label="" value={query} onChange={setQuery} />
          </div>
        )}
        {results.length > 0 && (
          <div className="row">
            <select onChange={selectLocation}>
              <option value="-1"></option>
              {results.map((location, i) => {
                return (
                  <option
                    key={i}
                    value={i}
                    data-lat={location.lat}
                    data-lon={location.lon}
                  >
                    {location.name}, {location.state} ({location.country})
                  </option>
                )
              })}
            </select>
          </div>
        )}
      </MenuContent>
      <MenuFooter
        nav={{
          Back: () => props.setMenu(Menus.pause)
        }}
      />
    </MenuContainer>
  )
}
