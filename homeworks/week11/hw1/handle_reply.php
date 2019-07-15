<?php
require_once "./conn.php";
require_once "./check_access.php";
$conn = sql();
$username = passCode($conn);
$memberId = getMemberId($conn, $username);
$reply = $_POST['reply'];
if (empty($reply)) {
    die();
}

$messageId = htmlspecialchars($_POST["message_id"]);
if ($username !== null) {
    $sql = "INSERT INTO Ponchimeow_MsgBoard_comment(message_id,member_id,content) VALUE('$messageId','$memberId','$reply')";
    $result = $conn->query($sql);
    if (!$result) {
        die("Reply failed: " . $conn->error);
    } else {
        header('Location: ./index.php');
    }
}
