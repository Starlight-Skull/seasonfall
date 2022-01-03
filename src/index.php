<?php
if (!isset($_SESSION)) {
    session_start();
}

require_once './php/config.php';

try {
    $db = getDatabase();
    $stmtSELECT = $db->prepare('SELECT `id`, `key`, `location` FROM `users` WHERE `name` = ? && `password` = ?;');
} catch (PDOException $e) {
    $_SESSION['error'] = $e->getMessage();
    header('Location: ./php/login.php');
    exit();
}

$username = $_SESSION['username'] ?? '';
$password = $_SESSION['password'] ?? '';
$id = '';
$key = '';
$location = '';

if (trim($username) !== '' && trim($password) !== '') {
    $stmtSELECT->execute(array($username, $password));
    $rows = $stmtSELECT->fetchAll();
    if (count($rows) !== 1) {
        header('Location: ./php/login.php');
        exit();
    }
    $id = $rows[0]['id'];
    $key = $rows[0]['key'];
    $location = $rows[0]['location'];
} else {
    header('Location: ./php/login.php');
    exit();
}

if (isset($_POST['moduleAction']) && $_POST['moduleAction'] === 'logout') {
    session_destroy();
    header('Location: ./php/login.php');
    exit();
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Security-Policy"
          content="default-src 'self' 'unsafe-inline' https://api.openweathermap.org/data/2.5/weather http://localhost:3000/stats">
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
            <label for="useAPI">Use API Data</label>
            <input type="checkbox" id="useAPI" name="useAPI">
        </div>
        <h3>General</h3>
        <div>
            <label for="userId">User ID</label>
            <input type="number" id="userId" placeholder="0" disabled value="<?PHP h($id) ?>">
        </div>
        <div>
            <label for="username">Username</label>
            <input type="text" id="username" placeholder="Username" value="<?PHP h($username) ?>">
        </div>
        <div>
            <label for="showBoxes">Show Hit Boxes</label>
            <input type="checkbox" id="showBoxes" name="showBoxes">
        </div>
        <div>
            <label for="showLiveDebug">Show Live Data</label>
            <input type="checkbox" id="showLiveDebug" name="showTrackedEntity">
        </div>
        <div>
            <label for="showFPS">Show FPS</label>
            <input type="checkbox" id="showFPS" name="showFPS">
        </div>
        <div>
            <label for="showPlayerStats">Show Player Stats</label>
            <input type="checkbox" id="showPlayerStats" name="showPlayerStats">
        </div>
        <form action="<?php h($_SERVER['PHP_SELF']); ?>" method="POST">
            <input type="hidden" name="moduleAction" value="logout"/>
            <button type="submit">Log Out</button>
        </form>
    </section>
    <section>
        <h3>Weather</h3>
        <div>
            <label for="main">Name</label>
            <select name="main" id="main" disabled>
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
        <div>
            <input type="button" title="API is called every 10 minutes." id="callAPI" value="Call API">
        </div>
    </section>
    <section>
        <h3>Player</h3>
        <div>
            <label for="hp">HP</label>
            <input type="text" id="hp">
        </div>
        <div>
            <label for="maxHp">Max HP</label>
            <input type="text" id="maxHp">
        </div>
        <div>
            <label for="mp">MP</label>
            <input type="text" id="mp">
        </div>
        <div>
            <label for="maxMp">Max MP</label>
            <input type="text" id="maxMp">
        </div>
        <div>
            <label for="xp">XP</label>
            <input type="text" id="xp">
        </div>
        <div>
            <label for="damage">Damage</label>
            <input type="text" id="damage">
        </div>
        <div>
            <label for="speed">Speed</label>
            <input type="text" id="speed">
        </div>
        <div>
            <label for="maxAir">Max Air Time</label>
            <input type="text" id="maxAir">
        </div>
        <div>
            <label for="x">x</label>
            <input type="text" id="x">
        </div>
        <div>
            <label for="y">y</label>
            <input type="text" id="y">
        </div>
        <div>
            <label for="hasCollision">Collision</label>
            <input type="checkbox" id="hasCollision">
        </div>
        <div>
            <input type="button" id="update" value="Update">
        </div>
    </section>
</div>
<div id="pauseMenu">
    <section>
        <h3>Global Stats</h3>
        <div id="globalGraphs">

        </div>
        <table>
            <thead>
            <tr>
                <th>User ID</th>
                <th>Time (s)</th>
                <th>Kills</th>
                <th>Attacks</th>
                <th>Attacks Hit</th>
                <th>Damage Taken</th>
                <th>Damage Dealt</th>
            </tr>
            </thead>
            <tbody id="globalTableData"></tbody>
        </table>
    </section>
    <section id="modal">
        <h3>Paused</h3>
    </section>
    <section id="localStats">
        <h3><?PHP h($username) ?>'s Stats</h3>
        <div id="localGraphs">

        </div>
        <table>
            <thead>
            <tr>
                <th>Time (s)</th>
                <th>Kills</th>
                <th>Attacks</th>
                <th>Attacks Hit</th>
                <th>Damage Taken</th>
                <th>Damage Dealt</th>
            </tr>
            </thead>
            <tbody id="localTableData"></tbody>
        </table>
    </section>
</div>
<main>
    <canvas id="screen"></canvas>
</main>
</body>
</html>