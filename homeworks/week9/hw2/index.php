<?php require_once "./conn.php";
if (isset($_COOKIE["username"])) {
    $chkCookie = "SELECT username FROM Ponchimeow_Week9_member WHERE username='" . $_COOKIE["username"] . "'";
    $resCookie = $conn->query($chkCookie);
    if ($resCookie === 0) {
        echo "你這哪來的餅乾呀~?";
    }
}
?>
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Week9 留言板</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="nav">
    <a href="./index.php"><h1>留言板</h1></a>
    <?php if (!isset($_COOKIE["username"])) {
    echo "<div class='nav-member-group'>";
    echo "<a class='nav-member-group__register' href='./register.php'>註冊</a>";
    echo "<a class='nav-member-group__login' href='./login.php'>登入</a>";
    echo "</div>";
} else {
    echo "<div class='nav-member-group'>";
    $sqlNickname = "SELECT nickname FROM Ponchimeow_Week9_member WHERE username='" . $_COOKIE["username"] . "'";
    $searchNickname = $conn->query($sqlNickname);
    $resultNickname = $searchNickname->fetch_assoc();
    echo "<a class='nav-member-group__nickname'>$resultNickname[nickname]</a>";
    echo "<a class='nav-member-group__logout' href='./handle_logout.php'>登出</a>";
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
if (isset($_COOKIE["username"])) {
    echo "<form action='handle_publish.php' method='POST'>";
    echo "<textarea name='content' placeholder='$msg'></textarea>";
    echo "<button class='publish-button' type='submit'>我要留言</button>";
    echo "</form>";
} else {
    echo "<a class='publish-info' href='./login.php'>留言請先登入</a>";
}
;
?>
    </div>

<?php
$sql = "SELECT member.id,member.nickname,message.id as message_id, message.content,message.created_at
        FROM Ponchimeow_Week9_message as message
        LEFT JOIN Ponchimeow_Week9_member as member ON member.id = message.member_id
        ORDER BY message.created_at DESC LIMIT 50";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<div class='content'>";
        echo "<div class='message'>";
        echo "<div class='message-header'>";
        echo "<div class='message-header__name'>$row[nickname]</div>";
        echo "<div class='message-header__time'>$row[created_at]</div>";
        echo "</div>";
        echo "<p class='message-text'>$row[content]</p>";
        echo "</div>";
// 子留言
        $sqlComment = "SELECT distinct comment.id,comment.message_id as c_m_id, comment.content as comment_contnet, comment.created_at as comment_time, member.nickname as member_nickname
        FROM Ponchimeow_Week9_comment as comment
        LEFT JOIN Ponchimeow_Week9_member as member ON member.id = comment.member_id
        LEFT JOIN Ponchimeow_Week9_message as message ON comment.message_id =" . $row["message_id"];
        $resultComment = $conn->query($sqlComment);
        if ($resultComment->num_rows > 0) {
            while ($rowComment = $resultComment->fetch_assoc()) {
                if ($rowComment["c_m_id"] === $row["message_id"]) {
                    echo "<div class='comment'>";
                    echo "<div class='comment-list'>";
                    echo "<div class='comment-list-header'>";
                    echo "<div class='comment-list-header__name'>$rowComment[member_nickname]</div>";
                    echo "<div class='comment-list-header__time'>$rowComment[comment_time]</div>";
                    echo "</div>";
                    echo "<p class='comment-text'>$rowComment[comment_contnet]</p>";
                    echo "</div>";
                    echo "</div>";
                }}}
// 子留言留言框
        if (isset($_COOKIE["username"])) {
            echo "<div class='reply'>";
            echo "<form action='handle_reply.php' method='POST'>";
            echo "<input class='reply-input' name='reply' autocomplete='off'/>";
            echo "<input type='hidden' name='message_id' value='$row[message_id]'/>";
            echo "<button type='submit'>回覆</button>";
            echo "</form>";
            echo "</div>";
        }
        echo "</div>";
    }
}
?>
  </div>
</body>
</html>