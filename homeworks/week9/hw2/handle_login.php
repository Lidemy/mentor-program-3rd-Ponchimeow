<?php
require_once "./conn.php";

$username = $_POST['username'];
$password = $_POST['password'];

//空值檢驗
if (empty($username) || empty($password)) {
    die();
}
//帳號檢驗
$sqlChkUsername = "SELECT * FROM Ponchimeow_Week9_member WHERE username='" . $username . "'";
$chkUsername = $conn->query($sqlChkUsername);
if ($chkUsername->num_rows === 0) {
    setcookie("msg", "無此使用者", time() + 600);
    header("Location: ./login.php");
    die();
}
// 帳號密碼檢驗
$sqlChkPassword = "SELECT * FROM Ponchimeow_Week9_member WHERE username='" . $username . "' AND password='" . $password . "'";
$chkPassword = $conn->query($sqlChkPassword);
if ($chkPassword->num_rows === 0) {
    setcookie("msg", "帳號密碼錯誤", time() + 600);
    header("Location: ./login.php");
    die();
}

if ($chkUsername->num_rows !== 0 && $chkPassword->num_rows !== 0) {
    setcookie("username", "$username", time() + 3600);
    header("Location: ./index.php");
} else {
    echo $conn->error;
}
