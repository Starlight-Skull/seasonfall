import { $settings } from '../../globals/settings'
import { $weather } from '../../globals/weather'
import { isNotEmpty, formatUnixTime } from '../../helpers'

interface OneCallModel {
  message?: string
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current?: {
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    clouds: number
    uvi: number
    visibility: number
    wind_deg: number
    wind_speed: number
    wind_gust: number
    rain: { '1h': number }
    snow: { '1h': number }
    weather: [
      {
        id: number
        main: string
        description: string
        icon: string
      }
    ]
  }
}

/**
 * Calls the 'One Call API' and sets the response to the weather object.
 */
export async function oneCallAPI(): Promise<void> {
  if (
    !$settings.api.enabled ||
    !isNotEmpty($settings.api.key) ||
    typeof $settings.api.latitude !== 'number' ||
    typeof $settings.api.longitude !== 'number'
  )
    return
  let url = 'https://api.openweathermap.org/data/2.5/onecall'
  url += `?lat=${$settings.api.latitude}&lon=${$settings.api.longitude}&appid=${$settings.api.key}&exclude=minutely,hourly,daily,alerts&units=metric&lang=en`
  await fetch(url)
    .then(res => res.json())
    // .then(async (res) => (await res.json()) as OneCallModel)
    .then(setWeather)
    .catch(console.log)
}

function setWeather(json: OneCallModel) {
  console.log(json)
  if (json.message != null && json.current != null) {
    $weather.main = json.current.weather[0].main
    $weather.description = json.current.weather[0].description
    $weather.time = formatUnixTime(json.current.dt, json.timezone_offset)
    $weather.sunrise = formatUnixTime(
      json.current.sunrise,
      json.timezone_offset
    )
    $weather.sunset = formatUnixTime(json.current.sunset, json.timezone_offset)
    $weather.temp = json.current.temp
    $weather.tempFeelsLike = json.current.feels_like
    $weather.pressure = json.current.pressure
    $weather.humidity = json.current.humidity
    $weather.dewPoint = json.current.dew_point
    $weather.clouds = json.current.clouds
    $weather.uvi = json.current.uvi
    $weather.visibility = json.current.visibility
    $weather.windSpeed = json.current.wind_speed
    $weather.windDeg = json.current.wind_deg < 180 ? 'East' : 'West'
    $weather.windGust = json.current.wind_gust ?? 0
    $weather.rain = json.current.rain['1h'] ?? 0
    $weather.snow = json.current.snow['1h'] ?? 0
  } else {
    window.alert(json.message)
  }
}
