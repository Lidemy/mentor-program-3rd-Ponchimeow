![](ShortURL.svg)

若 Server Cache 中已有對應短網址，則直接回傳給請求端。  
若 Server Cache 中無對應短網址，產生短網址並將數據存入 Master DB，同步 Slave DB，更新數據至 Server Cache。  
Server Cache 重啟即消失，DB 重啟資料仍存在。