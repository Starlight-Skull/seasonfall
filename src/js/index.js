import {debug} from "../app/globals.js"
import {getWeather} from "../app/helpers.js";

let apiKey = '';
let location = 'Ghent,BE';

window.addEventListener('load', function () {
    const debugMenu = document.getElementById('debug');

    window.addEventListener('keypress', ev => {
        if (ev.key === '`') {
            debug.showBoxes = !debug.showBoxes;
            debugMenu.style.visibility = debugMenu.style.visibility === 'visible' ? 'hidden' : 'visible';
        }
    });

    document.getElementById('refreshButton').addEventListener('click', (e) => {
        e.preventDefault();
        if (document.getElementById('apiKey').value !== '') {
            apiKey = document.getElementById('apiKey').value;
        }
        if (document.getElementById('location').value !== '') {
            location = document.getElementById('location').value;
        }
    });

    // getWeather(apiKey, location);
    // reload weather every 10 minutes
    setInterval(() => {
        // getWeather(apiKey, location);
    }, 600000);
});
