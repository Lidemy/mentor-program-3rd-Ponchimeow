<?php
require_once "./conn.php";
$conn = sql();
$username = $_POST['username'];
$password = $_POST['password'];

// 通行證
function passCode($conn, $username)
{
    // 產生長度為 32 的字串
    $char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_";
    $passCode = "";
    for ($i = 0; $i < 32; $i++) {
        $passCode .= $char[rand() % (strlen($char))];
    }
    // 刪除帳號之通行碼
    $sqlDelPasscode = "DELETE FROM Ponchimeow_MsgBoard_member_certificate WHERE username='" . $username . "'";
    $resDelPasscode = $conn->query($sqlDelPasscode);
    // 新增新的通行碼
    $sqlInsertPassCode = "INSERT INTO Ponchimeow_MsgBoard_member_certificate (passCode, username) VALUE ('$passCode','$username')";
    $resInsert = $conn->query($sqlInsertPassCode);
    if(!$resInsert){
    setcookie("msg", "系統出錯，請重新輸入資訊登入",time()+600);
    header("Location: ./login.php");
    die();
    }
    return $passCode;
};

//空值檢驗
if (empty($username) || empty($password)) {
    die();
}
//帳號檢驗
$sql = "SELECT * FROM Ponchimeow_MsgBoard_member WHERE username='" . $username . "'";
$result = $conn->query($sql);
if ($result->num_rows === 0) {
    setcookie("msg", "無此使用者", time() + 600);
    header("Location: ./login.php");
    die();
}
// 帳號密碼檢驗
while ($row = $result->fetch_assoc()) {
    $hashPassword = password_verify($password, $row["password"]);
    if (!$hashPassword) {
        setcookie("msg", "帳號密碼錯誤", time() + 600);
        header("Location: ./login.php");
        die();
    }
    if ($result->num_rows !== 0 && $hashPassword) {
        // 派發通行證
        setcookie("passCode", passCode($conn, $username), time() + 3600);
        header("Location: ./index.php");
    } else {
        echo $conn->error;
    }
}
