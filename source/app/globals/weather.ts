interface Weather {
  [key: string]: string | number
  main: string
  description: string
  time: number
  sunrise: number
  sunset: number
  temp: number
  tempFeelsLike: number
  pressure: number
  humidity: number
  dewPoint: number
  clouds: number
  uvi: number
  visibility: number
  windSpeed: number
  windDeg: string
  windGust: number
  rain: number
  snow: number
}

export const $weather: Weather = {
  main: 'Clear',
  description: 'clear sky',
  time: 1200, // h:mm
  sunrise: 700, // h:mm
  sunset: 1900, // h:mm
  temp: 20, // °C
  tempFeelsLike: 20, // °C
  pressure: 0, // hPa
  humidity: 0, // %
  dewPoint: 0, // °C
  clouds: 50, // %
  uvi: 0,
  visibility: 1000, // meter
  windSpeed: 0, // m/s
  windDeg: 'East', // East|West
  windGust: 0, // m/s
  rain: 0, // mm/h
  snow: 0 // mm/h
}
