import {settings, player, weather, world} from "./globals.js";
import {keyLogger} from "./helpers.js";
import {toStorage} from "./init.js";
import {oneCallAPI} from "./data.js";

window.addEventListener('load', function () {
    const debugMenu = document.getElementById('debug');
    const pauseMenu = document.getElementById('pauseMenu');
    debugMenu.style.visibility = 'hidden';
    pauseMenu.style.visibility = 'hidden';

    // event listeners
    window.addEventListener('mousedown', () => {
        if (!world.paused) {
            player.controls.attack = (player.controls.attack === 2) ? 2 : true;
        }
    });
    window.addEventListener('mouseup', () => {
        if (!world.paused) {
            player.controls.attack = false;
        }
    });
    window.addEventListener('keydown', ev => {
        if (!world.paused) {
            keyLogger(ev);
        }
    });
    window.addEventListener('keyup', ev => {
        switch (ev.key) {
            case '`':
                openDebugMenu();
                break;
            case 'Escape':
                openPauseMenu();
                break;
        }
        if (!world.paused) {
            keyLogger(ev);
        }
    });

    document.getElementById('continueButton').addEventListener('click', openPauseMenu);

    function openPauseMenu() {
        if (pauseMenu.style.visibility === 'hidden') {
            world.paused = true;
            pauseMenu.style.visibility = 'visible';
            // api
            document.getElementById('apiKey').value = settings.apiKey;
            document.getElementById('location').value = settings.location;
            document.getElementById('showFPS').checked = settings.showFPS;
        } else {
            world.paused = false;
            pauseMenu.style.visibility = 'hidden';
            toStorage('settings', settings);
            // api
            if (settings.apiKey !== document.getElementById('apiKey').value || settings.location !== document.getElementById('location').value) {
                settings.apiKey = document.getElementById('apiKey').value;
                settings.location = document.getElementById('location').value;
                oneCallAPI();
            }
            settings.showFPS = document.getElementById('showFPS').checked;
        }
    }

    function openDebugMenu() {
        if (debugMenu.style.visibility === 'hidden') {
            world.paused = true;
            debugMenu.style.visibility = 'visible';
            // general
            document.getElementById('userId').value = settings.userId;
            document.getElementById('username').value = settings.username;
            document.getElementById('showBoxes').checked = settings.showBoxes;
            document.getElementById('showLiveDebug').checked = settings.showLiveDebug;
            document.getElementById('showPlayerStats').checked = settings.showPlayerStats;
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
        } else {
            world.paused = false;
            debugMenu.style.visibility = 'hidden';
            // general
            settings.userId = document.getElementById('userId').value;
            settings.username = document.getElementById('username').value;
            settings.showBoxes = document.getElementById('showBoxes').checked;
            settings.showLiveDebug = document.getElementById('showLiveDebug').checked;
            settings.showPlayerStats = document.getElementById('showPlayerStats').checked;
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
        }
    }
});
