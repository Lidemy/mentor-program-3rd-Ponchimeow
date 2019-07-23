<?php
if ($username === null) {
    echo "<div class='nav-member-group'>";
    echo "<a class='nav-member-group__register' href='./register.php'>註冊</a>";
    echo "<a class='nav-member-group__login' href='./login.php'>登入</a>";
    echo "</div>";
} else {
    echo "<div class='nav-member-group'>";
    $sqlNickname = "SELECT nickname
                    FROM Ponchimeow_MsgBoard_member
                    WHERE username=?";
    try {
        $stmtNickname = $conn->prepare($sqlNickname);
        $stmtNickname->bind_param('s', $username);
        $stmtNickname->execute();
        $result = $stmtNickname->get_result();
        while ($row = $result->fetch_assoc()) {
            echo "<a class='nav-member-group__nickname'>";
            echo escape($row['nickname']);
            echo "</a>";
            echo "<a class='nav-member-group__logout' href='./controller/handle_logout.php'>登出</a>";
            if (chkAdmin($conn, $username) === 'admin' || chkAdmin($conn, $username) === 'superadmin') {
                echo "<a class='nav-memmber-group__admin' href='./admin.php'>Admin</a>";
            }
            echo "</div>";}
    } catch (Exception $e) {
        echo $e->getMessage();
    } finally {
        $stmtNickname->close();}
}
;
