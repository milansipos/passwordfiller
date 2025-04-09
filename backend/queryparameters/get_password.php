<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$db_host = getenv('DB_HOST');
$db_user = getenv('DB_USER');
$db_pass = getenv('DB_PASS'); 
$db_name = getenv('DB_NAME');
$encryption_key = getenv('SEK');

function decryptPassword($encrypted_password, $key) {
    $key = hash('sha256', $key, true); // same key hashing as in encryption
    $data = base64_decode($encrypted_password);
    $iv_length = openssl_cipher_iv_length("aes-256-cbc");
    $iv = substr($data, 0, $iv_length);
    $encrypted = substr($data, $iv_length);
    return openssl_decrypt($encrypted, "aes-256-cbc", $key, OPENSSL_RAW_DATA, $iv);
}

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) { 
    die("". $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $url = $_POST['url'];

    $sql = "SELECT passhash FROM passwords WHERE site_url = ?";
    $stmt = $conn->prepare($sql);

if (!$stmt) {
    die("". $conn->error);
}

    $stmt->bind_param("s", $url);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $password = decryptPassword($row['passhash'], $encryption_key);
            echo $password;
        } else {
            echo "No passwords found";
        }

    } else {
        echo "query error";
    }

}


?>