import {settings, player, weather, world, playerStats} from "./globals.js";
import {element, keyLogger} from "./helpers.js";
import {appVersion, quit, toStorage} from "./init.js";
import {geoCoderAPI, navigate} from "./data.js";

window.addEventListener('load', function () {
    const debugMenu = element('debugMenu');
    const pauseMenu = element('pauseMenu');
    debugMenu.style.visibility = 'hidden';
    pauseMenu.style.visibility = 'hidden';
    const menus = {
        pause: element('pause'),
        newCharacter: element('newCharacter'),
        newApi: element('newApi'),
        load: element('load'),
        stats: element('stats'),
        settingsGeneral: element('settingsGeneral'),
        settingsApi: element('settingsApi'),
        settingsKeybindings: element('settingsKeybindings')
    }
    for (const menusKey in menus) {
        menus[menusKey].style.display = 'none';
    }
    element('version').innerText = appVersion;

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
        switch (ev.code) {
            case 'Backquote':
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
    pauseMenu.addEventListener('click', event => {
        switch (event.target.dataset.target) {
            case 'pause':
                for (const menusKey in menus) {
                    menus[menusKey].style.display = 'none';
                }
                menus.pause.style.display = 'flex';
                break;
            case 'continue':
                openPauseMenu();
                break;
            case 'save':
                break;
            case 'load':
                menus.pause.style.display = 'none';
                menus.load.style.display = 'flex';
                break;
            case 'newCharacter':
                menus.pause.style.display = 'none';
                menus.newApi.style.display = 'none';
                menus.newCharacter.style.display = 'flex';
                break;
            case 'newApi':
                menus.newCharacter.style.display = 'none';
                menus.newApi.style.display = 'flex';
                break;
            case 'settingsGeneral':
                menus.pause.style.display = 'none';
                menus.settingsApi.style.display = 'none';
                menus.settingsKeybindings.style.display = 'none';
                menus.settingsGeneral.style.display = 'flex';
                element('showFps').checked = settings.showFPS;
                element('showPlayerStats').checked = settings.showPlayerStats;
                element('scale').value = settings.scale;
                element('interval').value = settings.interval;
                break;
            case 'settingsApi':
                menus.settingsGeneral.style.display = 'none';
                menus.settingsKeybindings.style.display = 'none';
                menus.settingsApi.style.display = 'flex';
                element('apiKey').value = settings.apiKey;
                element('lat').value = settings.latitude;
                element('lon').value = settings.longitude;
                break;
            case 'settingsKeybindings':
                menus.settingsGeneral.style.display = 'none';
                menus.settingsApi.style.display = 'none';
                menus.settingsKeybindings.style.display = 'flex';
                let keys = element('keybindingsContainer');
                keys.replaceChildren();
                for (const key in settings.keybindings) {
                    let div = document.createElement('div');
                    let p = document.createElement('p');
                    p.textContent = key;
                    div.appendChild(p);
                    let button = document.createElement('button');
                    button.dataset.target = 'changeKey';
                    button.dataset.key = key;
                    button.textContent = settings.keybindings[key];
                    div.appendChild(button);
                    keys.appendChild(div);
                }
                break;
            case 'changeKey':
                event.target.addEventListener("keydown", ev => {
                    settings.keybindings[event.target.dataset.key] = ev.code;
                    ev.target.textContent = ev.code;
                    toStorage('settings', settings);
                }, {once: true});
                break;
            case 'saveSettingsGeneral':
                settings.showFPS = element('showFps').checked;
                settings.showPlayerStats = element('showPlayerStats').checked;
                settings.scale = parseFloat(element('scale').value);
                settings.interval = parseInt(element('interval').value);
                toStorage('settings', settings);
                break;
            case 'saveSettingsApi':
                settings.apiKey = element('apiKey').value;
                settings.latitude = parseFloat(element('lat').value);
                settings.longitude = parseFloat(element('lon').value);
                toStorage('settings', settings);
                break;
            case 'navigator':
                navigate();
                element('lat').value = settings.latitude;
                element('lon').value = settings.longitude;
                break;
            case 'search':
                geoCoderAPI(element('location').value).then(locations => {
                    let select = element('searchResults');
                    select.replaceChildren();
                    for (const location of locations) {
                        let option = document.createElement('option');
                        option.textContent = `${location.name}, ${location.state} (${location.country})`;
                        option.dataset.lat = location.lat;
                        option.dataset.lon = location.lon;
                        select.appendChild(option);
                    }
                });
                break;
            case 'selectResult':
                try {
                    let option = event.target.children[event.target.selectedIndex];
                    element('lat').value = option.dataset.lat;
                    element('lon').value = option.dataset.lon;
                } catch (ex) {
                    // do nothing
                }
                break;
            case 'create':
                break;
            case 'stats':
                menus.pause.style.display = 'none';
                menus.stats.style.display = 'flex';
                element('nameStats').innerText = `Statistics (${settings.username})`;
                let stats = element('statsContainer');
                stats.replaceChildren();
                for (const playerStatsKey in playerStats) {
                    let statItem = document.createElement('p');
                    statItem.textContent = `${playerStatsKey}: ${playerStats[playerStatsKey]}`;
                    stats.appendChild(statItem);
                }
                break;
            case 'quit':
                toStorage('settings', settings).then(quit);
                break;
        }
    });

    function openPauseMenu() {
        if (pauseMenu.style.visibility === 'hidden') {
            world.paused = true;
            pauseMenu.style.visibility = 'visible';
            menus.pause.style.display = 'flex';
        } else {
            world.paused = false;
            pauseMenu.style.visibility = 'hidden';
            for (const menusKey in menus) {
                menus[menusKey].style.display = 'none';
            }
        }
    }

    function openDebugMenu() {
        if (debugMenu.style.visibility === 'hidden') {
            world.paused = true;
            debugMenu.style.visibility = 'visible';
            // general
            element('showBoxes').checked = world.showBoxes;
            element('showLiveDebug').checked = world.showLiveDebug;
            // player
            element('hp').value = player.stats.hp;
            element('maxHp').value = player.stats.maxHP;
            element('mp').value = player.stats.mp;
            element('maxMp').value = player.stats.maxMP;
            element('xp').value = player.stats.xp;
            element('damage').value = player.stats.damage;
            element('speed').value = player.stats.speed;
            element('maxAir').value = player.maxAir;
            element('x').value = player.frame.x;
            element('y').value = player.frame.y;
            element('hasCollision').checked = player.hasCollision;
            // weather
            for (const weatherKey in weather) {
                element(weatherKey).value = weather[weatherKey];
            }
        } else {
            world.paused = false;
            debugMenu.style.visibility = 'hidden';
            // general
            world.showBoxes = element('showBoxes').checked;
            world.showLiveDebug = element('showLiveDebug').checked;
            // player
            player.stats.hp = parseFloat(element('hp').value);
            player.stats.maxHP = parseFloat(element('maxHp').value);
            player.stats.mp = parseFloat(element('mp').value);
            player.stats.maxMP = parseFloat(element('maxMp').value);
            player.stats.xp = parseFloat(element('xp').value);
            player.stats.damage = parseFloat(element('damage').value);
            player.stats.speed = parseFloat(element('speed').value);
            player.maxAir = parseFloat(element('maxAir').value);
            player.frame.x = parseFloat(element('x').value);
            player.frame.y = parseFloat(element('y').value);
            player.hasCollision = element('hasCollision').checked;
            // weather
            for (const weatherKey in weather) {
                let el = element(weatherKey).value;
                if (!isNaN(parseFloat(el))) {
                    weather[weatherKey] = parseFloat(el);
                } else {
                    weather[weatherKey] = el;
                }
            }
        }
    }
});
