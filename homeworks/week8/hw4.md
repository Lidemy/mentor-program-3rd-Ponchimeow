## 什麼是 Ajax？
Asynchronous JavaScript And XML，非同步傳遞資訊，網頁不必重新載入便能向伺服器做資料交換，大幅提高網頁互動性。

## 用 Ajax 與我們用表單送出資料的差別在哪？
* Ajax：網頁只需局部刷新，不需等待 response 就能傳遞下一個 request，需使用 JS。

* 表單：觸發 submit 事件使頁面跳轉，發送至伺服處理等待 response 回應，不必使用JS。

## JSONP 是什麼？
JSON with Padding，為資料格式`JSON`的一種模式，讓使用者能夠以 callback 接收函數數據，使傳遞不受網域限制。

## 要如何存取跨網域的 API？
1. 使用 JSONP。
2. Cross-Origin Resource Sharing，CORS，跨域資源共用，在 request header 中添加 Access-Control-Allow-Origin 並聲明自己的 Origin 為何，伺服器接受並確認為同網域才會接受處理。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
第四周為直接向伺服器發送請求，而第八週為使用瀏覽器發送，瀏覽器基於安全性考量而定義了同源政策（Same Origin Policy），若發送請求之網域與伺服器不同，瀏覽器便不會將 response 回應給你，雖然其實 request 已經發送 response 也已經拿到了。
