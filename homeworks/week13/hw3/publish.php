<?php
// 發布留言區塊
if ($username !== null) {
    echo "<textarea class='publish-content' name='content' placeholder='請輸入'></textarea>";
    echo "<div class='button publish-button' data-name='publish' data-part='msg'>我要留言</div>";
} else {
    echo "<a class='publish-info' href='./login.php'>留言請先登入</a>";
}
;
?>