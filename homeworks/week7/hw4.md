## 什麼是 DOM？
* 一個共同制定的標準物件模型，用以定義文件中的標籤，將其轉換為一個個物件，已確立一個基礎的樹狀主結構，JS 能夠透過 DOM 與 HTML 作連結溝通。

```htmlmixed
<html>
    <head>
        <title>DOM</title>
    </head>
    <body>
        <h1>Hello!World!</h1>
        <div>Happy coding!</div>
    </body>
</html>
```

```
Windows
  │- Document
      │- html                       (Document)
          │- head                   (HTMLHtmlElement)
          │   │- title              (HTMLTitleElement)
          │      │- DOM             (Text)
          │
          │- body                   (HTMLHtmlElement)
              │- h1                 (HTMLHeadingElement)
              │   │- Hello!World!   (Text)
              │
              │-div
                  │- Happy coding!  (Text)
```

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
* 事件傳遞機制的順序為先由樹頭往樹根，捕獲要傳遞的目標節點，至節點後再回頭往樹頭做冒泡
* CAPTURING_PHASE(捕獲) -> AT_TARGET -> BUBBLING_PHASE(冒泡)


## 什麼是 event delegation，為什麼我們需要它？
* 事件代理，將監聽事件添加於父元素上而不是對每個子元素皆設置監聽器，當子元素觸發時，事件冒泡至父元素才觸發監聽器
  * 當有新增或刪除元素時也無須解除監聽或是額外添加監聽。
  * 避免不必要的重複監聽事件綁定

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

* event.preventDefault()
  * 停止事件的默認動作
  * 如連結內，原本預期 checkbox 可以自由勾選，但 checkbox2 監聽事件內添加`e.preventDefault()`，使的他無法執行動作。
  [CodePen, e.preventDefault()](https://codepen.io/Ponchimeow/pen/KLEorv)
* event.stopPropagation()
  * 阻止傳遞，停止往父層的冒泡動作
  * 如連結內，原本預期為從裡到外傳遞而跳出`alert`3~1，在2與3的中間一層加上`event.stopPropagation()`後只會回傳3
  [CodePen,Capture Bubbling](https://codepen.io/Ponchimeow/pen/vwPxdg)