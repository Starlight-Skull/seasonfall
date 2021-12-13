<?php
session_start();

$formErrors = array();

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (isset($_POST['moduleAction']) && ($_POST['moduleAction'] === 'login')) {
    $allOk = true;

    if (trim($username) === '') {
        $allOk = false;
        $formErrors[] = '';
    }

    if (trim($password) === '') {
        $allOk = false;
        $formErrors[] = '';
    }

    if (trim($username) !== 'root' && trim($password) !== 'Qwerty123') {
        $allOk = false;
        $formErrors[] = '';
    }

    if ($allOk) {
        $_SESSION['user'] = crypt($username . $password, 'ewqpoirjpaaffmqpewwonfnpqi');
        header('Location: ../index.php');
    }
}
?>

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
    <?php
    if (count($formErrors) !== 0) {
        echo '    <ul>';
        foreach ($formErrors as $error) {
            echo '        <li>' . $error . '</li>';
        }
        echo '    </ul>';
    } ?>

    <div id="username-container">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" value="<?php echo $username; ?>">
        <p class="error">Please enter your username</p>
    </div>

    <div id="password-container">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" value="<?php echo $password; ?>">
        <?PHP if (isset($formErrors['passwordError'])) {
            echo '        <p class="error">Please enter your password.</p>';
        } ?>
    </div>

    <input type="hidden" name="moduleAction" value="login"/>
    <button type="submit">Log In</button>
</form>
</body>
</html>