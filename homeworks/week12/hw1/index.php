<?php
require_once "./conn.php";
require_once "./utils.php";
require_once "./check_login.php";
?>
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>留言板</title>
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>
  <nav class="nav">
    <a href="./index.php"><h1>留言板</h1></a>
    <?php include_once 'nav.php'?>
  </nav>
  <div class="warning">本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時<span>「 請勿使用 」</span>任何真實的帳號或密碼</div>
  <div class="container">
    <div class="publish">
      <?php include_once 'publish.php'?>
    </div>
    <?php include_once 'board.php'?>
  </div>
  <script type="module" src="./js/index.js"></script>
</body>
</html>