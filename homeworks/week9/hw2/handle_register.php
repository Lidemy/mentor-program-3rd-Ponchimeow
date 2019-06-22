<?php
require_once "./conn.php";

$nickname = $_POST['nickname'];
$username = $_POST['username'];
$password = $_POST['password'];
$secondPassword = $_POST['second-password'];

//密碼檢驗
if ($password !== $secondPassword) {
    setcookie("msg", "兩次密碼輸入不同", time() + 600);
    header("Location: ./register.php");
    die();
}
//空值檢驗
if (empty($nickname) || empty($username) || empty($password) || empty($secondPassword)) {
    die();
}
//資料庫重複檢驗
$sqlChkNickname = "SELECT nickname FROM Ponchimeow_Week9_member WHERE nickname='" . $nickname . "'";
$sqlChkUsername = "SELECT username FROM Ponchimeow_Week9_member WHERE username='" . $username . "'";
$chkNickname = $conn->query($sqlChkNickname);
$chkUsername = $conn->query($sqlChkUsername);
if ($chkNickname->num_rows !== 0) {
    setcookie("msg", "註冊暱稱重複", time() + 600);
    header("Location: ./register.php");
    die();
}

if ($chkUsername->num_rows !== 0) {
    setcookie("msg", "註冊帳號重複", time() + 600);
    header("Location: ./register.php");
    die();
}

$sqlRegister = "INSERT INTO Ponchimeow_Week9_member(nickname, username, password) VALUE ('$nickname','$username','$password')";
$result = $conn->query($sqlRegister);
if ($chkNickname->num_rows === 0 && $chkUsername->num_rows === 0) {
    if ($result) {
        header('Location: ./login.php');
    } else {
        echo $conn->error;
    }
}