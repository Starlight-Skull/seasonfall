<?php
if (!isset($_SESSION)) {
    session_start();
}

require_once './config.php';

$db = getDatabase();

$formErrors = array();

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';


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

    if (trim($username) !== 'root' && trim($password) !== 'Qwerty123') {
        $allOk = false;
        $formErrors[] = '';
    }

    if ($allOk) {
        $_SESSION['user'] = crypt($username . $password, 'ewqpoirjpaaffmqpewwonfnpqi');
        header('Location: ./index.php');
    }
} ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Seasonfall | Login</title>
</head>
<body>
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
    <?php if (count($formErrors) !== 0) {
        echo '<ul>';
        foreach ($formErrors as $error) {
            echo '<li>' . $error . '</li>';
        }
        echo '</ul>';
    } ?>

    <div id="username-container">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" placeholder="Username" value="" autofocus>
        <?PHP if (isset($usernameError)) {
            echo '<p class="error">' . $usernameError . '</p>';
        } ?>
    </div>

    <div id="password-container">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Password" value="">
        <?PHP if (isset($passwordError)) {
            echo '<p class="error">' . $passwordError . '</p>';
        } ?>
    </div>

    <input type="hidden" name="moduleAction" value="login"/>
    <button type="submit">Log In</button>
</form>
</body>
</html>