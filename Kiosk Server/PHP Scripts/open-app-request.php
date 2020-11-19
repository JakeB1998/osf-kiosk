<?php

session_start();

ob_start();

$data = explode(',',$_POST['form-input']);

$filePath = $data[0]; 
chdir($filePath);
header("Location: " . $filePath);

?>
