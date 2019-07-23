<?php
session_start(); // 取出 cookie 中 PHPSESSION
include_once './conn.php';
include_once './utils.php';

if (isset($_SESSION['username']) && !empty($_SESSION['username'])) {
// 以 PHPSESSION 查詢
    $username = $_SESSION['username'];
} else {
    $username = null;
}
