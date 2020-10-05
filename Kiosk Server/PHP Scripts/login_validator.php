<?php
$username = 'fname';
$pwd = 'fpwd';
$email = 'femail';
$client_username = null;
$client_password = null;
$client_email = null;
session_start();
ob_start();

if (isset($_POST[$username])) {
    $client_username = $_POST[$username];
    echo 'username: ' . $client_username;
}
if (isset($_POST[$pwd])) {
    $client_password = $_POST[$pwd];
    echo 'password: ' .$client_password;
}

if (isset($_POST[$email])) {
    $client_email = $_POST[$email];
    echo 'email: ' . $client_email;
}


if (is_validated($client_username, $client_password)){
    echo 'validation started';
    $location = "../../Kiosk Program/src/main page/index.html";
    $paramString = null;
    if ($client_username != null && $client_password != null){
        $paramString = addParameters([['key'=> 'username', 'value'=> $client_username],
        ['key'=> 'password', 'value'=> $client_password]]);
    }
    $location = $paramString != null ? $location . $paramString : $location;
    echo $location;
    header("Location: " . $location);
    echo '<br>exited';
    exit();
}

function addParameters($params = null){
    echo '<br>adding params';;
    if ($params != null){
        $str = "?";
        for ($i =0; $i < sizeof($params); $i++){
            echo $i;
            if ($i > 0){
                $str .= "&";
            }
            $key = $params[$i]['key'];
            $value =  $params[$i]['value'];
            $str .= $key . '=' . $value;
            echo  "<br> " . $str;
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
function validate_cred($username_local = null, $password_local = null){
    global $username;
    global $pwd;
    if ($username_local != null && $password_local != null){
        return true;
    }
    else{
        $username_local = isset($_REQUEST[$username]) ? $_REQUEST[$username] : null;
        $password_local = isset($_REQUEST[$pwd]) ? $_REQUEST[$pwd] : null;
        if ($username_local != null && $password_local != null){
            return true;
        }
    }

    return false;
}
?>