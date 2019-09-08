## hw3：Hoisting

``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

1. globalEC => 編譯
   1. 建立 globalEC
   1. scopeChain 初始化
   2. `var a = 1`，建立參數 a，預設 undefined
   3. 建立 `fn()` 記憶體指標
   4. this 初始化

```javascript
callstack

globalEC: {
  VO: {
    a: undefined,
    fn: pointer of fn()
  },
  scopeChain: [ globalEC.VO ],
  this: ...
}
```

2. globalEC => 執行
   1. `var a = 1`，變數 a 更新為 1
   2. `fn()` 執行編譯

```javascript
callstack

globalEC: {
  VO: {
    a: 1,
    fn: pointer of fn
  },
  scopeChain: [ global.VO ],
  this: ...
}
```

3. fnEC => 編譯
   1. 建立 fnEC
   2. scopeChain 初始化，fnEC 建立 `__scpoe__` 屬性，建立與上層關聯性
   3. 建立 fnEC.AO
   4. `var a = 5`，建立參數 a，預設 undefined
   5. `var a`，參數已建立，略過
   6. 建立 `fn2()` 記憶體指標
   7. this 初始化

```javascript
callstack

fnEC.__scope__ = [ global.VO ]

fnEC: {
  AO: {
    a: undefined,
    fn2: pointer of fn2
  },
  scopeChain: [ fnEC.AO global.VO],
  this: ...
}

globalEC: {
  VO: {
    a: 1,
    fn: pointer of fn
  },
  scopeChain: [ global.VO ],
  this: ...
}
```

4. fnEC => 執行
   1. `console.log(a)`，fnEC.AO 參數 a 為 undefined，印出 undefined
   2. `var = 5`，更新參數 a 為 5
   3. `console.log(a)`，fnEC.AO 參數 a 為 5，印出 5
   4. `a++`，參數 a + 1 後更新為 6
   5. `fn2()` 執行編譯

```javascript
callstack

fnEC.__scope__ = [ global.VO ]

fnEC: {
  AO: {
    a: 6,
    fn2: pointer of fn2
  },
  scopeChain: [ fnEC.AO global.VO],
  this: ...
}

globalEC: {
  VO: {
    a: 1,
    fn: pointer of fn
  },
  scopeChain: [ global.VO ],
  this: ...
}
```

5. fn2EC => 編譯
   1. 建立 fn2EC
   2. scopeChain 初始化，fn2EC 建立 `__scpoe__` 屬性，建立與上層關聯性
   3. 建立 fn2EC.AO
   4. this 初始化

```javascript
callstack

fnEC.__scope__ = [ global.VO ]
fn2EC.__scope__ = [ fnEC.AO global.VO ]

fn2EC: {
  AO: {
  },
  scopeChain: [ fn2EC.AO fnEC.AO global.VO ],
  this: ...
}

fnEC: {
  AO: {
    a: 6,
    fn2: pointer of fn2
  },
  scopeChain: [ fnEC.AO global.VO],
  this: ...
}

globalEC: {
  VO: {
    a: 1,
    fn: pointer of fn
  },
  scopeChain: [ global.VO ],
  this: ...
}
```

6. fn2EC => 執行
   1. `console.log(a)`，fn2EC.AO 中無參數 a，沿 scopeChain 往上層找，在 fnEC.AO 中找到參數 a 為 6，印出 6
   2. `a = 20`， fn2EC.AO 中無參數 a，沿 scopeChain 往上層找，在 fnEC.AO 中找到參數 a，更新參數 a 為 20
   3. `b = 100`，fn2EC.AO、fnEC.AO 中皆無參數 b，於 globalEC.VO 建立參數 b 並賦值 100
   4. `fn2EC()` 執行完畢，移出 stack

```javascript
callstack

fnEC.__scope__ = [ global.VO ]
fn2EC.__scope__ = [ fnEC.AO global.VO ]

fn2EC: {
  AO: {
  },
  scopeChain: [ fn2EC.AO fnEC.AO global.VO ],
  this: ...
}

fnEC: {
  AO: {
    a: 20,
    fn2: pointer of fn2
  },
  scopeChain: [ fnEC.AO global.VO],
  this: ...
}

globalEC: {
  VO: {
    a: 1,
    b: 100,
    fn: pointer of fn
  },
  scopeChain: [ global.VO ],
  this: ...
}
```

7. fnEC => 繼續執行
   1. `consoele.log(a)`，fnEC.AO 參數 a 為 20，印出 20
   2. `fnEC()` 執行完畢，移出 stack

8. globalEC => 繼續執行
   1. `consoele.log(a)`，global.VO 參數 a 為 1，印出 1
   2. `a = 10`，更新 global.VO 參數 a 為 10
   3. `consoele.log(a)`，global.VO 參數 a 為 10，印出 10
   4. `consoele.log(b)`，global.VO 參數 b 為 100，印出 100
   5. globalEC 執行完畢，移出 stack

9. 程式執行完畢輸出結果如下

```
undefined
5
6
20
1
10
100
```
