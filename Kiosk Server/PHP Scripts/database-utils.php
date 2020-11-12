<?php
$test = "test";



function create_statement($query = null){
    return new statement($query);
}

function open_db_connection($ip = null, $dbCred = null, $nickName = null){
    //echo 'opening connectiong';
    if ($ip != null && $dbCred != null && $nickName != null){
        return new mysqli($ip,$dbCred[0], $dbCred[1], $nickName);
    }
    return null;
}

function close_db_connection($db = null){
    if ($db != null){
        $db->close();
    }
}

function query_db($dbConn = null,$statement = null){
    if ($statement != null && $dbConn !== null){
        if ($statement instanceof Statement){
            return $dbConn->query($statement->get_statement());
        }

    }

    return null;
}

?>