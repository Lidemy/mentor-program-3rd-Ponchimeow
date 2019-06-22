<?php
require_once "./conn.php";
$content = $_POST['content'];
if (empty($content)) {
    setcookie("msg", "不說些什麼嗎?", time() + 600);
    header("Location: ./index.php");
    die();
}

$username = $_COOKIE["username"];
$sqlUserId = "SELECT id FROM Ponchimeow_Week9_member WHERE username='" . $username . "'";
$getId = $conn->query($sqlUserId);
$memberId = $getId->fetch_assoc()['id'];

$sql = "INSERT INTO Ponchimeow_Week9_message(member_id,content) VALUE('$memberId','$content')";
$result = $conn->query($sql);
if ($result) {
    header("Location: ./index.php");
} else {
    die("failed. " . $conn->error);
}
