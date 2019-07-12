<?php
require_once "./conn.php";
$conn = sql();
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
function chkNickname($conn, $nickname)
{
    $sqlChkNickname = "SELECT nickname FROM Ponchimeow_MsgBoard_member WHERE nickname='" . $nickname . "'";
    $resChkNickname = $conn->query($sqlChkNickname);
    if ($resChkNickname->num_rows !== 0) {
        setcookie("msg", "註冊暱稱重複", time() + 600);
        header("Location: ./register.php");
        die();
    }
}


function chkUsername($conn, $username)
{
    $sqlChkUsername = "SELECT username FROM Ponchimeow_MsgBoard_member WHERE username='" . $username . "'";
    $resChkUsername = $conn->query($sqlChkUsername);
    if ($resChkUsername->num_rows !== 0) {
        setcookie("msg", "註冊帳號重複", time() + 600);
        header("Location: ./register.php");
        die();
    }
}
chkNickname($conn,$nickname);
chkUsername($conn,$username);

// 將密碼加密
$hashPassword = password_hash($password, PASSWORD_DEFAULT);

$sqlRegister = "INSERT INTO Ponchimeow_MsgBoard_member(nickname, username, password) VALUE ('$nickname','$username','$hashPassword')";
$result = $conn->query($sqlRegister);
if ($chkNickname->num_rows === 0 && $chkUsername->num_rows === 0) {
    if ($result) {
        header('Location: ./login.php');
    } else {
        echo $conn->error;
    }
}
