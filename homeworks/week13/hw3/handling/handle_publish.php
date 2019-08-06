<?php
require_once "../conn.php";
require_once "../check_login.php";
require_once "../utils.php";

if ($username === null) {
    die('無法識別訪客');
}

$memberId = getMemberId($conn, $username);
$nickName = getNickname($conn, $username);
$content = $_POST['content'];
if (isset($_POST['id']) && !empty($_POST['id'])) {
    $id = $_POST['id'];
    $sql = "INSERT INTO Ponchimeow_MsgBoard_message(member_id,content,parent_id)
    VALUE(?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('isi', $memberId, $content, $id);
} else {
    $sql = "INSERT INTO Ponchimeow_MsgBoard_message(member_id,content)
        VALUE(?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $memberId, $content);
}
if ($stmt->execute()) {
    // 查詢剛 insert 的資料
    $sql = "SELECT * FROM Ponchimeow_MsgBoard_message
          WHERE id = (SELECT LAST_INSERT_ID())";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    $time = $row['created_at'];
    $messageId = $row['id'];
    echo json_encode(array(
        'result' => 'success',
        'nickname' => $nickName,
        'messageId' => $messageId,
        'time' => $time,
        'content' => $content,
    ));
} else {
    echo json_encode(array(
        'result' => 'failue',
        'message' => '發佈失敗',
    ));
}
