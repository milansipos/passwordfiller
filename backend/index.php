<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

    $page = $_GET['page'];

    if ($page == 'add_password') {
        include "queryparameters/add_password.php";
    }
    elseif ($page == "get_password") {
        include "queryparameters/get_password.php";
    } else {
        include "404.php";
    }
?>