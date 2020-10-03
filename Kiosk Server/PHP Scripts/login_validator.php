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
    $location = "../../Kiosk Program/src/main/index.html";
    $paramString = addParameters([['key'=> 'username', 'value'=> $client_username],
                                ['key'=> 'password', 'value'=> $client_password]]);
    $location = $paramString != null ? $location + $paramString : $location;
    header("Location: " + $location);
    echo 'exited';
    exit();
}

function addParameters($params = null){
    if ($params != null){
        $str = "/?";
        for ($i =0; $i < sizeof($params); $i++){
            if ($i > 0){
                $str += "&";
            }
            $key = $params[$i]['key'];
            $value =  $params[$i]['value'];
            $str += $key + '=' + $value;
            echo $str;
        }
        return $str;
    }

    return null;
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