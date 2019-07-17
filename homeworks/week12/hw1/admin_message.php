<?php
require_once "./conn.php";
require_once "./check_access.php";
$conn = sql();
$username = getUsername($conn);
$identify = chkAdmin($conn, $username);
if (!($identify === 'admin' || $identify === 'superadmin')) {
  die("who are you?");
}
?>
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>admin_message</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body>
  <?php
$sqlMsgList = "SELECT msg.id as msg_id,member.nickname as nickname,member.id as member_id,msg.content,msg.created_at,msg.hidden
               FROM Ponchimeow_MsgBoard_member as member
               LEFT JOIN Ponchimeow_MsgBoard_message as msg
               on member.id = msg.member_id";
$resMsgList = $conn->query($sqlMsgList);
echo "<div class='table msg-table'>";
echo "<div class='tr msg__tr'>";
echo "<div class='td msg__td'>主留言ID</div>";
echo "<div class='td msg__td'>暱稱</div>";
echo "<div class='td msg__td'>內容</div>";
echo "<div class='td msg__td'>留言時間</div>";
echo "<div class='td msg__td'>顯示狀態</div>";
echo "</div>";
while ($rowMsgList = $resMsgList->fetch_assoc()) {
    echo "<div class='tr msg__tr'>";
    echo "<div class='td msg__td'>$rowMsgList[msg_id]</div>";
    echo "<div class='td msg__td'>$rowMsgList[nickname]</div>";
    echo "<div class='td msg__td content'>$rowMsgList[content]</div>";
    echo "<div class='td msg__td'>$rowMsgList[created_at]</div>";
    echo "<div class='td msg__td'>$rowMsgList[hidden]</div>";
    echo "<div class='td msg__td msg__td-edit' data-name='edit'>編輯</div>";
    echo "<div class='td msg_td msg__td-send' data-name='send' data-msg-id='$rowMsgList[msg_id]' data-part='msg'>送出</div>";
    echo "<div class='td msg__td msg__td-hide' data-name='hide' data-msg-id='$rowMsgList[msg_id]' data-part='msg' data-hidden='$rowMsgList[hidden]'>切換</div>";
    echo "<div class='td msg__td msg__td-cancel' data-name='cancel'>取消</div>";
    echo "<div class='td msg__td msg__td-delete' data-name='delete' data-msg-id='$rowMsgList[msg_id]' data-part='msg'>刪除</div>";
    echo "</div>";
}
echo "</div>";
echo "<a href='./admin.php'>admin</a>"
?>
<script type="module" src="admin_message.js"></script>
</body>
</html>