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
        $_SESSION['error'] = 'User not found in database.';
        header('Location: ./php/login.php');
        exit();
    }
    $key = $rows[0]['key'];
    $location = $rows[0]['location'];
} else {
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
    <link rel="stylesheet" href="css/app.css">
    <link rel="shortcut icon" href="./favicon.ico">
    <title>Seasonfall</title>
    <script type="module" src="js/index.js"></script>
    <script type="module" src="app/main.js"></script>
</head>
<body>
<form action="#" id="debug">
    <label for="apiKey">API Key <input type="text" id="apiKey" placeholder="API Key" value="<?PHP h($key) ?>"></label>
    <label for="location">Location <input type="text" id="location" placeholder="Location" value="<?PHP h($location) ?>"></label>
<!-- todo fill with api response params -->
    <button id="refreshButton">Get Weather</button>
</form>
<main>
    <canvas id="screen"></canvas>
</main>
</body>
</html>