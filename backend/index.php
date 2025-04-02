<?php

$db_host = getenv('DB_HOST');
$db_user = getenv('DB_USER');
$db_pass = getenv('DB_PASS');
$db_name = getenv('DB_NAME');


echo $db_host . $db_user . $db_pass . $db_name;

?>