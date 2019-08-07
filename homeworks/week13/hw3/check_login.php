<?php
session_start(); // 取出 cookie 中 PHPSESSION

if (isset($_SESSION['username']) && !empty($_SESSION['username'])) {
// 以 PHPSESSION 查詢
    $username = $_SESSION['username'];
} else {
    $username = null;
}
