<?php
session_set_cookie_params(3600 * 24);
session_start(); // 產生 Session id 放入 cookie
require_once "../conn.php";
$username = $_POST['username'];
$password = $_POST['password'];

// 登入處理
// 空值檢驗
if (empty($username) || empty($password)) {
    die();
}
// 帳號檢驗
$stmt = $conn->prepare("SELECT * FROM Ponchimeow_MsgBoard_member WHERE username=?");
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows <= 0) {
    setcookie("msg", "無此使用者", time() + 3600);
    header("Location: ./login.php");
    die();
}
// 帳號密碼檢驗
while ($row = $result->fetch_assoc()) {
    $hashPassword = password_verify($password, $row["password"]);
    if (!$hashPassword) {
        setcookie("msg", "帳號密碼錯誤", time() + 3600);
        header("Location: ../login.php");
        die();
    }
    // 登入成功
    // 將 $useranem 放入記憶體
    $_SESSION['username'] = $username;
    header("Location: ../index.php");

}
