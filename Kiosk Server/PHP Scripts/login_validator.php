<?php
$username = 'fname';
<<<<<<< HEAD
$pwd = "fpwd";
$email = "femail";
session_start();
if (isset($_POST($username))) {
    $client_username = $_POST($username);
    echo $client_username;
}
if (isset($_POST($pwd))) {
    $client_password = $_POST($pwd);
    echo $client_password;
}
if (isset($_POST($email))) {
    $client_email = $_POST($email);
    echo $client_email;
}
=======
$pwd = 'fpwd';
$email = 'femail';
$client_username = $_POST[$username];
session_start();
if (isset($client_username)) {
    
    echo $client_username;
}
$client_password = $_POST[$pwd];
if (isset($client_password)) {
    echo $client_password;
}
$client_email = $_POST[$email];
if (isset($client_email)) {
    echo $client_email;
}

header("Location: ../../Kiosk Program/src/main/index.html");
die();
>>>>>>> db274908a92f596f3e56fea4d9e78808121c43db
?>