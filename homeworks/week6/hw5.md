## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. `<datalist>`: 定義選項列表。
```html
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
<body>
<input list="books" />
<datalist id="books">
	<option value="易碎物">
	<option value="思考的技術">
	<option value="生命咖啡館">
</datalist>
</body>
</html>
```
2. `<b>` 表示粗體文本。

3.  `<keygen>`：加密金鑰，於送出`<form></form>`表單時產生一對金鑰。私鑰存於 client 端，公鑰則送至server。
    `<keytype>`：加密演算法，rsa、dsa、ec。

## 請問什麼是盒模型（box modal）
Css設定元素的寬高時，實際上為 content + padding + border 構成 另外還有外層 margin 與其他元素的距離。

然而其實這樣的方式不是很值觀，每次設定都要做計算，此時可以使用 box-sizing
* box-sizing
  * content-box：預設，實際寬高 = 設定的數值 + border + padding。
  * border-box：設定的數值已包含 border 與 padding。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
`<span>box1</span> <span>box2</span>`

* display: inline
  `box1box2`
  將多個元素呈現於同一行並排顯示，content 大小以內容物判定，無法設定寬高，上下邊距無用

* display: block
  ```
  box1
  box2
  ```
  相對於 inline ，多個元素時會自動換行

* display: inline-block
  排列方式以 inline 呈現，但擁有 block 屬性，可以設定寬高，上下外距

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

* position
  * static: 預設值，照瀏覽器預設的配置自動排版

  * relative: 相對定位，會相對其原本該出現的位置而移動，不論相對定位後的元素如何在頁面上移動或是增加空間，都不影響其他原本元素的位置
  
  * absolute: 會定位於相對於他所處上層容器的相對位置，若上層無可以被定位的，則定位就以`<body`的最左上角的絕對位置
    
  * fixed: 固定定位，會以相對於瀏覽器視窗作為訂為基準，隨頁面捲動而移動，而不是在頁面上。