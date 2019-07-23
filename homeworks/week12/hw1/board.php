<?php
$page = 0;
$pages = 0;
$per = 20; // 每頁顯示筆數
$sqlContentAll = "SELECT member.id,member.nickname,member.username,message.id as message_id, message.content,message.created_at,message.hidden
            FROM Ponchimeow_MsgBoard_message as message
            LEFT JOIN Ponchimeow_MsgBoard_member as member ON member.id = message.member_id
            WHERE message.hidden = '0'
            ORDER BY message.created_at DESC";
try {
    $stmtContentAll = $conn->prepare($sqlContentAll);
    $stmtContentAll->execute();
    $resContentAll = $stmtContentAll->get_result();
// ceil() => 回傳大於等於數字的最小整數
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
    $stmtContent = $conn->prepare($sqlContent);
    $stmtContent->execute();
    $resContent = $stmtContent->get_result();

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
            echo "<div class='message-header__info'>";
            echo escape($rowMsg['nickname']);
            echo "</div>";
            echo "<div class='message-header__time'>";
            if (isset($username) && $rowMsg["username"] === $username) {
                echo "<div class='message-header__time__button message-header__time__button-send button' data-name='send' data-info-id='$rowMsg[message_id]' data-part='msg'>送出</div>";
                echo "<div class='message-header__time__button message-header__time__button-edit button' data-name='edit'>編輯</div>";
                echo "<div class='message-header__time__button message-header__time__button-delete button' data-name='delete' data-info-id='$rowMsg[message_id]' data-part='msg'>刪除</div>";
                echo "<div class='message-header__time__button message-header__time__button-cancel button' data-name='cancel'>取消</div>";
            }
            echo "<div>$rowMsg[created_at]</div>";
            echo "</div>";
            echo "</div>";
            echo "<p class='message-text'>";
            echo escape($rowMsg['content']);
            echo "</p>";
            echo "</div>";
// 子留言
            $sqlComment = "SELECT distinct
                           comment.id,
                           comment.message_id as c_msg_id,
                           comment.member_id as c_m_id,
                           comment.content as comment_contnet,
                           comment.created_at as comment_time,
                           comment.hidden,
                           member.username as member_username,
                           member.nickname as member_nickname
                           FROM Ponchimeow_MsgBoard_comment as comment
                           LEFT JOIN Ponchimeow_MsgBoard_member as member
                           ON member.id = comment.member_id
                           WHERE comment.message_id =$rowMsg[message_id]
                           AND comment.hidden = '0'";
            $stmtComment = $conn->prepare($sqlComment);
            $stmtComment->execute();
            $resComment = $stmtComment->get_result();
            if ($resComment->num_rows > 0) {
                while ($rowComment = $resComment->fetch_assoc()) {
                    if ($rowComment["c_msg_id"] === $rowMsg["message_id"]) {
                        echo "<div class='comment'>";
                        echo "<div class='comment-list'>";
                        echo "<div class='comment-list-header'>";
                        echo "<div class='comment-list-header__info'>";
                        echo "<div class='comment-list-header__info-name'>";
                        echo escape($rowComment['member_nickname']);
                        echo "</div>";
                        if ($rowComment['c_m_id'] === $rowMsg['id']) {
                            echo "<div class='comment-list-header__info-orignal-poster'>原po</div>";
                        }
                        echo "</div>";
                        echo "<div class='comment-list-header__time'>";
                        if (isset($username) && $rowComment["member_username"] === $username) {
                            echo "<div class='comment-list-header__time__button comment-list-header__time__button-send button' data-name='send' data-info-id='$rowComment[id]' data-part='comment'>送出</div>";
                            echo "<div class='comment-list-header__time__button comment-list-header__time__button-edit button' data-name='edit'>編輯</div>";
                            echo "<div class='comment-list-header__time__button comment-list-header__time__button-delete button' data-name='delete' data-info-id='$rowComment[id]' data-part='comment'>刪除</div>";
                            echo "<div class='comment-list-header__time__button comment-list-header__time__button-cancel button' data-name='cancel'>取消</div>";
                        }
                        echo "<div class='comment-list-header__time-date'>$rowComment[comment_time]</div>";
                        echo "</div>";
                        echo "</div>";
                        echo "<p class='comment-text'>";
                        echo escape($rowComment['comment_contnet']);
                        echo "</p>";
                        echo "</div>";
                        echo "</div>";
                    }}}
// 子留言留言框
            if (isset($username)) {
                echo "<div class='reply'>";
                echo "<textarea name='reply' ></textarea>";
                echo "<div class='button reply-button' data-name='reply' data-part='comment' data-info-id='$rowMsg[message_id]'>回覆</div>";
                echo "</div>";
            }
            // class="content" 的 end div
            echo "</div>";
        }
    }
} catch (Exception $e) {
    echo $e->getMessage();
} finally {
    $conn->close();
}
