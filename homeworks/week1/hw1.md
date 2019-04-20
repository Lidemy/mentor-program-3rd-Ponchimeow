## 交作業流程
---
1. 進入作業週資料夾
2. 做任何改變(新功能、修改)，建立 branch 並 checkout 至 branch，保留乾淨的 master(主幹)
3. 完成一個作業或是一個段落就執行 commit 並註解，簡述這次 commit 與上次 commit 期間做了什麼事情
4. 將 commit push 至 github
5. 至 github 網頁，點選 Compare & pull request，填寫此 request 的標題與描述，再點選 create pull request
6. 送出 request 後複製當前執行 create pull request 後網頁的網址 在 gthub 網頁上切換至 " 程式導師實驗計畫第三期-交作業專用 repo "的 issues 中，點選 New issue 建立新的 issue
7. 標題以 [Week1] 週數示提交的而定，內容貼上剛複製的 create pull request 網址
8. Huli 檢視完作業後會 merged branch 且 close issue ，若有需要修改則再開新的 branch 做修改並重複之前動作
9. 確定 Huli merged 完後，於本機執行 git checkout master 然後 git push origin master 將合併後的 master pull 至本機，然後再於本機上執行 git branch -d weel1 將 week1 branch 刪除，留下 master 
10. 注意，一定要建立 issue
