## gulp 跟 webpack 有什麼不一樣？我們可以不用它們嗎？

* gulp  
  為 task runner，將壓縮、去除空白、轉譯...等諸多任務進行自動化執行

* webpack  
  為 module bundler，將 js、css、img...等打包模組化，進行適當的合併或拆分，在開發與維護上更加方便

兩個都可以不使用，但既然能節省指令與重構上的時間，就適當的使用

</br>

## hw3 把 todo list 這樣改寫，可能會有什麼問題？
`render()` 對 list 中所有資料進行全部的重新渲染，但每次增刪的修改就一部分而已，有許多不必要的不需要重新渲染

</br>

## CSS Sprites 與 Data URI 的優缺點是什麼？

### CSS Sprites
將多個圖片整合成單張，再以 `background-image`、`background-repeat`、`background-position` 進行圖片的定位與組合，像是分鏡圖一樣

優點：  
* 減少圖片載入，降低 http 請求次數，減低伺服器負擔
* 減少圖片大小、命名
* 方便修改整體風格，樣式、色系...等 

缺點：
* 整理合成需耗費一定時間
* 圖片定位需精確
* 新增圖片時，以往下為主，避免跟改已存在的圖片，以防位置變更

### Data URI (uniform resource identifier)  
將圖片以 base64 編碼，直接寫入 html 或 css 中而不需要發送檔案請求

優點：
* 直接的省去 http 請求   

缺點：
* 由於資料寫死在網頁中，無法使用 cache
* 圖片有修改就要重新編碼
* 檔案大小限制
  
CSS sprite 與 Data URI 皆是增進網頁讀取一種方式，是情況而使用