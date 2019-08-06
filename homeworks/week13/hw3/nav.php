<?php
if ($username === null) {
    echo "<div class='nav-member-group'>";
    echo "<a class='nav-member-group__register' href='./register.php'>註冊</a>";
    echo "<a class='nav-member-group__login' href='./login.php'>登入</a>";
    echo "</div>";
} else {
    echo "<div class='nav-member-group'>";
    $nickname = getNickname($conn, $username);
    if ($nickname !== null) {
        echo "<a class='nav-member-group__nickname'>";
        echo escape($nickname);
        echo "</a>";
        echo "<a class='nav-member-group__logout' href='./handling/handle_logout.php'>登出</a>";
        if (chkIdentify($conn, $username) === 'admin' || chkIdentify($conn, $username) === 'superadmin') {
            echo "<a class='nav-memmber-group__admin' href='./admin.php'>Admin</a>";
        }
        echo "</div>";
    }
}
;
