window.addEventListener('load', function () {
    document.getElementById('test-key').addEventListener('click', () => {
        if (document.getElementById('register-key').value && document.getElementById('register-location').value) {
            let apiKey = document.getElementById('register-key').value;
            let location = document.getElementById('register-location').value;
            fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${location}`)
                .then(res => {
                    return res.json();
                })
                .then((json) => {
                    window.alert(JSON.stringify(json));
                });
        }
    });
});