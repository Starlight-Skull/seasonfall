window.addEventListener('load', function () {
    document.getElementById('test-key').addEventListener('click', () => {
        if (document.getElementById('register-key').value && document.getElementById('register-location').value) {
            let apiKey = document.getElementById('register-key');
            let location = document.getElementById('register-location');
            let button = document.getElementById('register-button');
            fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey.value}&q=${location.value}`)
                .then(res => {
                    return res.json();
                })
                .then((json) => {
                    window.alert(JSON.stringify(json));
                    location.value = json.name + ',' + json.sys.country;
                    button.disabled = json.cod !== 200;
                });
        }
    });
});