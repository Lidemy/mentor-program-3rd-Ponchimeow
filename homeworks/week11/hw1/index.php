<?php
require_once "./conn.php";
require_once "./check_access.php";
$conn = sql();
$username = passCode($conn);
?>
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="nav">
    <a href="./index.php"><h1>留言板</h1></a>
    <?php if (!isset($_COOKIE["passCode"])) {
    echo "<div class='nav-member-group'>";
    echo "<a class='nav-member-group__register' href='./register.php'>註冊</a>";
    echo "<a class='nav-member-group__login' href='./login.php'>登入</a>";
    echo "</div>";
} else if (isset($_COOKIE["passCode"])) {
    echo "<div class='nav-member-group'>";
    $sqlNickname = "SELECT nickname FROM Ponchimeow_MsgBoard_member WHERE username='$username'";
    $searchNickname = $conn->query($sqlNickname);
    $resultNickname = $searchNickname->fetch_assoc();
    echo "<a class='nav-member-group__nickname'>$resultNickname[nickname]</a>";
    echo "<a class='nav-member-group__logout' href='./handle_logout.php'>登出</a>";
    if (chkAdmin($conn, $username)) {
        echo "<a class='nav-memmber-group__admin' href='./admin.php'>admin</a>";
    }
    echo "</div>";
}
;
?>
  </nav>
  <div class="warning">本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時<span>「 請勿使用 」</span>任何真實的帳號或密碼</div>
  <div class="container">
    <div class="publish">
      <?php if (isset($_COOKIE["msg"])) {
    $msg = $_COOKIE["msg"];
    setcookie("msg", "", time() - 600);
} else {
    $msg = "請輸入";
}
if (isset($_COOKIE["passCode"])) {
    echo "<textarea class='publish-content' name='content' placeholder='$msg'></textarea>";
    echo "<button class='publish-button' type='button'>我要留言</button>";
} else if (!isset($_COOKIE["passCode"])) {
    echo "<a class='publish-info' href='./login.php'>留言請先登入</a>";
}
;
?>
    </div>

<?php
$page = 0;
$pages = 0;
$per = 20; // 每頁顯示筆數
$sqlContentAll = "SELECT member.id,member.nickname,member.username,message.id as message_id, message.content,message.created_at,message.hidden
            FROM Ponchimeow_MsgBoard_message as message
            LEFT JOIN Ponchimeow_MsgBoard_member as member ON member.id = message.member_id
            WHERE message.hidden = '0'
            ORDER BY message.created_at DESC";
$resContentAll = $conn->query($sqlContentAll);
// ceil() => 回傳大於等於數字的最小整數, ex: ceil(2.3) => 3, ceil(0.3) => 1
$pages = ceil(($resContentAll->num_rows) / $per);
if (!isset($_GET["page"])) {
    $page = 1;
} else {
// intval，將變量轉為整數
    $page = intval($_GET["page"]);
    $page = ($page > 0) ? $page : 1;
    $page = ($pages > $page) ? $page : $pages;
}
$start = ($page - 1) * $per;
$sqlContent = $sqlContentAll . " LIMIT " . $start . ',' . $per;
$resContent = $conn->query($sqlContent);

// 頁數，顯示為當前頁數前二與後二頁，1-3頁部分皆顯示1-5頁，第4頁則為2-6
// 若總共有12頁，則在第9頁顯示為7-11頁，第10頁顯示8-12頁
// 當顯示頁數無第一頁時顯示首頁，無末頁數字時顯示末頁
if ($resContent->num_rows > 0) {
    echo "<div class='pages'>第" . $page . "頁/共" . $pages . "頁";
    if ($page >= 4) {
        echo "<a href=?page=1>首頁</a>";
    }
    if ($page <= 3) {
        if ($pages < 5) {
            for ($i = 1; $i <= $pages; $i++) {
                echo "<a href=?page=$i>" . $i . "</a>";
            }
        } else {
            for ($i = 1; $i <= 5; $i++) {
                echo "<a href=?page=$i>" . $i . "</a>";
            }
        }
    } else if ($page > 3 && $page < $pages - 3) {
        for ($i = $page - 2; $i <= $page + 2; $i += 1) {
            echo "<a href=?page=$i>" . $i . "</a>";
        }
    } else {
        for ($i = $pages - 4; $i <= $pages; $i++) {
            echo "<a href=?page=$i>" . $i . "</a>";
        }
    }
    if ($page < $pages - 4) {
        echo "<a href=?page=$pages>末頁</a>";
    }
    echo "</div>";

    // 主留言
    while ($rowMsg = $resContent->fetch_assoc()) {
        echo "<div class='content'>";
        echo "<div class='message'>";
        echo "<div class='message-header'>";
        echo "<div class='message-header__name'>$rowMsg[nickname]</div>";
        echo "<div class='message-header__time'>";
        if (isset($username) && $rowMsg["username"] === $username) {
            echo "<div class='message-header__time__button message-header__time__button-send' data-id='$rowMsg[message_id]' data-part='msg'>送出</div>";
            echo "<div class='message-header__time__button message-header__time__button-edit'>編輯</div>";
            echo "<div class='message-header__time__button message-header__time__button-delete' data-info-id='$rowMsg[message_id]' data-part='msg'>刪除</div>";
            echo "<div class='message-header__time__button message-header__time__button-cancel'>取消</div>";
        }
        echo "<div>$rowMsg[created_at]</div>";
        echo "</div>";
        echo "</div>";
        echo "<p class='message-text'>$rowMsg[content]</p>";
        echo "</div>";
// 子留言
        $sqlComment = "SELECT distinct comment.id,comment.message_id as c_m_id, comment.content as comment_contnet, comment.created_at as comment_time,member.username as member_username, member.nickname as member_nickname
        FROM Ponchimeow_MsgBoard_comment as comment
        LEFT JOIN Ponchimeow_MsgBoard_member as member ON member.id = comment.member_id
        LEFT JOIN Ponchimeow_MsgBoard_message as message ON comment.message_id =" . $rowMsg["message_id"];
        $resultComment = $conn->query($sqlComment);
        if ($resultComment->num_rows > 0) {
            while ($rowComment = $resultComment->fetch_assoc()) {
                if ($rowComment["c_m_id"] === $rowMsg["message_id"]) {
                    echo "<div class='comment'>";
                    echo "<div class='comment-list'>";
                    echo "<div class='comment-list-header'>";
                    echo "<div class='comment-list-header__name'>$rowComment[member_nickname]</div>";
                    echo "<div class='comment-list-header__time'>";
                    if (isset($username) && $rowComment["member_username"] === $username) {
                        echo "<div class='comment-list-header__time__button comment-list-header__time__button-send' data-id='$rowComment[id]' data-part='comment'>送出</div>";
                        echo "<div class='comment-list-header__time__button comment-list-header__time__button-edit'>編輯</div>";
                        echo "<div class='comment-list-header__time__button comment-list-header__time__button-delete' data-id='$rowComment[id]' data-part='comment'>刪除</div>";
                        echo "<div class='comment-list-header__time__button comment-list-header__time__button-cancel'>取消</div>";
                    }
                    echo "<div>$rowComment[comment_time]</div>";
                    echo "</div>";
                    echo "</div>";
                    echo "<p class='comment-text'>$rowComment[comment_contnet]</p>";
                    echo "</div>";
                    echo "</div>";
                }}}
// 子留言留言框
        if (isset($username)) {
            echo "<div class='reply'>";
            echo "<form action='handle_reply.php' method='POST'>";
            echo "<textarea name='reply' ></textarea>";
            echo "<input type='hidden' name='message_id' value='$rowMsg[message_id]'/>";
            echo "<button type='submit'>回覆</button>";
            echo "</form>";
            echo "</div>";
        }
        // class="content" 的 end div
        echo "</div>";
    }
}
?>
  </div>
  <script type="module" src="index.js"></script>
</body>
</html>