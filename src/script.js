import {debug} from "./app/globals.js"

// todo add api key from users db
let apiKey = '';
let location = 'Ghent,BE';

function getWeather() {
    if (apiKey && location) {
        document.getElementById('calling').style.visibility = 'visible';
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${location}`)
            .then(res => {
                return res.json();
            })
            .then(json => {
                console.log(json);
                setTimeout(() => {
                    document.getElementById('calling').style.visibility = 'hidden';
                }, 1500);
            });
    }
}

window.addEventListener('load', function () {
    const debugMenu = document.getElementById('debug');

    window.addEventListener('keypress', ev => {
        if (ev.key === '`') {
            debug.showBoxes = !debug.showBoxes;
            // debugMenu.style.visibility = debugMenu.style.visibility === 'visible' ? 'hidden' : 'visible';
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
        // getWeather();
    });

    // getWeather(location);
    // reload weather every 10 minutes
    setInterval(() => {
        // getWeather();
    }, 600000);
});
