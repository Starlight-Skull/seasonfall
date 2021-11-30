;(function () {
    'use strict';

    const apiKey = '4042c10a2f6340a71458988530a305fd';
    const units = 'metric';
    const location = 'Ghent,BE';

    function getWeather(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${location}&units=${units}`)
            .then(res => {
                return res.json();
            }).then(json => {
            console.log(json);
        });
    }

    window.addEventListener('load', function () {
        const debug = document.getElementById('debug');
        const screen = document.getElementById('screen');

        document.addEventListener('keypress', ev => {
            if (ev.key === '`') {
                debug.hidden = !debug.hidden;
            }
        });

        document.getElementById('refreshButton').addEventListener('click', () => {
            getWeather(location);
        });

        getWeather(location);
        setInterval(() => {
            getWeather(location);
            // todo add UI icon
        }, 600000);
    });
})();