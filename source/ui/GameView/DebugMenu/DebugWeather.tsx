import InputString from '../../Components/InputString'
import InputNumber from '../../Components/InputNumber'
import InputSelect from '../../Components/InputSelect'
import { $weather } from '../../../app/globals/weather'

export default function DebugWeather() {
  return (
    <section>
      <h3>Weather</h3>
      <InputSelect
        label="Name"
        value={$weather.main}
        onChange={(val) => ($weather.main = val)}
        options={[
          'Thunderstorm',
          'Drizzle',
          'Rain',
          'Snow',
          'Mist',
          'Smoke',
          'Haze',
          'Dust',
          'Fog',
          'Sand',
          'Ash',
          'Squall',
          'Tornado',
          'Clear',
          'Clouds'
        ]}
      />
      <InputString
        label="Description"
        value={$weather.description}
        onChange={(val) => ($weather.description = val)}
      />
      <InputNumber
        label="Timestamp (hmm)"
        value={$weather.time}
        onChange={(val) => ($weather.time = val)}
        min={0}
      />
      <InputNumber
        label="Sunrise (hmm)"
        value={$weather.sunrise}
        onChange={(val) => ($weather.sunrise = val)}
        min={0}
      />
      <InputNumber
        label="Sunset (hmm)"
        value={$weather.sunset}
        onChange={(val) => ($weather.sunset = val)}
        min={0}
      />
      <InputNumber
        label="Temperature (&deg;C)"
        value={$weather.temp}
        onChange={(val) => ($weather.temp = val)}
        min={0}
      />
      <InputNumber
        label="Feels Like (&deg;C)"
        value={$weather.tempFeelsLike}
        onChange={(val) => ($weather.tempFeelsLike = val)}
        min={0}
      />
      <InputNumber
        label="Pressure (hPa)"
        value={$weather.pressure}
        onChange={(val) => ($weather.pressure = val)}
        min={0}
      />
      <InputNumber
        label="Humidity (%)"
        value={$weather.humidity}
        onChange={(val) => ($weather.humidity = val)}
        min={0}
      />
      <InputNumber
        label="Dew Point (&deg;C)"
        value={$weather.dewPoint}
        onChange={(val) => ($weather.dewPoint = val)}
        min={0}
      />
      <InputNumber
        label="Clouds (%)"
        value={$weather.clouds}
        onChange={(val) => ($weather.clouds = val)}
        min={0}
      />
      <InputNumber
        label="UV Index"
        value={$weather.uvi}
        onChange={(val) => ($weather.uvi = val)}
        min={0}
      />
      <InputNumber
        label="Visibility (m)"
        value={$weather.visibility}
        onChange={(val) => ($weather.visibility = val)}
        min={0}
      />
      <InputNumber
        label="Wind Gust (m/s)"
        value={$weather.windGust}
        onChange={(val) => ($weather.windGust = val)}
        min={0}
      />
      <InputNumber
        label="Wind Speed (m/s)"
        value={$weather.windSpeed}
        onChange={(val) => ($weather.windSpeed = val)}
        min={0}
      />
      <InputSelect
        label="Wind Direction"
        options={['East', 'West']}
        value={$weather.windDeg}
        onChange={(val) => ($weather.windDeg = val)}
      />
      <InputNumber
        label="Rain (mm/h)"
        value={$weather.rain}
        onChange={(val) => ($weather.rain = val)}
        min={0}
      />
      <InputNumber
        label="Snow (mm/h)"
        value={$weather.snow}
        onChange={(val) => ($weather.snow = val)}
        min={0}
      />
    </section>
  )
}
