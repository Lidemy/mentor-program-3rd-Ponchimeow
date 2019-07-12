<?php require_once "./conn.php";
require_once "./check_access.php";
$conn = sql();
$username = passCode($conn);
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
  <title>留言板_admin</title>
</head>
<body>
<a href="./index.php">留言板首頁</a>
<a href="./admin_member.php">member</a>
<a href="./admin_message.php">message</a>
</body>
</html>
