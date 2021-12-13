<?php
if (!isset($_SESSION)) {
    session_start();
}

require_once './config.php';

$db = getDatabase();

$stmtSELECT = $db->prepare('select id from users where name = ? && password = ?;');

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

$usernameError = '';
$passwordError = '';
$formError = '';

function h($s)
{
    echo htmlspecialchars($s, ENT_QUOTES, 'utf-8');
}

if (isset($_POST['moduleAction']) && ($_POST['moduleAction'] === 'login')) {
    $allOk = true;

    if (trim($username) === '') {
        $allOk = false;
        $usernameError = 'Please enter your username';
    }

    if (trim($password) === '') {
        $allOk = false;
        $passwordError = 'Please enter your password';
    }

    if (trim($username) !== '' && trim($password) !== '') {
        $password = hash_pbkdf2('sha256', $password, 'kjfdpoijqpowjp', 8);
        $stmtSELECT->execute(array($username, $password));
        $rows = $stmtSELECT->fetchAll();
        if (count($rows) !== 1) {
            $allOk = false;
            $formError = 'Your username or password do not match.';
        }
    }

    if ($allOk) {
        $_SESSION['user'] = array($rows[0], $username, $password);
        header('Location: ../index.php');
    }
} ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../css/login.css">
    <title>Seasonfall | Login</title>
</head>
<body>
<form action="<?php h($_SERVER['PHP_SELF']); ?>" method="POST">
    <?php
    echo '<p class="error">' . h($formError) . '</p>' ?>

    <div id="username-container">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" placeholder="Username" value="<?PHP h($username) ?>" autofocus>
        <?PHP if (isset($usernameError)) {
            echo '<p class="error">' . h($usernameError) . '</p>';
        } ?>
    </div>

    <div id="password-container">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Password" value="<?PHP h($password) ?>">
        <?PHP if (isset($passwordError)) {
            echo '<p class="error">' . h($passwordError) . '</p>';
        } ?>
    </div>

    <input type="hidden" name="moduleAction" value="login"/>
    <button type="submit">Log In</button>
</form>
</body>
</html>