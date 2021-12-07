<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Seasonfall</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
    <script type="module" src="app/main.js"></script>
</head>
<body>
<form action="#" id="debug">
    <label for="apiKey">API Key <input type="text" id="apiKey"></label>
    <label for="location">Location <input type="text" id="location"></label>
<!--    <label for="units">-->
<!--        Units-->
<!--        <select name="units" id="units">-->
<!--            <option value="metric">Celsius</option>-->
<!--            <option value="imperial">Fahrenheit</option>-->
<!--            <option value="default">Kelvin</option>-->
<!--        </select>-->
<!--    </label>-->
    <button id="refreshButton">Get Weather</button>
</form>

<main>
    <canvas id="screen"></canvas>
    <div id="calling">Calling API</div>
</main>
</body>
</html>