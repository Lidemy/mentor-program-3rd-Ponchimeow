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
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/style.css" />

  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
</head>
<body>
  <div id="loading">處理中...(つ´ω`)つ</div>
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