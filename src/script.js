;(function () {
    'use strict';

    // todo add api key from users db
    let apiKey = '';
    const units = 'metric';
    let location = 'Ghent,BE';

    // navigator.geolocation.getCurrentPosition((location) => {
    //     console.log(location)
    // });

    function getWeather(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${location}&units=${units}`)
            .then(res => {
                return res.json();
            }).then(json => {
                // todo error checking
            console.log(json);
        });
    }

    window.addEventListener('load', function () {
        const debug = document.getElementById('debug');
        const screen = document.getElementById('screen');

        document.addEventListener('keypress', ev => {
            if (ev.key === '`') {
                debug.style.visibility = debug.style.visibility === 'visible' ? 'hidden' : 'visible';
            }
        });

        document.getElementById('refreshButton').addEventListener('click', (e) => {
            e.preventDefault();
            // getWeather(location);
            if (document.getElementById('apiKey').value !== '') {
                apiKey = document.getElementById('apiKey').value;
            }
            if (document.getElementById('location').value !== '') {
                location = document.getElementById('location').value;
            }
            console.log(`weather ${apiKey} ${location}`);
        });

        console.log('weather');
        setInterval(() => {
            // getWeather(location);
            console.log('weather');
            // todo add UI icon
        }, 600000);
    });
})();