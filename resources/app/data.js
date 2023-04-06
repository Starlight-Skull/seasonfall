import { settings, weather } from './globals.js'
import { element, formatUnixTime, fromStorage, toStorage } from './helpers.js'

export function initData () {
  fromStorage('settings').then(file => {
    for (const fileKey in file) {
      if (typeof settings[fileKey] === 'object') {
        for (const subKey in file[fileKey]) {
          settings[fileKey][subKey] = file[fileKey][subKey]
        }
      } else settings[fileKey] = file[fileKey]
    }
  }).catch(() => {
    console.log('File not found.')
    toStorage('settings', settings)
  }).then(() => {
    oneCallAPI()
    setInterval(oneCallAPI, settings.api.interval * 1000)
  })
}

/**
 * Tries to get coordinates from the built-in navigator API.
 */
export async function navigate () {
  navigator.geolocation.getCurrentPosition(location => {
    settings.api.latitude = location.coords.latitude
    settings.api.longitude = location.coords.longitude
    element('lat').value = settings.api.latitude
    element('lon').value = settings.api.longitude
  })
}

/**
 * Reference for fields in 'Geocoder API' response.
 * @type {{country: string, name: string, lon: number, state: string, lat: number}}
 */
const geoCoderModel = {
  country: '',
  lat: 0,
  lon: 0,
  name: '',
  state: ''
}

/**
 * Calls the 'Geocoder API' and sets the response to the settings object.
 * @param query - The location to search for.
 * @param key - (Optional) The key to access the API. If no key is given the global value is used.
 * @returns {Promise<any>} - Array of matching locations.
 */
export async function geoCoderAPI (query, key) {
  if (!key) key = settings.api.key
  if (query && key && typeof query === 'string' && typeof key === 'string') {
    let url = 'https://api.openweathermap.org/geo/1.0/direct'
    url += `?q=${query}&appid=${settings.api.key}&limit=5`
    const response = await fetch(url)
    return await response.json()
  }
}

/**
 * Reference for fields in 'One Call API' response.
 * @type {{current: {rain: {"1h": number}, sunrise: number, temp: number, visibility: number, uvi: number, pressure: number, clouds: number, feels_like: number, wind_gust: number, dt: number, wind_deg: number, dew_point: number, snow: {"1h": number}, sunset: number, weather[]: {icon: string, description: string, main: string, id: number}, humidity: number, wind_speed: number}, timezone: string, timezone_offset: number, lon: number, lat: number}}
 */
const oneCallModel = {
  lat: 0,
  lon: 0,
  timezone: '',
  timezone_offset: 0,
  current: {
    dt: 0,
    sunrise: 0,
    sunset: 0,
    temp: 0,
    feels_like: 0,
    pressure: 0,
    humidity: 0,
    dew_point: 0,
    clouds: 0,
    uvi: 0,
    visibility: 0,
    wind_deg: 0,
    wind_speed: 0,
    wind_gust: 0,
    rain: { '1h': 0 },
    snow: { '1h': 0 },
    weather: [{
      id: 0,
      main: '',
      description: '',
      icon: ''
    }]
  }
}

/**
 * Calls the 'One Call API' and sets the response to the weather object.
 */
export async function oneCallAPI () {
  if (settings.api.key && typeof settings.api.latitude === 'number' && typeof settings.api.longitude === 'number') {
    let url = 'https://api.openweathermap.org/data/2.5/onecall'
    url += `?lat=${settings.api.latitude}&lon=${settings.api.longitude}&appid=${settings.api.key}&exclude=minutely,hourly,daily,alerts&units=metric&lang=en`
    fetch(url).then(res => {
      return res.json()
    }).then(json => {
      console.log(json)
      if (!json.message) {
        weather.main = json.current.weather[0].main
        weather.description = json.current.weather[0].description
        weather.time = formatUnixTime(json.current.dt, json.timezone_offset)
        weather.sunrise = formatUnixTime(json.current.sunrise, json.timezone_offset)
        weather.sunset = formatUnixTime(json.current.sunset, json.timezone_offset)
        weather.temp = json.current.temp
        weather.tempFeelsLike = json.current.feels_like
        weather.pressure = json.current.pressure
        weather.humidity = json.current.humidity
        weather.dewPoint = json.current.dew_point
        weather.clouds = json.current.clouds
        weather.uvi = json.current.uvi
        weather.visibility = json.current.visibility
        weather.windSpeed = json.current.wind_speed
        weather.windDeg = (json.wind_deg < 180) ? 'East' : 'West'
        weather.windGust = json.wind_gust || 0
        weather.rain = json.current.rain || 0
        weather.snow = json.current.snow || 0
      } else {
        // if response has an error, alert user
        window.alert(json.message)
      }
    })
  }
}
