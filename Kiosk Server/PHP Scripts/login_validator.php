<?php
$username = 'fname';
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
?>