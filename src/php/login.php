<?php if (!isset($_SESSION)) {
    session_start();
}

$usernameLogin = '';
$passwordLogin = '';
$usernameRegister = '';
$passwordRegister = '';
$passwordHashed = '';
$apiKey = '';
$location = '';

$formErrors = array();
if (isset($_SESSION['error'])) {
    $formErrors[] = $_SESSION['error'];
}

require_once './config.php';

try {
    $db = getDatabase();
    $stmtSELECT = $db->prepare('SELECT `id` FROM `users` WHERE `name` = ? && `password` = ?;');
    $stmtSELECT_user = $db->prepare('SELECT `id` FROM `users` WHERE `name` = ?;');
    $stmtINSERT = $db->prepare('INSERT INTO `users` (`name`, `password`, `key`, `location`, `first_date`) VALUES (?, ?, ?, ?, NOW());');
} catch (PDOException $e) {
    $formErrors[] = 'Database error: ' . $e->getMessage();
}

if (isset($db, $stmtSELECT, $stmtSELECT_user, $stmtINSERT, $_POST['moduleAction'])) {
    if ($_POST['moduleAction'] === 'login') {
        $allOK = true;
        $usernameLogin = $_POST['login-username'] ?? '';
        $passwordLogin = $_POST['login-password'] ?? '';

        if (trim($usernameLogin) === '') {
            $formErrors[] = 'Please enter your username.';
            $allOK = false;
        }
        if (trim($passwordLogin) === '') {
            $formErrors[] = 'Please enter your password.';
            $allOK = false;
        } else {
            $passwordHashed = hash_pbkdf2('sha256', $passwordLogin, 'kjfdpoijqpowjp', 8);
        }
        if (trim($usernameLogin) !== '' && trim($passwordHashed) !== '') {
            $stmtSELECT->execute(array($usernameLogin, $passwordHashed));
            $rows = $stmtSELECT->fetchAll();
            if (count($rows) !== 1) {
                $formErrors[] = 'Your username or password do not match.';
                $allOK = false;
            }
        }
        if ($allOK) {
            $_SESSION['username'] = $usernameLogin;
            $_SESSION['password'] = $passwordHashed;
            header('Location: /');
            exit();
        }
    } elseif ($_POST['moduleAction'] === 'register') {
        $allOK = true;
        $usernameRegister = $_POST['register-username'] ?? '';
        $passwordRegister = $_POST['register-password'] ?? '';
        $apiKey = $_POST['register-key'] ?? '';
        $location = $_POST['register-location'] ?? '';

        if (trim($usernameRegister) === '') {
            $formErrors[] = 'Please enter a username.';
            $allOK = false;
        }
        if (trim($passwordRegister) === '') {
            $formErrors[] = 'Please enter a password.';
            $allOK = false;
        } else {
            $passwordHashed = hash_pbkdf2('sha256', $passwordRegister, 'kjfdpoijqpowjp', 8);
        }
        if (trim($apiKey) === '') {
            $formErrors[] = 'Please enter a valid API key.';
            $allOK = false;
        }
        if (trim($location) === '') {
            $formErrors[] = 'Please enter a location.';
            $allOK = false;
        }
        if (trim($usernameRegister) !== '') {
            $stmtSELECT_user->execute(array($usernameRegister));
            $rows = $stmtSELECT_user->fetchAll();
            if (count($rows) !== 0) {
                $formErrors[] = 'This username is already taken.';
                $allOK = false;
            }
        }
        if ($allOK) {
            $stmtINSERT->execute(array($usernameRegister, $passwordHashed, $apiKey, $location));
            $usernameLogin = $usernameRegister;
            $passwordLogin = $passwordRegister;
            $usernameRegister = '';
            $passwordRegister = '';
            $passwordHashed = '';
            $apiKey = '';
            $location = '';
            header('Location ./login.php');
        }
    }
} ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="">
    <link rel="stylesheet" href="../css/login.css">
    <link rel="shortcut icon" href="../favicon.ico">
    <title>Seasonfall | Login</title>
    <script type="module" src="../js/login.js"></script>
</head>
<body>
<main>
    <?php if (count($formErrors) !== 0) {
        echo '<ul class="error">' . PHP_EOL;
        foreach ($formErrors as $error) {
            echo <<<EOT
    <li>$error</li>

EOT;
        }
        echo '</ul>' . PHP_EOL;

    } ?>
    <form action="<?php h($_SERVER['PHP_SELF']); ?>" method="POST">
        <h2>Log In</h2>
        <div>
            <label for="login-username">Username</label>
            <input type="text" name="login-username" id="login-username" placeholder="Username"
                   value="<?PHP h($usernameLogin) ?>"
                   autofocus>
        </div>
        <div>
            <label for="login-password">Password</label>
            <input type="password" name="login-password" id="login-password" placeholder="Password"
                   value="<?PHP h($passwordLogin) ?>">
        </div>
        <input type="hidden" name="moduleAction" value="login"/>
        <button type="submit">Log In</button>
    </form>
    <form action="<?php h($_SERVER['PHP_SELF']); ?>" method="POST">
        <h2>Register</h2>
        <div>
            <label for="register-username">Username</label>
            <input type="text" name="register-username" id="register-username" placeholder="Username"
                   value="<?PHP h($usernameRegister) ?>">
        </div>
        <div>
            <label for="register-password">Password</label>
            <input type="password" name="register-password" id="register-password" placeholder="Password"
                   value="<?PHP h($passwordRegister) ?>">
        </div>
        <div>
            <label for="register-key">API Key</label>
            <input type="text" name="register-key" id="register-key" placeholder="OpenWeatherMap Key"
                   value="<?PHP h($apiKey) ?>">
        </div>
        <div>
            <label for="register-location">Location</label>
            <input type="text" name="register-location" id="register-location" placeholder="ex. 'Ghent,BE'"
                   value="<?PHP h($location) ?>">
        </div>
        <button type="button" id="test-key">Test API</button>
        <input type="hidden" name="moduleAction" value="register"/>
        <button type="submit" id="register-button">Register</button>
    </form>
</main>
</body>
</html>