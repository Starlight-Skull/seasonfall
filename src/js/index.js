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
        debug.apiKey = document.getElementById('apiKey').value;
        debug.location = document.getElementById('location').value;
        if (debug.useAPI !== document.getElementById('useAPI').checked) {
            debug.useAPI = document.getElementById('useAPI').checked;
            makeInterval();
        }
        debug.showBoxes = document.getElementById('showBoxes').checked;
        debug.showTrackedEntity = document.getElementById('showTrackedEntity').checked;
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
        document.getElementById('code').value = weather.code;
        document.getElementById('main').selected = weather.main;
        document.getElementById('description').selected = weather.description
        document.getElementById('temp').value = weather.temp;
        document.getElementById('visibility').value = weather.visibility;
        document.getElementById('windSpeed').value = weather.windSpeed;
        document.getElementById('windDeg').value = weather.windDeg;
        document.getElementById('windGust').value = weather.windGust;
        document.getElementById('clouds').value = weather.clouds;
        document.getElementById('rain').value = weather.rain;
        document.getElementById('snow').value = weather.snow;
        document.getElementById('time').value = weather.time;
        document.getElementById('sunrise').value = weather.sunrise;
        document.getElementById('sunset').value = weather.sunset;
        document.getElementById('timezone').value = weather.timezone;
    }

    function callAPI() {
        let apiKey = document.getElementById('apiKey').value;
        let location = document.getElementById('location').value;
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${location}`)
            .then(res => {
                return res.json();
            })
            .then((json) => {
                weather.json = json;
                // todo fill json into globals
                console.log(json);
            });
    }

    makeInterval();
    function makeInterval() {
        if (debug.useAPI) {
            // callAPI();
            // reload weather every 10 minutes
            interval = setInterval(() => {
                // callAPI();
            }, 600000);
        } else {
            clearInterval(interval);
        }
    }
});