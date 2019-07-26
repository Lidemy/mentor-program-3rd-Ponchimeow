<?php
require_once "../conn.php";
require_once "../check_login.php";
require_once "../utils.php";
// if ($username === null) {
//     die("無法辨識訪客");
// }
$memberId = getMemberId($conn, $username);

$dataName = $_POST['name'];
$dataPart = $_POST['part'];
$id = $_POST['id']; // reply 傳入為主留言 id，delete 傳入當前留言 id
$content = $_POST['content'];
$level = $_POST['level'];

// if ($dataPart === 'msg') {
//     $db = "Ponchimeow_MsgBoard_message";
// } else if ($dataPart === 'comment') {
//     $db = "Ponchimeow_MsgBoard_comment";
// }
$db = "Ponchimeow_MsgBoard_message";

switch ($dataName) {
    case 'publish':
        if (empty($content)) {
            die();
        }
        $sql = "INSERT INTO $db(member_id,content)
                VALUE(?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('is', $memberId, $content);
        break;
    case 'like':
        $sql = "INSERT INTO Ponchimeow_MsgBoard_like(msg_id,username)
                VALUE(?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('is', $id, $username);
        break;
    case 'liked':
        $sql = "DELETE FROM Ponchimeow_MsgBoard_like WHERE msg_id = ? AND username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('is', $id, $username);
        break;
    case 'reply':
        if (empty($content)) {
            die();
        }
        // if ($level === 4) {
        //     die();
        // }
        // $levelUp = $level + 1;
        $sql = "INSERT INTO $db(member_id,content,parent_id)
                VALUE(?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('isi', $memberId, $content, $id);
        break;
    case 'send':
        $sql = "UPDATE $db SET content = ?
                WHERE id = ?
                AND member_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sii', $content, $id, $memberId);
        break;
    case 'delete':
        $sql = "UPDATE $db SET hidden='1'
                WHERE id = ?
                AND member_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('is', $id, $memberId);
        break;
}
try {
    if (!$stmt->execute()) {
        echo $stmt->error;
    }
} catch (Exception $e) {
    echo $e->getMessage();
} catch (Throwable $th) {
    echo $th->getMessage();
} finally {
    $stmt->close();
}
