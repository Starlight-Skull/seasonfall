import {debug, weather} from "./globals.js";
import {formatUnixTime} from "./helpers.js";
import {fromStorage} from "./init.js";

window.addEventListener('load', function () {
    fromStorage('debug').then(res => {
        console.log(res)
        debug.userId = res.userId;
        debug.username = res.username;
        debug.apiKey = res.apiKey;
        debug.location = res.location;
        debug.showBoxes = res.showBoxes;
        debug.showLiveDebug = res.showLiveDebug;
        debug.showFPS = res.showFPS;
        debug.showPlayerStats = res.showPlayerStats;
    }).catch(error => {
        console.log(error)
    }).then(() => {
        callAPI();
        // reload weather every 10 minutes
        setInterval(() => {
            callAPI();
        }, 600000);
    });
});

export function oneCallAPI(lat, lon, appid) {
    appid = debug.apiKey;
    if (typeof lat === 'number' && typeof lon === 'number' && typeof appid === 'string') {
        let url = 'https://api.openweathermap.org/data/2.5/onecall';
        url += `?lat=${lat}&lon=${lon}&appid=${appid}&exclude=minutely,hourly,daily,alerts&units=metric&lang=en`;
        fetch(url).then(res => {
            return res.json();
        }).then(json => {
            console.log(json);
        })
    }
}

export function geoCoderAPI(q, appid) {
    appid = debug.apiKey;
    if (typeof q === 'string' && typeof appid === 'string') {
        let url = 'https://api.openweathermap.org/geo/1.0/direct';
        url += `?q=${q}&appid=${appid}`;
        fetch(url).then(res => {
            return res.json();
        }).then(json => {
            console.log(json);
        })
    }
}

export function navigate() {
    navigator.geolocation.getCurrentPosition(location => {
        console.log(location);
    });
}

export function callAPI() {
    if (debug.apiKey !== '' && debug.location !== '') {
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${debug.apiKey}&q=${debug.location}&units=metric`)
            .then(res => {
                return res.json();
            })
            .then((json) => {
                // process api response
                if (json.cod === 200) {
                    weather.main = json.weather[0].main || '';
                    weather.temp = json.main.temp || 0;
                    weather.windSpeed = json.wind.speed || 0;
                    if (json.wind.deg >= 0 && json.wind.deg <= 180) {
                        weather.windDeg = 'East';
                    } else if (json.wind.deg > 180 && json.wind.deg <= 360) {
                        weather.windDeg = 'West';
                    }
                    weather.clouds = json.clouds.all || 0;
                    if (json.rain) {
                        weather.rain = json.rain["1h"] || 0;
                    }
                    if (json.snow) {
                        weather.snow = json.snow["1h"] || 0;
                    }
                    weather.time = formatUnixTime(json.dt, json.timezone) || 0;
                    weather.sunrise = formatUnixTime(json.sys.sunrise, json.timezone) || 0;
                    weather.sunset = formatUnixTime(json.sys.sunset, json.timezone) || 0;
                    debug.location = json.name + ',' + json.sys.country || '';
                } else {
                    // if response has an error, tell user
                    window.alert(json.message);
                }
            });
    }
}
