1. 請以自己的話解釋 API 是什麼？

做為資料交換的媒介、管道、手段，使用的人並不會知道他背後做了什麼事情，但會知道我使用這個 API 能獲得他可能預期想要的，就像是獻祭池一樣，獻上祭品獲得贈頌，池底下發生什麼事情都不會知道，只會知道若想獲得所希冀的事物就必須給予正確的祭品(?)不過這都要在合成表( API 文件 )是完整且正確的情況下 


2. 請找出三個課程沒教的 HTTP status code 並簡單介紹
* 401 Unauthorized，驗證未通過，未被授權訪問，訪問者驗證未通過或不被允許訪問該網址，請重新進行驗證並重試
* 403 Forbidden，禁止訪問，訪問者沒有權限進入此頁面
* 418 I'm a teapot，Hyper Text Coffee Pot Control Protocol ( HTCPCP )超文本咖啡壺控制協定，伺服器是個茶壺，所以拒絕煮咖啡，1998年 IEFT 的愚人節玩笑。


3. 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

* foodStallManger
  * 餐廳平台 API 能讓使用者查詢、新增、刪除、更改餐廳名單。
  * base url: https://foodstallmanger.com.tw/

* 查詢
  * 查詢所有餐廳
      * Method： GET
      * Paths： /restaurants/_search
    * 參數： _limit： 設定回傳資料數量  
    * 範例：/restaurants/_search?_limit=10
    * 回應：
      * name： 餐廳名稱
      * address： 餐廳地址
      * tel： 餐廳電話

  * 查詢單一餐廳
      * Method： GET
      * Paths： /restaurants/_search/:id
    * 參數： 無 
    * 範例： /restaurants/_search/34
    * 回應：
      * name： 餐廳名稱
      * address： 餐廳地址
      * tel： 餐廳電話

* 刪除
  * 刪除餐廳 
      * Method: DELETE
      * Paths: /restaurants/:id
    * 參數： 無
    * 範例：/restaurants/_search/34
    * 回應： 無

* 新增
  * 新增餐廳
      * Method: POST
      * Paths: /restaurants
    * 參數： 
      * name： 餐廳名稱
      * address： 餐廳地址
      * tel： 餐廳電話
    * 範例：/restaurants/_search/34
    * 回應： 無

* 修改
  * 更改餐廳
      * Method: PATCH
      * Paths: /restaurants/:id
    * 參數： 
      * name： 餐廳名稱
      * address： 餐廳地址
      * tel： 餐廳電話
    * 範例：/restaurants/34
    * 回應： 無
