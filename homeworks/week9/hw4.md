## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

* VARCHAR，可變長度，可設置默認值
* TEXT，可變長度，不可設置默認值
* 處理速度上 VARCHAR > TEXT

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又會以什麼形式帶去 Server？

* 餅乾（欸，Cookie 為一個暫存於瀏覽器的小數據文件，可用以辨別使用者身份或記錄一些資料與設定
  * Cookie 限制
  * 每個 Cookie 所能存放的大小為 4096 Bytes
  * 每個網域至少可以儲存 20 個 Cookies，若儲存超過限制大小瀏覽器會捨棄最舊的 Cookie。
  * 至少能儲存 300 個 Cookies

* HTTP 中可以在 header 裡設定 
  * Set-Cookie: name=value; expires=date; path=path; domain=domain; secure
  * name=value，必需值
  * expires=date，Cookie 存留時間
  * path=path，可存取 Cookie 的路徑
  * domain=domain，可存取 Cookie 的有效網域
  * secure，指定 Cookie 只可以傳送給 HTTPS 伺服器

* client 向 server 發送 request，隨 request 送出

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. 密碼未加密，資料庫為明碼儲存
2. 使用 cookie 做判斷，但其為儲存於 client 的資料，有被翻改的風險
