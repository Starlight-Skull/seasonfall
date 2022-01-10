import {debug, player, weather, world} from "../app/globals.js";
import {formatUnixTime, getStats, keyLogger} from "../app/helpers.js";

window.addEventListener('load', function () {
    const debugMenu = document.getElementById('debug');
    const pauseMenu = document.getElementById('pauseMenu');
    let interval;
    debugMenu.style.visibility = 'hidden';
    pauseMenu.style.visibility = 'hidden';
    // load data placed by php
    debug.userId = parseInt(document.getElementById('userId').value);
    debug.username = document.getElementById('username').value;
    debug.apiKey = document.getElementById('apiKey').value;
    debug.location = document.getElementById('location').value;
    makeInterval();
    // event listeners
    window.addEventListener('mousedown', () => {
        if (debugMenu.style.visibility === 'hidden') {
            player.controls.attack = (player.controls.attack === 2) ? 2 : true;
        }
    });
    window.addEventListener('mouseup', () => {
        if (debugMenu.style.visibility === 'hidden') {
            player.controls.attack = false;
        }
    });
    window.addEventListener('keydown', ev => {
        if (debugMenu.style.visibility === 'hidden') {
            keyLogger(ev, true);
        }
    });
    window.addEventListener('keyup', ev => {
        switch (ev.key) {
            case '`':
                if (debugMenu.style.visibility === 'hidden') {
                    openDebug();
                } else {
                    debugMenu.style.visibility = 'hidden';
                }
                break;
            case 'Escape':
                escapeMenu();
                break;
        }
        if (debugMenu.style.visibility === 'hidden') {
            keyLogger(ev, false);
        }
    });

    document.getElementById('continueButton').addEventListener('click', escapeMenu);

    function escapeMenu() {
        if (pauseMenu.style.visibility === 'hidden') {
            world.paused = true;
            pauseMenu.style.visibility = 'visible';
            // api
            document.getElementById('apiKey').value = debug.apiKey;
            document.getElementById('location').value = debug.location;
            document.getElementById('showFPS').checked = debug.showFPS;
            // stats
            getStats();
        } else {
            world.paused = false;
            pauseMenu.style.visibility = 'hidden';
            // api
            if (debug.apiKey !== document.getElementById('apiKey').value || debug.location !== document.getElementById('location').value) {
                debug.apiKey = document.getElementById('apiKey').value;
                debug.location = document.getElementById('location').value;
                callAPI();
            }
            debug.showFPS = document.getElementById('showFPS').checked;
        }
    }

    document.getElementById('update').addEventListener('click', () => {
        // general
        if (document.getElementById('username').value !== '') {
            debug.username = document.getElementById('username').value;
        } else {
            debug.username = 'Hero';
        }
        debug.showBoxes = document.getElementById('showBoxes').checked;
        debug.showLiveDebug = document.getElementById('showLiveDebug').checked;
        debug.showPlayerStats = document.getElementById('showPlayerStats').checked;
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
        // player
        player.stats.hp = parseFloat(document.getElementById('hp').value);
        player.stats.maxHP = parseFloat(document.getElementById('maxHp').value);
        player.stats.mp = parseFloat(document.getElementById('mp').value);
        player.stats.maxMP = parseFloat(document.getElementById('maxMp').value);
        player.stats.xp = parseFloat(document.getElementById('xp').value);
        player.stats.damage = parseFloat(document.getElementById('damage').value);
        player.stats.speed = parseFloat(document.getElementById('speed').value);
        player.maxAir = parseFloat(document.getElementById('maxAir').value);
        player.frame.x = parseFloat(document.getElementById('x').value);
        player.frame.y = parseFloat(document.getElementById('y').value);
        player.hasCollision = document.getElementById('hasCollision').checked;
        debugMenu.style.visibility = 'hidden';
    });

    function openDebug() {
        debugMenu.style.visibility = 'visible';
        document.getElementById('update').disabled = false;
        // general
        document.getElementById('showBoxes').checked = debug.showBoxes;
        document.getElementById('showLiveDebug').checked = debug.showLiveDebug;
        document.getElementById('showPlayerStats').checked = debug.showPlayerStats;
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
        // player
        document.getElementById('hp').value = player.stats.hp;
        document.getElementById('maxHp').value = player.stats.maxHP;
        document.getElementById('mp').value = player.stats.mp;
        document.getElementById('maxMp').value = player.stats.maxMP;
        document.getElementById('xp').value = player.stats.xp;
        document.getElementById('damage').value = player.stats.damage;
        document.getElementById('speed').value = player.stats.speed;
        document.getElementById('maxAir').value = player.maxAir;
        document.getElementById('x').value = player.frame.x;
        document.getElementById('y').value = player.frame.y;
        document.getElementById('hasCollision').checked = player.hasCollision;
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
                    // if response has an error, tell user
                    window.alert(json.message);
                }
            });
    }

    function makeInterval() {
        callAPI();
        // reload weather every 10 minutes
        interval = setInterval(() => {
            callAPI();
        }, 600000);
    }
});