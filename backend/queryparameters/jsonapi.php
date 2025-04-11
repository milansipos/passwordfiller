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

    $sql = "SELECT site_url, username, passhash FROM passwords";
    $result = $conn->query($sql);

        $jsonsend = [];
        while ($row = $result->fetch_assoc()) {
            $decryptedpassword = decryptPassword($row['passhash'], $encryption_key);
            $jsonsend[] = [
                "url" => $row['site_url'],
                "username" => $row["username"],
                "password" => $decryptedpassword
            ];

        }
    echo json_encode($jsonsend);

    $conn->close();
?>