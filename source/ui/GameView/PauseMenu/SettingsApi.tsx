import './Settings.scss'
import { type ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { $settings } from '../../../app/globals/settings'
import { type GeoCoderModel } from '../../../app/data/api/geoCoderAPI'
import { geoCoderAPI } from '../../../app/data/api/geoCoderAPI'
import { Menus } from './PauseMenu'
import MenuHeader from '../../Components/MenuHeader'
import MenuContent from '../../Components/MenuContent'
import MenuContainer from '../../Components/MenuContainer'
import MenuFooter from '../../Components/MenuFooter'
import InputString, { InputStringStateLess } from '../../Components/InputString'
import InputNumber, { InputNumberStateLess } from '../../Components/InputNumber'
import InputBoolean from '../../Components/InputBoolean'
import InputButton from '../../Components/InputButton'
import { InputSelectStateLess } from '../../Components/InputSelect'

interface Props {
  setMenu: (menu: Menus) => void
}

export default function SettingsApi(props: Props) {
  const [lat, setLat] = useState($settings.api.latitude)
  const [lon, setLon] = useState($settings.api.longitude)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(new Array<GeoCoderModel>())

  function navigate() {
    navigator.geolocation.getCurrentPosition((location) => {
      setLat(location.coords.latitude)
      setLon(location.coords.longitude)
    })
  }

  function search() {
    if (!$settings.api.enabled || query === '' || $settings.api.key === '') return
    geoCoderAPI(query, $settings.api.key)
      .then((locations) => {
        console.log(locations)
        if (locations.length === 0) return
        setResults(locations)
      })
      .catch(console.warn)
  }

  function selectLocation(value: string) {
    const index = parseInt(value)
    setLat(results[index].lat)
    setLon(results[index].lon)
  }

  useEffect(() => {
    if (lat !== $settings.api.latitude) $settings.api.latitude = lat
    if (lon !== $settings.api.longitude) $settings.api.longitude = lon
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
            value={$settings.api.enabled}
            onChange={(val) => ($settings.api.enabled = val)}
          />
          <InputString
            label="API Key"
            value={$settings.api.key}
            onChange={(val) => ($settings.api.key = val)}
          />
          <InputNumber
            label="Interval (ms)"
            value={$settings.api.interval}
            onChange={(val) => ($settings.api.interval = val)}
            step={60}
            min={180}
          />
          <InputNumberStateLess
            label='Latitude'
            value={lat}
            onChange={setLat}
          />
          <InputNumberStateLess
            label='Longitude'
            value={lon}
            onChange={setLon}
          />
        </div>
        <div className="row left">
          <InputButton onClick={navigate}>Request Browser Location</InputButton>
        </div>
        {$settings.api.key && (
          <div className="row">
            <InputButton onClick={search}>Search</InputButton>
            <InputStringStateLess value={query} onChange={setQuery} />
          </div>
        )}
        {results.length > 0 && (
          <div className="row">
            <InputSelectStateLess
              label='Search Results'
              value='-1'
              onChange={selectLocation}
              options={results.map((location) => `${location.name}, ${location.state} (${location.country})`)}
              indexAsValue={true}
            />
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
