<?php
require_once "./conn.php";
require_once "./check_access.php";
$conn = sql();
$username = passCode($conn);
$memberId = getMemberId($conn,$username);
$id = $_POST['dataId'];
$dataPart = $_POST['dataPart'];
if ($dataPart === 'msg') {
    $db = "Ponchimeow_MsgBoard_message";
} else if ($dataPart === 'comment') {
    $db = "Ponchimeow_MsgBoard_comment";
}
$sqlDel = "UPDATE $db SET hidden='1' WHERE id = '$id' AND member_id = '$memberId'";
$resDel = $conn->query($sqlDel);
if (!$resDel) {
    die('Delete fail: ' . $conn->error);
}
