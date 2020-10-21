<?php

session_start();
chdir("../../");
ob_start();

$data = explode(',',$_POST['form-input']);

$filePath = $data[0]; 
readfile($filePath, false);

?>
