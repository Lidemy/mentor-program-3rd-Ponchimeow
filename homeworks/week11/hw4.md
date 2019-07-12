## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
* 雜湊：為一種演算法，經由雜湊函式演算後的值會是固定長度，不同雜湊演算法的輸出長度不同，輸出長度與演算法有關而不受原文長度影響。
       相同內容以相同雜湊函式輸入，輸出必定相同。
       不同內容以相同雜湊函式輸入，輸出相同的機率極低。
       無法將輸出解回成原本的輸入，雜湊為單向。
* 加密：
       加密為將內容改變為難以閱讀讀取的密文，只要有解密方法，經由解密過程就能還原密文為明文。

* 為什麼密碼需要雜湊後才存入資料庫？
  資料庫不保留密碼明文，保護外洩或是被入侵之可能性。
  由於雜湊只要有相同輸入就會有相同的輸出，所以很適合用在加密上，不必知道原文也能判斷式否為相同輸入。
  

## 請舉出三種不同的雜湊函數
   * SHA-0
   * MD5
   * BLACKE2

## 請去查什麼是 Session，以及 Session 跟 Cookie 的差別
Session 是一個抽象的概念，為 client 與 server 互相溝通的一種`對話`過程。
Cookie 是一個實際存在的東西，http 協議中定義在 header 中的字串，可以用來實現 session 對話。

* Session：(Session id)儲存於 server，大多以 Cookie 傳遞，也可以直接以 urls 傳遞。
         當 server 接收 request 時產生一個唯一的 session id，client 會在之後的 request 中附帶上這個 session id，server 便能以此確認使用者身份與使用者相關資訊(一些設定訊息之類)。
          
* Cookie：
  * Session cookies：僅存活於瀏覽器開啟時，關閉就會刪除，再開啟時會再產生新的 Session cookie。
  * Persistent cookies：將會保留於硬碟中，直到時間到期或是刪除。

##  `include`、`require`、`include_once`、`require_once` 的差別
* require
  * 適合引入靜態程式碼
  * 執行時若 require 進來的檔案發生錯誤，會顯示錯誤，且`不再往下執行`
  * 多用於程式一開頭載入時就先讀取

* include
  * 適合引入動態程式碼
  * 執行時若 include 進來的檔案發生錯誤，會顯示警告，但`不會停止`
  * 多用於程式流程敘述中，ex: if else、while、for 迴圈等

include_once、require_once，基本上與 include、require 無異，唯在引入時會檢查檔案是否已有載入過，若有則不載入