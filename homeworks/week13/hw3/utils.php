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
function chkIdentify($conn, $username)
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
// 辨識是否為管理者
function chkAdmin($identify)
{
    if (!($identify === 'admin' || $identify === 'superadmin')) {
        die("無法辨識身份");
    }
}

// 跳脫字元
function escape($str)
{
    return htmlspecialchars($str, ENT_QUOTES, 'utf-8');
}

// 查詢暱稱
function getNickname($conn, $username)
{
    $sql = "SELECT nickname
                    FROM Ponchimeow_MsgBoard_member
                    WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $stmt->execute();
    while ($row = $stmt->get_result()->fetch_assoc()) {
        return $row['nickname'];
    }
    return null;
}

// 檢查是否已按過 like
function chkLike($conn, $id, $username)
{
    $sql = "SELECT * FROM Ponchimeow_MsgBoard_like
                   WHERE msg_id = $id
                   AND username = '$username'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    // > 0 表示已按過
    return $stmt->get_result()->num_rows;
}
