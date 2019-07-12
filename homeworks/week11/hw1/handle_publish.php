<?php
require_once "./conn.php";
require_once "./check_access.php";
$conn = sql();
$username = passCode($conn);
$memberId = getMemberId($conn, $username);
$content = htmlspecialchars($_POST['content']);
if ($username !== null) {
    $sql = "INSERT INTO Ponchimeow_MsgBoard_message(member_id,content) VALUE('$memberId','$content')";
    $result = $conn->query($sql);
    if (!$result) {
        die("Publish failed: " . $conn->error);
    }
}
