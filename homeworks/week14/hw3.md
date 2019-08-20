## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
* DNS (Domain Name System)，網域名稱系統，將網址解析成電腦可識別的 IP Address。  

Google 提供的 DNS
  * IPv4
    * 8.8.8.8
    * 8.8.4.4 
  * IPv6
    * 2001:4860:4860::8888
    * 2001:4860:4860::8844

對 Google 來說可以統計分析使用者上網行為。  
對一般大眾來說，由於透過專屬的 DNS 伺服器，解析速度更快，且多了一層 google 的把關，提高了安全性。

</br>

## 什麼是資料庫的 lock？為什麼我們需要 lock？
進行資料庫讀取與寫入時，在資料或是 table 上做一個記號表示處理中，而其他的交易行為就根據這個記號來判斷是否應該等處理結束處理結束或是直接進行處理，這個記號稱為 'lock'。  
當多筆資料對資料進行讀取與寫入時，彼此會互相影響，若沒有一個判定先後的機制將使得結果與預期上不符合。  

* Transaction
```sql
$conn->autocommit(false);
try{
  $conn->begin_transaction();
  $stmt = $conn->prepare("insert into wallet('cash') values (?)");
  $stmt->bind_param(i,$value);
  $stmt->execute();
  $conn->commit();
}catch(Exception e){
  $conn->rollback();
  echo $e->getMessage();
}
```

</br>

## NoSQL 跟 SQL 的差別在哪裡？

SQL  
* 關聯式資料庫
* 事先嚴謹定義好的 schema
* 數據分布於各個 table
* 縱向擴展較易，橫向擴展較不易。

NoSQL，Not Only SQL
* 非關聯式資料庫
* 無 schema，可靈活的儲存資料，儲存方式為 key-value，JSON 形式。
* 不支援 JOIN，關聯數據會以內嵌式在同比資料中
```json
{name:'apple',
price: 200,
data:[year:2018,email:aaa@apple.com]}
```
* 橫向、縱向擴展皆可行。


無分優劣，視情況使用。

註:  
  Horizontal scaling(橫向擴展):增加更多的機器節點，如讀寫分離、垂直切分、水平切分。
  Vertical scaling(縱向擴展):機體的等級提升，如CPU、RAM、儲存空間等。

[Academind, SQL vs NoSQL or MySQL vs MongoDB](https://www.youtube.com/watch?v=ZS_kXvOeQ5Y)  
</br>

## 資料庫的 ACID 是什麼？
+ Atomicity，原子性，每次執行交易像是原子一般無法切割，過程中不管有多少動作，皆會完整的全部執行，一但發生錯誤，便會回歸至交易前狀態，中間執行的交易動作皆不存在，要不就成功，要不就失敗。
+ Consistency，一致性，維持資料庫綱要的定義，假設代幣總量為100，有 A、B 兩個人，則不論兩人如何交易，其總和代幣數仍然為100。
+ Isolation，隔離性，多筆交易執行不交互影響。
+ Durability，持久性，交易執行後資料即存在。  

Consistency 建立於其他 AID 的共同達成。