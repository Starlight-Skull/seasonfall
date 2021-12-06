;(function () {
    'use strict';

    // todo add api key from users db
    let apiKey = '463c0e168cf1a165454e8fb210552892';
    let location = 'Ghent,BE';

    // navigator.geolocation.getCurrentPosition((location) => {
    //     console.log(location)
    // });

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
        const debug = document.getElementById('debug');

        window.addEventListener('keypress', ev => {
            if (ev.key === '`') {
                debug.style.visibility = debug.style.visibility === 'visible' ? 'hidden' : 'visible';
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
})();