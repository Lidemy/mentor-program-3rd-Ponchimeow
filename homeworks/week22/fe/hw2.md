## React Router 背後的原理你猜是怎麼實作的？
使用 JS 讀取當前網址列，將 URL 存入一個專用 state 中用來對應，再由於 state 的改變而更新 UI。

## SDK 與 API 的差別是什麼？
  API： Application Programming Interface，應用程式介面，接收特定規格的 request 並回傳固定規格的 response，並不能直接知道服務底下是如何運作。

  SDK： Software Development Kit，軟體開發套件，是一整合的封裝工具包，諸如套裝軟體、軟體框架、硬體平台、作業系統，像是健保的 SDK，你下載後才能藉由讀卡機偵測並確認身份而在網頁上透過 API 查看你的資料。

## 在用 Ajax 的時候，預設是不會把 Cookie 帶上的，要怎麼樣才能把 Cookie 一起帶上？

同源請求下 Ajax 會帶上 cookie  
若為不同源，則預設不會帶上 cookie，需使用 withCredentials 

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1', true);
xhr.withCredentials = true;
xhr.send();
```