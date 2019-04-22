## 請解釋後端與前端的差異。

前端就像是早餐店櫃台，可以直接點餐，拿到一些簡單的餐點
後端則像是廚房，經由櫃台點餐後，櫃台會轉告訴廚房，廚房會按造櫃台的單來製作食物，再交給櫃台，再由櫃台給客人

更廣義的說，前端是能很直觀看到、感覺到變化的，後端則是水下的暗潮洶湧，滿滿的海草


## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

在瀏覽器上輸入完 JavaScript 後按下搜尋，此時會遞交一個 request 給 server 並傳遞 JavaScript 訊息，經由 server 找尋到 data 後再回傳 response 給瀏覽器


## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用。

```git
git config --global user.name
```
因為在送出第一次 commit 後發現自己的名稱與課程不同，便找了下如何修改

```git
git show <commit>
```
檢視提交的歷史紀錄，可以後綴 commit id
```git
git clean
```
刪除未被 git 管理的對象
