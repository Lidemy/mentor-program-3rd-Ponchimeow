資料庫名稱：member

| 欄位名稱        | 欄位型態     | 說明               |
|---------------|-------------|-------------------|
| id            |	integer   | 使用者 id，主鍵     |
| username      | VARCHAR(16) | 帳號               |
| password      | VARCHAR(16) | 密碼               |
| nickname      | VARCHAR(64) | 暱稱               |
| administrator | integer     | 管理員權限開關      |
|               |             | 預設101為一般使用者 |
|               |             | 222為管理員         |

資料庫名稱：message ，主留言

| 欄位名稱      | 欄位型態  |    說明                 |
|-------------|-----------|------------------------|
| id          | integer   | 留言id，主鍵            |
| content     | TEXT      | 留言內容                |
| created_at  | DATETIME  | 留言建立時間             |
| member_id   | integer   | 留言者id(對應 member id) |

資料庫名稱: comment ，子留言

| 欄位名稱      | 欄位型態  |    說明                 |
|-------------|-----------|------------------------|
| id          | integer   | 子留言id，主鍵           |
| message_id  | integer   | 主留言id                |
| member_id   | integer   | 留言者id(對應 member id) |
| content     | TEXT      | 留言內容                |
| created_at  | DATETIME  | 留言建立時間             |



* 使用者
  * 訪客只能觀看留言
  * 會員能使用留言功能，發布留言與回覆留言

* 系統
  * 單頁顯示50則留言，依造時間由最近往後排序
  * 註冊會員時，暱稱、帳號不可為資料庫已有的

* 管理員
  * 可訪問後台管理介面
    * 會員名單 - 更改會員暱稱(不雅名稱)、
    * 留言總攬 - 刪除

簡易流程
![](https://i.imgur.com/1avaWGb.png)