<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$db_host = getenv('DB_HOST');
$db_user = getenv('DB_USER');
$db_pass = getenv('DB_PASS'); 
$db_name = getenv('DB_NAME');

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) { 
    die("". $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $url = $_POST['url'];

    $sql = "SELECT username FROM passwords WHERE site_url = ?";
    $stmt = $conn->prepare($sql);

if (!$stmt) {
    die("". $conn->error);
}

    $stmt->bind_param("s", $url);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $username = $row["username"];
            echo $username;
        } else {
            echo "No username found";
        }

    } else {
        echo "query error";
    }
}

?>