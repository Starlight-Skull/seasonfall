import {debug} from "../app/globals.js"
import {getWeather} from "../app/helpers.js";

const apiKey = document.getElementById('apiKey').value;
const location = document.getElementById('location').value;

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


    });

    // getWeather(apiKey, location);
    // reload weather every 10 minutes
    setInterval(() => {
        // getWeather(apiKey, location);
    }, 600000);
});
