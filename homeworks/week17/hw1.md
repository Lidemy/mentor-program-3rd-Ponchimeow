## hw1：Event Loop

``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
1. global execution context 進入 stack
2. `console.log(1)` 進入 stack ，執行並印出 1，執行完畢移出 stack
3. `setTimeout(() => { console.log(2) }, 0)` 進入 stack，`setTimeout()` 為 WebAPIs 而非原生 JS，所以會再從 stack 移至 WebAPIs，瀏覽器會提供 Timer 計時，於 0 秒後將 `console.log(2)` 進入 `task queue`。
4. `console.log(3)` 進入 stack ，執行並印出 3，執行完畢移出 stack
5. `setTimeout(() => { console.log(4) }, 0)` 進入 stack，再移至 WebAPIs，計時 0 秒後，`console.log(4)` 進入 `task queue`
6. `console.log(5)` 進入 stack ，執行並印出 5，執行完畢移出 stack
7. global EC 移出 stack
8. 此時 event loop 監測 stack 已清空，執行 `task queue` 中的程式
9. `console.log(2)` 進入 stack ，執行並印出 2，執行完畢移出 stack
10. `console.log(4)` 進入 stack ，執行並印出 4，執行完畢移出 stack
11. 程式結束，輸出結果如下

```
1
3
5
2
4
```
