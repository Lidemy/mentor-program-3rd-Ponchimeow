<?php
require_once "../conn.php";
require_once "../check_login.php";
require_once "../utils.php";

if ($username === null) {
    die('無法識別訪客');
}

$memberId = getMemberId($conn, $username);
$id = $_POST['id']; // msg_id
$content = $_POST['content'];

$sql = "UPDATE Ponchimeow_MsgBoard_message
        SET content = ?
        WHERE id = ?
        AND member_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sii', $content, $id, $memberId);
if ($stmt->execute()) {
    echo json_encode(array(
        'result' => 'success',
    ));
} else {
    echo json_encode(array(
        'result' => 'failue',
        'message' => '編輯失敗',
    ));
}
