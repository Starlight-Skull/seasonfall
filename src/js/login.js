import {getWeather} from "../app/helpers.js";

window.addEventListener('load', function () {
    document.getElementById('test-key').addEventListener('click', () => {
        if (document.getElementById('register-key').value && document.getElementById('register-location').value) {
            getWeather(document.getElementById('register-key').value, document.getElementById('register-location').value)
                .then((json) => {
                    window.alert(JSON.stringify(json));
                });
        }
    });
});