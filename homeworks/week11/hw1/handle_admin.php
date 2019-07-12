<?php
require_once "./conn.php";
$conn = sql();
$dataName = $_POST['name'];
$msgId = $_POST['msgId'];
$dataPart = $_POST['part'];
$hidden = $_POST['hidden'];
$nickname = $_POST['nickname'];
$content = $_POST['content'];
$memberId = $_POST['memberId'];
$authority = $_POST['authority'];

// 資料表
if ($dataPart === 'msg') {
    $db = "Ponchimeow_MsgBoard_message";
} else if ($dataPart === 'comment') {
    $db = "Ponchimeow_MsgBoard_comment";
}

switch ($dataName) {
    case 'send':
        $sqlUpdateContent = "UPDATE $db SET content='$content' WHERE id = '$msgId'";
        $resUpdateContent = $conn->query($sqlUpdateContent);
        if(!$resUpdateContent){
          die('send error');
        }
        break;
    case 'hide':
        $value = '';
        if ($hidden === '0') {
            $value = 1;
        } else if ($hidden === '1') {
            $value = 0;
        }
        $sqlHide = "UPDATE $db SET hidden='$value' WHERE id = '$msgId'";
        $resHide = $conn->query($sqlHide);
        if (!$resHide) {
            die('hide err');
        }
        break;
    case 'delete':
        $sqlDel = "DELETE FROM $db WHERE id = '$msgId'";
        $resDel = $conn->query($sqlDel);
        if(!$resDel){
          die('delete err');
        }
        break;
    case 'authority':
        $sqlAuthority = "UPDATE Ponchimeow_MsgBoard_member SET authority='$authority' WHERE id = '$memberId'";
        $resAuthority = $conn->query($sqlAuthority);
        if(!$resAuthority){
          die('Change Authority Failed');
        }
}
