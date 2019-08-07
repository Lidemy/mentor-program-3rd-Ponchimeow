<?php
require_once "../conn.php";
require_once "../check_login.php";
require_once "../utils.php";

if ($username === null) {
    die('無法識別訪客');
}

$id = $_POST['id']; // msg_id
$memberId = getMemberId($conn, $username);

$sql = "UPDATE Ponchimeow_MsgBoard_message
        SET hidden='1'
        WHERE id = ?
        AND member_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $id, $memberId);
if ($stmt->execute()) {
    echo json_encode(array(
        'result' => 'success',
    ));
} else {
    echo json_encode(array(
        'result' => 'failue',
        'message' => '刪除失敗',
    ));
}
