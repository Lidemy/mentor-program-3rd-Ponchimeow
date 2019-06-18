資料庫名稱：member

| 欄位名稱        | 欄位型態     | 說明               |
|---------------|-------------|-------------------|
| id            |	integer     | 使用者 id          |
| username      | VARCHAR(16) | 帳號               |
| password      | VARCHAR(16) | 密碼               |
| nickname      | VARCHAR(64) | 暱稱               |
| administrator | integer     | 管理員權限開關      |
|               |             | 預設101為一般使用者 |
|               |             | 222為管理員         |

資料庫名稱：comment

| 欄位名稱      | 欄位型態  |    說明                 |
|-------------|-----------|------------------------|
| id          | integer   | 留言id                  |
| content     | TEXT      | 留言內容                |
| created_at  | DATATIME  | 留言建立時間             |
| member_id   | integer   | 留言者id(對應 member id) |
| upper_id    | integer   | 預設為null，若為子留言則會 |
|             |           | 有值，值即表示這則子留言屬  |
|             |           | 於哪一個留言下            |




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

```
index.php     所有留言

register.php        註冊會員

admin.php           後台頁面
admin_member.php    後台會員列表
admin_comment.php   後台留言列表
```