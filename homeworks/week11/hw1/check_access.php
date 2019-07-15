<?php
function passCode($conn)
{
    if (isset($_COOKIE["passCode"])) {
        $passCode = $_COOKIE["passCode"];
        $sqlChkUsername = "SELECT username FROM Ponchimeow_MsgBoard_member_certificate WHERE passCode='$passCode'";
        $resChkUsername = $conn->query($sqlChkUsername);
        $rowChkUsername = $resChkUsername->fetch_assoc();
        $username = $rowChkUsername['username'];
        return $username;
    }
}

function getMemberId($conn, $username)
{
    $sqlGetMemberId = "SELECT id FROM Ponchimeow_MsgBoard_member Where username='$username'";
    $resGetMemberId = $conn->query($sqlGetMemberId);
    $rowGetMemberId = $resGetMemberId->fetch_assoc();
    $memberId = $rowGetMemberId['id'];
    return $memberId;
}

function chkAdmin($conn, $username)
{
    $sqlChkAdmin = "SELECT authority FROM Ponchimeow_MsgBoard_member Where username='" . $username . "'";
    $resChkAdmin = $conn->query($sqlChkAdmin);
    while ($rowChkAdmin = $resChkAdmin->fetch_assoc()) {
        return $rowChkAdmin['authority'];
    }
}
