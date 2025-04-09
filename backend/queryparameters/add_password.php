<?php
$db_host = getenv('DB_HOST');
$db_user = getenv('DB_USER');
$db_pass = getenv('DB_PASS'); 
$db_name = getenv('DB_NAME');
$encryption_key = getenv('SEK');

function encryptPassword($password, $key) {
    $key = hash('sha256', $key, true); // make key 32 bytes
    $iv_length = openssl_cipher_iv_length("aes-256-cbc");
    $iv = openssl_random_pseudo_bytes($iv_length);
    $encrypted = openssl_encrypt($password, "aes-256-cbc", $key, OPENSSL_RAW_DATA, $iv);
    return base64_encode($iv . $encrypted); // prepend IV to encrypted data
}

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    die(''. $conn->connect_error);
    }

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $url = $_POST['url'];
    $username = $_POST['username'];
    $onepassword = $_POST['password'];
    $password = encryptPassword($onepassword, $encryption_key);

    $sql = "SELECT COUNT(*) FROM passwords WHERE site_url = ? AND username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $url, $username);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    if ($count > 0) {
        echo "A password with this username was already saved.";
    } else {
        $sql = "INSERT INTO passwords (site_url, username, passhash) VALUES (?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $url, $username, $password);
        if ($stmt->execute()) {
            echo "New password succesfully added";
        } else {
            echo "error";
        }
    }

}
?>