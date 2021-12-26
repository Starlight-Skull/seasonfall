import {debug, weather} from "../app/globals.js";
import {keyLogger} from "../app/helpers.js";

window.addEventListener('load', function () {
    const debugMenu = document.getElementById('debug');
    let interval;
    debugMenu.style.visibility = 'hidden';
    // load data placed by php
    debug.apiKey = document.getElementById('apiKey').value;
    debug.location = document.getElementById('location').value;
    // don't make interval unless needed
    if (debug.apiKey !== '' || debug.location !== '') {
        makeInterval();
    } else {
        debug.useAPI = false;
    }

    window.addEventListener('keydown', ev => {
        keyLogger(ev.key, true);
    });
    window.addEventListener('keyup', ev => {
        if (ev.key === '`') {
            if (debugMenu.style.visibility === 'hidden') {
                openDebug();
            } else {
                debugMenu.style.visibility = 'hidden';
            }
        }
        keyLogger(ev.key, false);
    });

    document.getElementById('update').addEventListener('click', () => {
        // api
        debug.apiKey = document.getElementById('apiKey').value;
        debug.location = document.getElementById('location').value;
        if (debug.useAPI !== document.getElementById('useAPI').checked) {
            debug.useAPI = document.getElementById('useAPI').checked;
            makeInterval();
        }
        // general
        debug.showBoxes = document.getElementById('showBoxes').checked;
        debug.showTrackedEntity = document.getElementById('showTrackedEntity').checked;
        // weather
        weather.main = document.getElementById('main').value;
        weather.temp = parseFloat(document.getElementById('temp').value);
        weather.windSpeed = parseFloat(document.getElementById('windSpeed').value);
        weather.windDeg = document.getElementById('windDeg').value;
        weather.clouds = parseFloat(document.getElementById('clouds').value);
        weather.rain = parseFloat(document.getElementById('rain').value);
        weather.snow = parseFloat(document.getElementById('snow').value);
        weather.time = parseInt(document.getElementById('time').value);
        weather.sunrise = parseInt(document.getElementById('sunrise').value);
        weather.sunset = parseInt(document.getElementById('sunset').value);
        debugMenu.style.visibility = 'hidden';
    });

    document.getElementById('callAPI').addEventListener('click', () => {
        callAPI();
        debugMenu.style.visibility = 'hidden';
    });

    function openDebug() {
        debugMenu.style.visibility = 'visible';
        // api
        document.getElementById('apiKey').value = debug.apiKey;
        document.getElementById('location').value = debug.location;
        document.getElementById('useAPI').checked = debug.useAPI;
        // general
        document.getElementById('showBoxes').checked = debug.showBoxes;
        document.getElementById('showTrackedEntity').checked = debug.showTrackedEntity;
        // weather
        document.getElementById('main').value = weather.main;
        document.getElementById('temp').value = weather.temp;
        document.getElementById('windSpeed').value = weather.windSpeed;
        document.getElementById('windDeg').value = weather.windDeg;
        document.getElementById('clouds').value = weather.clouds;
        document.getElementById('rain').value = weather.rain;
        document.getElementById('snow').value = weather.snow;
        document.getElementById('time').value = weather.time;
        document.getElementById('sunrise').value = weather.sunrise;
        document.getElementById('sunset').value = weather.sunset;
    }

    function callAPI() {
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
                    // if response has an error, disable api and tell user
                    debug.useAPI = false;
                    makeInterval();
                    window.alert(json.message)
                }
            });
    }

    function formatUnixTime(timestamp, timezone) {
        // time is set to a simple format for easy use in calculations
        let date = new Date((timestamp + timezone) * 1000);
        return date.getUTCHours() * 100 + date.getUTCMinutes();
    }

    function makeInterval() {
        if (debug.useAPI) {
            callAPI();
            // reload weather every 10 minutes
            interval = setInterval(() => {
                callAPI();
            }, 600000);
            document.getElementById('callAPI').disabled = false;
        } else {
            clearInterval(interval);
            document.getElementById('callAPI').disabled = true;
        }
    }
});