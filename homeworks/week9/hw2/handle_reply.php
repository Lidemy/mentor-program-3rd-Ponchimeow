<?php
require_once "./conn.php";
$reply = $_POST['reply'];
if (empty($reply)) {
    die();
}

$username = $_COOKIE["username"];
$sqlUserId = "SELECT id FROM Ponchimeow_Week9_member WHERE username='" . $username . "'";
$getId = $conn->query($sqlUserId);
$memberId = $getId->fetch_assoc()['id'];

$messageId = $_POST["message_id"];

$sql = "INSERT INTO Ponchimeow_Week9_comment(message_id,member_id,content) VALUE('$messageId','$memberId','$reply')";
$result = $conn->query($sql);
if ($result) {
    header("Location: ./index.php");
} else {
    die("failed. " . $conn->error);
}
