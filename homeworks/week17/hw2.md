## hw2：Event Loop + Scope

``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

1. global EC => 編譯
    1. scopeChian 初始化
    2. `var i`，建立參數 i，初始化為 undefined
    3. this 初始化
   
```javascript
call stack

   globalEC: {
     VO: {
        i: undefined
     },
     scopeChain: [ global.VO ],
     this:...
   }
```

3. globalEC => 執行
    1. `var i = 0`，globalEC 參數 i 更新為 0
    2. `console.log('i: ' + i)` 印出 `i: 0`
    3. `setTimeout()` 非原生 JS，進入 stack 後會移至 WebAPIs，瀏覽器會提供 Timer 計時，並建立 function EC，function scopeChain 初始化，設 `__sope__` 屬性

```javascript
call stack

function.__scope__ = [ global.VO ]

  functionEC: {
    AO:{
    },
    scopeChain: [ function.AO, global.VO ],
    this: ...
  }

  globalEC: {
    VO: {
       i: 0
    },
    scopeChain: [ global.VO ],
    this: ...
  }
```
1. `setTimeout(() => { console.log(i) }, i * 1000)`，參數 i 沿 scopeChain 往上層在 global.VO 中找到，Timer 計時 0 秒，0 秒後會 `console.log(i)` 進入 task queue ( setTimeout(0) 實際為 4ms )

2. `for()` 迴圈執行，`i++` 後 `i = 1` 滿足 `i < 5`
3. global.VO 參數 i 更新為 1，`console.log('i: ' + i)` 印出 `i: 1`
4. `setTimeout(() => { console.log(i) }, i * 1000)`，參數 i 沿 scopeChain 往上層在 global.VO 中找到，Timer 計時 1 秒，1 秒後會 `console.log(i)` 進入 task queue
5. 重複 5 ~ 7，當 `i = 5` 時不滿足 `i < 5`，`for()` 迴圈結束，globalEC 移出 stack，event loop 監測 stack 清空，此時便執行 task queue 中的任務
6. task queue 中有五個 `console.log(i)`，從 __scope__ 中找 global.VO，參數 i 為 5
7.  最終輸出結果如下
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

