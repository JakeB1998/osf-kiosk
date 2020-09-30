<?php
$username = "fname";
$pwd = "fpwd";
$email = "femail";
$client_username = $_POST($username);
session_start();
if (isset($client_username) {
    
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
?>