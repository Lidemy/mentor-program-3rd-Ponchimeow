## 請說明 SQL Injection 的攻擊原理以及防範方法
### 攻擊原理
由於設計上不良，使得輸入字串中可夾帶 SQL 指令，進而造成非預期的資料庫行為。

```sql
select * from tableName where username='' or 1=1--' and password = ' ';
```

### 防範方法
使用 prepared statements，讓 sql 語句不是由字串組成，僅能代入規定參數。

```php
$sql = "SELECT * FROM `table` WHERE id = ? ";
$stmt = $conn->prepare($sql); 
$stmt->bind_param('is',id,name)
$stmt->execute();
$result = $stmt->get_result();
if($result->row_nums > 0){
  // 有資料時
}else{
  // 無資料時
}
```

## 請說明 XSS 的攻擊原理以及防範方法
### 攻擊原理
於網頁中植入(輸入) javascript，使的使用者進入網頁或是點擊連結時，觸發非預期功能。

* 反射型，Reflected XSS
  * 點擊連結後觸發被值入的 javascript，讓使用者的資料發送至特定網站，或是冒充使用者對伺服器發送請求。
  * 攻擊碼於 URL 中，常見於傳遞參數功能中，如搜尋、跳轉等。
  * 由於需要使用者點擊 URL 才能生效，攻擊者往往會以多種手段誘導使用者點擊。

* 儲存型，Stored XSS
  * 將 javascript 植入資料庫中，攻擊隨使用者打開網站發送請求或是點擊連結而產生，讓使用者的資料發送至特定網站，或是冒充使用者對伺服器發送請求。
  * 攻擊碼於資料庫中，常見於帶有保存使用者數據的網站，，如論壇、評論、訊息等。

* DOM型，DOM-Based XSS
  * 前端攻擊，建立於前面兩種後的攻擊模式，在 javascript 動態產生時植入。

```javascript
<script>
  document.write("<h2>URL</h2>:"+document.baseURL);
</script>
```
若訪問時的 url 改為 `http://網頁地址#<script>alert(hacked)</scrupt>` 就會產生新的節點與非原預期目的。

### 防範方法
* 對輸入進行明確過濾，如電話只有數字、信箱須符合格式等
* 在輸出時在輸出時轉譯 HTML，使用`htmlentities()`進行跳脫
* 使用 .innerHTML、.outerHTML、document.write() 需注意避免將不明數據插入 HTML

## 請說明 CSRF 的攻擊原理以及防範方法
### 攻擊原理
跨站式請求偽造，又稱為 one-click attack，前提為使用者已登入網站，利用使用者已取得身份認證，再讓使用者對伺服器發送惡意請求，讓伺服器端以為是使用者發出的。
```http
<img src="https://facebook.com/logout">
```
當使用者點擊後，變會登出facebook。

### 防範方法
* 由於前提為使用者登入狀態，所以減少不必要的持續性登入，如使用者無活動一段時間後自動登出，使 CSRF 無效。
* 確保不憑由單一參數就變動伺服器端狀態。
* 加強使用者身分辨認機制，開法端不能只憑 SESSION id 就相信他代表某個使用者，可以添加其他驗證方式來確認，如手機、電子信箱。