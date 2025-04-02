<?php
//phpinfo();

$db_host = getenv('DB_HOST');
$db_user = getenv('DB_USER');
$db_pass = getenv('DB_PASS'); 
$db_name = getenv('DB_NAME');

echo $db_host . $db_user . $db_pass . $db_name;


$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    die(''. $conn->connect_error);
    }

$sql = 'SELECT * FROM passwords';

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo $row['user_id'] . " " . $row['site_url'];
    }
}

?>

