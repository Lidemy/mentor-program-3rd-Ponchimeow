<?php
require_once "./conn.php";
require_once "./check_access.php";
$conn = sql();
$username = getUserName($conn);
if ($username === null) {
    die("無法辨識訪客");
}
$memberId = getMemberId($conn, $username);

$dataName = $_POST['name'];
$dataPart = $_POST['part'];
$id = $_POST['id']; // reply 傳入為主留言 id，delete 傳入當前留言 id

$content = htmlspecialchars($_POST['content'], ENT_QUOTES, 'utf-8');

if ($dataPart === 'msg') {
    $db = "Ponchimeow_MsgBoard_message";
} else if ($dataPart === 'comment') {
    $db = "Ponchimeow_MsgBoard_comment";
}
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
    case 'reply':
        if (empty($content)) {
            die();
        }
        $sql = "INSERT INTO $db(message_id,member_id,content)
                VALUE(?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('iis', $id, $memberId, $content);
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
    $stmt->execute();
} catch (Exception $e) {
    echo $e->getMessage();
} catch (Throwable $th) {
    echo $th->getMessage();
} finally {
    $stmt->close();
}
