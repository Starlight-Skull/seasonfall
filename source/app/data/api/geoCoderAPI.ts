import { $settings } from '../../globals/settings'

export interface GeoCoderModel {
  country: string
  state: string
  name: string
  lon: number
  lat: number
}

/**
 * Calls the 'Geocoder API' and sets the response to the settings object.
 * @param query - {city name},{state code},{country code}
 * @param key - (Optional) The key to access the API. If no key is given the global value is used.
 * @returns Array of matching locations.
 */
export async function geoCoderAPI(
  query: string,
  key: string
): Promise<GeoCoderModel[]> {
  if (key === '' || query === '') return []
  let url = 'https://api.openweathermap.org/geo/1.0/direct'
  url += `?q=${query}&appid=${$settings.api.key}&limit=5`
  const response = await fetch(url)
  return response.json() as Promise<GeoCoderModel[]>
}
