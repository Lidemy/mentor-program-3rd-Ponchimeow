<?php
require_once "../conn.php";
require_once "../check_login.php";
require_once "../utils.php";

if ($username === null) {
    die('無法識別訪客');
}

$id = $_POST['id']; // msg_id

//檢查是否已按過
if (chkLike($conn, $id, $username) > 0) {
    die('按過了還想按啊?');
}

$sql = "INSERT INTO Ponchimeow_MsgBoard_like(msg_id,username)
        VALUE(?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('is', $id, $username);
if ($stmt->execute()) {
    echo json_encode(array(
        'result' => 'success',
    ));
} else {
    echo json_encode(array(
        'result' => 'failue',
        'message' => '點讚失敗',
    ));
}
