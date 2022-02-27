import {settings, weather} from "./globals.js";
import {formatUnixTime} from "./helpers.js";
import {fromStorage} from "./init.js";

/**
 * Loads settings from storage and sets an interval to call the 'One Call API'.
 */
window.addEventListener('load', function () {
    fromStorage('settings').then(res => {
        console.log(res)
        settings.userId = res.userId || settings.userId;
        settings.username = res.username || settings.username;
        settings.apiKey = res.apiKey || settings.apiKey;
        settings.location = res.location || settings.location;
        settings.latitude = res.latitude || settings.latitude;
        settings.longitude = res.longitude || settings.longitude;
        settings.scale = res.scale || settings.scale;
        settings.interval = res.interval || settings.interval;
        settings.showFPS = res.showFPS;
        settings.showBoxes = res.showBoxes;
        settings.showLiveDebug = res.showLiveDebug;
        settings.showPlayerStats = res.showPlayerStats;
        settings.keybindings = res.keybindings;
    }).catch(error => {
        console.error(error);
    }).then(() => {
        oneCallAPI();
        setInterval(oneCallAPI, settings.interval);
    });
});

/**
 * Tries to get coordinates from the built-in navigator API.
 */
export function navigate() {
    navigator.geolocation.getCurrentPosition(location => {
        settings.latitude = location.coords.latitude;
        settings.longitude = location.coords.longitude;
    });
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
 * @returns {Promise<any>} - Array of matching locations.
 */
export function geoCoderAPI(query) {
    if (typeof query === 'string' && typeof settings.apiKey === 'string') {
        let url = 'https://api.openweathermap.org/geo/1.0/direct';
        url += `?q=${query}&appid=${settings.apiKey}&limit=5`;
        return fetch(url).then(response => {
            return response.json();
        });
    }
}

/**
 * Reference for fields in 'One Call API' response.
 * @type {{current: {rain: {"1h": number}, sunrise: number, temp: number, visibility: number, uvi: number, pressure: number, clouds: number, feels_like: number, wind_gust: number, dt: number, wind_deg: number, dew_point: number, snow: {"1h": number}, sunset: number, weather: [{icon: string, description: string, main: string, id: number}], humidity: number, wind_speed: number}, timezone: string, timezone_offset: number, lon: number, lat: number}}
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
        rain: {"1h": 0},
        snow: {"1h": 0},
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
export function oneCallAPI() {
    if (typeof settings.latitude === 'number' && typeof settings.longitude === 'number' && typeof settings.apiKey === 'string') {
        let url = 'https://api.openweathermap.org/data/2.5/onecall';
        url += `?lat=${settings.latitude}&lon=${settings.longitude}&appid=${settings.apiKey}&exclude=minutely,hourly,daily,alerts&units=metric&lang=en`;
        fetch(url).then(res => {
            return res.json();
        }).then(json => {
            if (!json.message) {
                weather.main = json.current.weather[0].main;
                weather.description = json.current.weather[0].description;
                weather.time = formatUnixTime(json.current.dt, json.timezone_offset);
                weather.sunrise = formatUnixTime(json.current.sunrise, json.timezone_offset);
                weather.sunset = formatUnixTime(json.current.sunset, json.timezone_offset);
                weather.temp = json.current.temp;
                weather.tempFeelsLike = json.current.feels_like;
                weather.pressure = json.current.pressure;
                weather.humidity = json.current.humidity;
                weather.dewPoint = json.current.dew_point;
                weather.clouds = json.current.clouds;
                weather.uvi = json.current.uvi;
                weather.visibility = json.current.visibility;
                weather.windSpeed = json.current.wind_speed;
                weather.windDeg = (json.wind_deg < 180) ? 'East' : 'West';
                weather.windGust = json.wind_gust || 0;
                weather.rain = json.current.rain || 0;
                weather.snow = json.current.snow || 0;
            } else {
                // if response has an error, alert user
                window.alert(json.message);
            }
        });
    }
}
