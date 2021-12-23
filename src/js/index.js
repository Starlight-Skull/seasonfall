import {debug, player, weather} from "../app/globals.js";
import {keyLogger} from "../app/helpers.js";

window.modPlayer = function (key, value) {
    switch (key) {
        case 'hp':
            player.stats.hp = value;
            break;
        case 'mp':
            player.stats.mp = value;
            break;
        case 'maxHP':
            player.stats.maxHP = value;
            break;
        case 'maxMP':
            player.stats.maxMP = value;
            break;
        case 'xp':
            player.stats.xp = value;
            break;
    }
}

window.addEventListener('load', function () {
    const debugMenu = document.getElementById('debug');
    let interval;
    debugMenu.style.visibility = 'hidden';
    // load data placed by php
    debug.apiKey = document.getElementById('apiKey').value;
    debug.location = document.getElementById('location').value;

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
        weather.temp = document.getElementById('temp').value
        weather.windSpeed = document.getElementById('windSpeed').value;
        weather.windDeg = document.getElementById('windDeg').value;
        weather.clouds = document.getElementById('clouds').value;
        weather.rain = document.getElementById('rain').value;
        weather.snow = document.getElementById('snow').value;
        weather.time = document.getElementById('time').value;
        weather.sunrise = document.getElementById('sunrise').value;
        weather.sunset = document.getElementById('sunset').value;
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
        let apiKey = document.getElementById('apiKey').value;
        let location = document.getElementById('location').value;
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${location}&units=metric`)
            .then(res => {
                return res.json();
            })
            .then((json) => {
                console.log(json);
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
                    debug.useAPI = false;
                    makeInterval();
                    window.alert(json.message)
                }
            });
    }

    function formatUnixTime(timestamp, timezone) {
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