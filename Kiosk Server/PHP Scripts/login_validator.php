<?php


require 'database-utils.php';
require dirname(__FILE__).'/../php classes/statement.php';

$username = 'fname';
$pwd = 'fpwd';
$email = 'femail';
$client_username = null;
$client_password = null;
$client_email = null;
$client_authcode = null;
chdir("../../");
session_start();
<<<<<<< HEAD
ob_start();


if (isset($_POST[$username])) {
    $client_username = $_POST[$username];
    //echo 'username: ' . $client_username;
}
if (isset($_POST[$pwd])) {
    $client_password = $_POST[$pwd];
   // echo 'password: ' .$client_password;
}

if (isset($_POST[$email])) {
    $client_email = $_POST[$email];
    //echo 'email: ' . $client_email;
}

if(isset($_POST['fauthcode'])){
    $client_authcode = $_POST['fauthcode'];
=======
<<<<<<< HEAD
if (isset($client_username)) {
    
    echo $client_username;
>>>>>>> 837c8ee7575852c4adefb560661555701903b280
}

$paramString = null;
if (is_validated($client_email, $client_password)){
    $location = "../../kiosk program/src/main page/res/index.html";
    if ($client_email != null && $client_password != null){
        $paramString = addParameters([['key'=> 'authcode', 'value'=> $client_authcode]]);
    }
    $auth = base64_encode($client_email . ":" .  $client_password);
    $context = stream_context_create([
    "http" => [
        "header" => "Authorization: Basic 
        " . $auth
    ]
]);
    $location = $paramString != null ? $location . $paramString : $location;
    //header("Location: " . $client_username . ":". $client_password . "@" . $location);
    echo "<a id='param-url' href='$location'>Start</a>";
    readfile('kiosk program/src/main page/res/index.html', false, $context);  //'var/www/html/OSF Project/Kiosk Program/src/main page/index.html'
    exit();
}

function addParameters($params = null){
    if ($params != null){
        $str = "?";
        for ($i =0; $i < sizeof($params); $i++){
            if ($i > 0){
                $str .= "&";
            }
            $key = $params[$i]['key'];
            $value =  $params[$i]['value'];
            $str .= $key . '=' . $value;
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
<<<<<<< HEAD

//SELECT * FROM member WHERE email=value.
/**
 * Checks to see if credentials are validated
 */
function validate_cred($email_local = null, $password_local = null){
    global $email;
    global $pwd;
    if ($email_local != null && $password_local != null){
        
    }
    else{
        $email_local_local = isset($_REQUEST[$email]) ? $_REQUEST[$email] : null;
        $password_local = isset($_REQUEST[$pwd]) ? $_REQUEST[$pwd] : null;
        
    }

    if ($email_local != null && $password_local != null){
           
        $conn =   open_db_connection('localhost', ['admin-e','admin-p'], 'db');
        $statement = new Statement();
        $statement->drop()->table("member");
        $result = query_db($conn, );
      
        if ($result != null)
        {
            if ($result->num_rows > 0) {
                // output data of each row
                while($row = $result->fetch_assoc()) {
                echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
                }
            } else {
                echo "0 results";
            }
            return true;
        }
        echo 'Authentificaiton failed not a valid user';
        return true;
    }

    return false;
=======
$client_email = $_POST[$email];
if (isset($client_email)) {
    echo $client_email;
=======

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
>>>>>>> 06f3faddeb73fd955d46a671a8de30d02ba71225
>>>>>>> 837c8ee7575852c4adefb560661555701903b280
}


?>