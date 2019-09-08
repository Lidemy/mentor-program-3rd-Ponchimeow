## hw4：What is this?

``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

* `obj.inner.hello()`
   1. `obj` 物件中的 `inner` 物件執行 `hello()`，`console.log(this.value)` 此處 this 為 inner，所以印出 2

* `bj2.hello()`
   1. `const obj2 = obj.inner`   
      可視為 `const obj2 = { value:2, hello: function() { console.log(this.value) } }`
   2. `obj2.hello()` 為執行 `hello()`，`console.log(this.value)` 此處 this 為 inner，所以印出 2

* `hello()`
   1. `const hello = obj.inner.hello` 所以 hello 為 `function hello() { console.log(this.value) }`
   2. `hello()` 直接執行 `console.log(this.value)`，然而 `hello()` 在全域環境中
      1. 若執行環境為瀏覽器，this 為指向 window
      2. 若執行環境為 node，this 為指向 global
   3. `value` 並無設置，所以 `console.log(this.value)` 為 undefined

最後出結果如下
```
2
2
undefined
```