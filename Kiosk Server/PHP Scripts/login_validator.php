<?php
$username = 'fname';
$pwd = 'fpwd';
$email = 'femail';
$client_username = $_POST[$username];
session_start();

if (isset($client_username)) {
    
    echo 'Username: $client_username';
}
$client_password = $_POST[$pwd];
if (isset($client_password)) {
    echo 'Password: $client_password';
}
$client_email = $_POST[$email];
if (isset($client_email)) {
    echo 'Email $client_email';
}


if (is_validated($client_username, $client_password)){
    header("Location: ../../Kiosk Program/src/main/index.html");
    echo 'exited';
    exit();
}

/**
 * Checks if is validated
 */
function is_validated($username = null, $password = null){
    return validate_cred($username, $password);
}

/**
 * Checks to see if credentials are validated
 */
function validate_cred($username = null, $password = null){
    if ($username != null && $password != null){
        //check database
    }

    return false;
}
?>