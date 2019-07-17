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
  <title>admin_member</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body>
  <?php
$sqlMemberList = "SELECT id,nickname,username,authority FROM Ponchimeow_MsgBoard_member";
$resMemberList = $conn->query($sqlMemberList);
echo "<div class='table member-table'>";
echo "<div class='tr member__tr'>";
echo "<div class='td member__td'>ID</div>";
echo "<div class='td member__td'>暱稱</div>";
echo "<div class='td member__td'>帳號</div>";
echo "<div class='td member__td'>權限</div>";
echo "</div>";
while ($rowMemberList = $resMemberList->fetch_assoc()) {
    echo "<div class='tr member__tr'>";
    echo "<div class='td member__td'>$rowMemberList[id]</div>";
    echo "<div class='td member__td'>$rowMemberList[nickname]</div>";
    echo "<div clss='td member__td'>$rowMemberList[username]</div>";
    echo "<div class='td member__td'>$rowMemberList[authority]</div>";
    if (chkAdmin($conn, $username) === 'superadmin' && $rowMemberList['authority'] !== 'superadmin') {
        echo "<div class='td member__td switch-authority'>";
        echo "<select name='authority' data-name='authority' data-member-id='$rowMemberList[id]'>";
        $admin = $rowMemberList['authority'] === 'admin' ? 'selected' : '';
        $normal = $rowMemberList['authority'] === 'normal' ? 'selected' : '';
        echo "<option value='admin' $admin>admin</option>";
        echo "<option value='normal' $normal>normal</option>";
        echo "</select>";
        echo "</div>";
    }
    echo "</div>";
}
echo "</div>";
echo "<a href='./admin.php'>admin</a>"
?>
<script type="module" src="admin_member.js"></script>
</body>
</html>