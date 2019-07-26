<?php
// 取得會員編號
function getMemberId($conn, $username)
{
    $sql = "SELECT id FROM Ponchimeow_MsgBoard_member Where username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows > 0) {
        $row = $res->fetch_assoc();
        $memberId = $row['id'];
        return $memberId;
    }
    return null;
}
// 辨識身份權限
function chkAdmin($conn, $username)
{
    $sql = "SELECT authority FROM Ponchimeow_MsgBoard_member
                    Where username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $res = $stmt->get_result();
    while ($row = $res->fetch_assoc()) {
        return $row['authority'];
    }
    return null;
}
// 跳脫字元
function escape($str)
{
    return htmlspecialchars($str, ENT_QUOTES, 'utf-8');
}
