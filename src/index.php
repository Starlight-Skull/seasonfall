<?php
if (!isset($_SESSION)) {
    session_start();
}

require_once './php/config.php';

try {
    $db = getDatabase();
    $stmtSELECT = $db->prepare('SELECT `key`, `location` FROM `users` WHERE `name` = ? && `password` = ?;');
} catch (PDOException $e) {
    $_SESSION['error'] = $e->getMessage();
    header('Location: ./php/login.php');
    exit();
}

$username = $_SESSION['username'] ?? '';
$password = $_SESSION['password'] ?? '';
$key = '';
$location = '';

if (trim($username) !== '' && trim($password) !== '') {
    $stmtSELECT->execute(array($username, $password));
    $rows = $stmtSELECT->fetchAll();
    if (count($rows) !== 1) {
        header('Location: ./php/login.php');
        exit();
    }
    $key = $rows[0]['key'];
    $location = $rows[0]['location'];
} else {
    header('Location: ./php/login.php');
    exit();
}

if (isset($_POST['moduleAction']) && $_POST['moduleAction'] === 'logout') {
    session_destroy();
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/app.css">
    <link rel="shortcut icon" href="./favicon.ico">
    <title>Seasonfall</title>
    <script type="module" src="js/data.js"></script>
    <script type="module" src="app/main.js"></script>
</head>
<body>
<div id="debug">
    <section>
        <h3>API</h3>
        <div>
            <label for="apiKey">API Key</label>
            <input type="text" id="apiKey" placeholder="API Key" value="<?PHP h($key) ?>">
        </div>
        <div>
            <label for="location">Location</label>
            <input type="text" id="location" placeholder="Location" value="<?PHP h($location) ?>">
        </div>
        <div title="API is called every 10 minutes.">
            <label for="useAPI">Use API data</label>
            <input type="checkbox" id="useAPI" name="useAPI">
        </div>
        <h3>General</h3>
        <div>
            <label for="showBoxes">Show hit boxes</label>
            <input type="checkbox" id="showBoxes" name="showBoxes">
        </div>
        <div>
            <label for="showTrackedEntity">Show tracked entity</label>
            <input type="checkbox" id="showTrackedEntity" name="showTrackedEntity">
        </div>
        <form action="<?php h($_SERVER['PHP_SELF']); ?>" method="POST">
            <input type="hidden" name="moduleAction" value="logout"/>
            <button type="submit">Log Out</button>
        </form>
        <div>
            <input type="button" title="API is called every 10 minutes." id="callAPI" value="Call API">
        </div>
        <div>
            <input type="button" id="update" value="Update">
        </div>
    </section>
    <section>
        <h3>Weather</h3>
        <div>
            <label for="main">Name</label>
            <select name="main" id="main">
                <option value="Thunderstorm">Thunderstorm</option>
                <option value="Drizzle">Drizzle</option>
                <option value="Rain">Rain</option>
                <option value="Snow">Snow</option>
                <option value="Mist">Mist</option>
                <option value="Smoke">Smoke</option>
                <option value="Haze">Haze</option>
                <option value="Dust">Dust</option>
                <option value="Fog">Fog</option>
                <option value="Sand">Sand</option>
                <option value="Ash">Ash</option>
                <option value="Squall">Squall</option>
                <option value="Tornado">Tornado</option>
                <option value="Clear">Clear</option>
                <option value="Clouds">Clouds</option>
            </select>
        </div>
        <div>
            <label for="temp">Temperature (&deg;C)</label>
            <input type="text" id="temp">
        </div>
        <div>
            <label for="windSpeed">Wind Speed (m/s)</label>
            <input type="text" id="windSpeed">
        </div>
        <div>
            <label for="windDeg">Wind Degrees</label>
            <select id="windDeg" name="windDeg">
                <option value="East">East</option>
                <option value="West">West</option>
            </select>
        </div>
        <div>
            <label for="clouds">Clouds (%)</label>
            <input type="text" id="clouds">
        </div>
        <div>
            <label for="rain">Rain (mm/1h)</label>
            <input type="text" id="rain">
        </div>
        <div>
            <label for="snow">Snow (mm/1h)</label>
            <input type="text" id="snow">
        </div>
        <div>
            <label for="time">Timestamp (hmm)</label>
            <input type="text" id="time">
        </div>
        <div>
            <label for="sunrise">Sunrise (hmm)</label>
            <input type="text" id="sunrise">
        </div>
        <div>
            <label for="sunset">Sunset (hmm)</label>
            <input type="text" id="sunset">
        </div>
    </section>
</div>
<main>
    <canvas id="screen"></canvas>
</main>
</body>
</html>