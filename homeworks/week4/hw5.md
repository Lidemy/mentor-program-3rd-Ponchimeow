1. 請以自己的話解釋 API 是什麼？

做為資料交換的媒介、管道、手段，使用的人並不會知道他背後做了什麼事情，但會知道我使用這個 API 能獲得他可能預期想要的，就像是獻祭池一樣，獻上祭品獲得贈頌，池底下發生什麼事情都不會知道，只會知道若想獲得所希冀的事物就必須給予正確的祭品(?)不過這都要在合成表( API 文件 )是完整且正確的情況下 


2. 請找出三個課程沒教的 HTTP status code 並簡單介紹
* 401 Unauthorized，驗證未通過，未被授權訪問，訪問者驗證未通過或不被允許訪問該網址，請重新進行驗證並重試
* 403 Forbidden，禁止訪問，訪問者沒有權限進入此頁面
* 418 I'm a teapot，Hyper Text Coffee Pot Control Protocol ( HTCPCP )超文本咖啡壺控制協定，伺服器是個茶壺，所以拒絕煮咖啡，1998年 IEFT 的愚人節玩笑。


3. 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

# foodStallManger

餐廳平台 API 能讓使用者查詢、新增、刪除、更改餐廳名單。

server root url: https://foodstallmanger.com.tw/api/

# 查詢 [ _search ]
## 餐廳列表
### 查詢所有餐廳 [GET]

paths: /api/_search

回應格式 ( JSON )
|參數|類型|說明|
|-|-|-|
|name|string|餐廳名稱
|address|string|餐廳地址
|tel|int|餐廳電話|


### 查詢單一餐廳 [GET]

paths: /api/_search

請求格式 ( JSON )
|參數|必填|類型|說明|
|--|--|--|--|
|name|Y|string|餐廳名稱|
|address|N|string|餐廳地址
|tel|N|int|餐廳電話|


# 刪除 [ _del ]
## 刪除餐廳 [DELETE]

paths: api/_del

請求格式 ( JSON )
|參數|必填|類型|說明|
|--|--|--|--|
|name|Y|string|餐廳名稱|
|address|N|string|餐廳地址
|tel|N|int|餐廳電話|


# 新增 [ _add ]
## 新增餐廳 [POST]

paths: /api/_add

請求格式 ( JSON )
|參數|必填|類型|說明|
|--|--|--|--|
|name|Y|string|餐廳名稱|
|address|Y|string|餐廳地址
|tel|Y|int|餐廳電話|


# 修改 [ _update ]
## 更改餐廳 [PATCH]

paths: /api/_update

請求格式 ( JSON )
|參數|必填|類型|說明|
|--|--|--|--|
|name|Y|string|餐廳名稱|
|address|N|string|餐廳地址
|tel|N|int|餐廳電話|

