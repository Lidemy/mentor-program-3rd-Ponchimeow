<?php
require_once "./conn.php";
require_once "./check_access.php";
$conn = sql();
$username = passCode($conn);
$memberId = getMemberId($conn, $username);
$content = $_POST["content"];
$id = $_POST["dataId"];
if ($_POST['dataPart'] === "msg") {
    $db = "Ponchimeow_MsgBoard_message";
} else if ($_POST['dataPart'] === 'comment') {
    $db = "Ponchimeow_MsgBoard_comment";
}

$sqlUpdateMsg = "UPDATE $db SET content='$content' WHERE id = '$id' AND member_id='$memberId'";
$resUpdateMsg = $conn->query($sqlUpdateMsg);
if (!$resUpdateMsg) {
    die("Edit failed:" . $conn->error);
}
