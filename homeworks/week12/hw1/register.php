<?php require_once "./conn.php";?>
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Week9 留言板</title>
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>
  <nav class="nav">
    <a href="./index.php"><h1>留言板</h1></a>
    <div class="nav-member-group">
      <a class="nav-member-group__register" href="./register.php">註冊</a>
      <a class="nav-member-group__login" href="./login.php">登入</a>
    </div>
  </nav>
  <div class="warning">本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時<span>「 請勿使用 」</span>任何真實的帳號或密碼</div>
  <div class="member-content">
    <div class="member-info">
    <?php if (isset($_COOKIE["msg"])) {
    echo $_COOKIE["msg"];
    setcookie("msg", "", time() - 600);
}
?>
    </div>
    <div class="member-group register-group">
      <form method="POST" action="./controller/handle_register.php">
          <div class="member-group__field register-group__nickname"><input name="nickname" autocomplete="off"/><label class="input__label">暱稱 (最多16個字元)</label><span class="bar"></span></div>
          <div class="member-group__field register-group__username"><input name="username" autocomplete="off"/><label class="input__label">帳號</label><span class="bar"></span></div>
          <div class="member-group__field register-group__password"><input name="password" type="password"/><label class="input__label">密碼 (最多16個字元)</label><span class="bar"></span></div>
          <div class="member-group__field register-group__second-password"><input name="second-password" type="password"><label class="input__label">請重複輸入密碼</label><span class="bar"></span></div>
          <div class="member-group__button register-group__button">
            <button type="submit">註冊</button>
          </div>
      </form>
    </div>
  </div>
  <script type="module" src="./js/register.js"></script>
</body>
</html>
