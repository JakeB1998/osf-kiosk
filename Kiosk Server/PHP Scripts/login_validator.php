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
   
}




$paramString = null;
if (is_validated($client_email, $client_password)){
    $location = "../../kiosk program/src/main page/res/index.html";
    if ($client_email != null && $client_password != null){
        $appInfo = get_application_info();
        $paramString = addParameters([['key'=> 'authcode', 'value'=> $client_authcode], ['key'=> 'app-version', 'value'=> strval($appInfo[0])]]);
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
        $email_local = isset($_REQUEST[$email]) ? $_REQUEST[$email] : null;
        $password_local = isset($_REQUEST[$pwd]) ? $_REQUEST[$pwd] : null;
        
    }

    if ($email_local != null && $password_local != null){
           
        $conn =   open_db_connection('localhost', ['new_user','Redbirdp1'], 'login');
        if ($conn ->connect_errno){
            echo('connection failed: ' . $conn->connect_error);
        }
        $statement = new Statement();
       // $statement->select(["*"])->from()->table("members")->where("username")->equals($email_local);
       $statement->select(["*"])->from()->table("members");
        //echo $statement->get_statement();
        $result = query_db($conn, $statement);
      
        if ($result != null)
        {
            if ($result->num_rows > 0) {
                // output data of each row
                while($row = $result->fetch_row()) {
                echo  "<br>". $row;
                }
            } else {
                echo "0 results";
            }
            return true;
        }
        echo '<br>Authentificaiton failed not a valid user';
        return true;
    }

    return false;

}

function get_application_info(){
    $file = fopen('/osf project/kiosk program/src/main page/res/app-info.json', 'r');
    if (isset($file)){
        $jsonObj = json_decode($file);
        $results = [];
        if (isset($jsonObj)){
            $version = $jsonObj["version"];
            echo "<br>" . "version: " . $version;
            array_push($results, strval($version));
            
        }

        return $results;
    }
    return null;
}


?>