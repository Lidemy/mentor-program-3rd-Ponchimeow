## 六到十週心得與解題心得

### week6 前端基礎(一)
* HTML、CSS
  * 算是以前有碰過一點，所以吸收上還算可以，，花比較多時間是在實作後做筆記與擷取圖片紀錄上。
* SEO、RWD
  * SEO，以前只知道與提升被搜尋引擎找到有關，還有設置關鍵字與描述，沒有很細的去了結其他部分，像是 JSON-ld、robots.txt、sitemap.xml ...等。
  * RWD，有聽過也大概了解，只是在比例與畫面規劃上還需要多看多累積經驗了。
* Chrome Tools，以前只會用來找 elements 相關屬性吧(欸)，上完 udemy 課程後也算是終於了解為什麼網頁工程師為什麼會必須跟他很熟。
* 作業就因為不熟悉，但為了要與畫面相似所以一直在試驗吧ww，就多練習累積，不過當時在切仿 medium 的時候，有想說是讓拍手在文章旁，當畫面伸縮時是隨文章移動的，找時間再試看看。
* dinner 與 froggy 小遊戲能快速的讓你知道 css 選擇器與 flex 用法，有畫面又有目的性，玩起來挺愉快的。

### week7 前端基礎（二)
* DOM，第一次遇到，花了點時間消化。
* AddEventlistener，在學習完 DOM 後，添加監聽事件藉由條件增加網頁的變化與互動性，在第一個作業中會有觸發事件無反應的情形，之後要再把 hw1 做重構。
* 個人在 hw1 hw3 邏輯與事件安排上還要再多琢磨，思考的不夠好。

### week8 前端基礎（三)

* 對 api 有更一步的認識，不然真的就只是聽人一直說，可是沒有搞懂到底是什麼XD
* 再次串接 api，不過是以 ajax的形式。
* 抽獎、留言上串接還好，大部分花時間在版面設置調整。
* twitch 卡在忘了添加`request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');`
* fetch 要再研讀。

### week9

* 環境設定比預期想像簡單好多?! 還是是 Java 太繁瑣www
* 第一眼見 PHP 覺得跟 jsp 好像，不過個人 jsp 也寫很少次就是
* 一直拖延的情況是寫一寫感覺好像應該加點什麼功能，然後做一做又想說還是把基本的先弄好就好(欸)

#### OOP
* 類別，Class
  * 可以想成藍圖、設計圖，只是一個規劃上的，讓人可以了解結構與設計，並沒有實體。
* 物件，Object
  * class 生成，是類別的實例(instance)。
* 封裝，Encapsulation
  * 將物件細節在類別內就處理完成，從外部無法改變。
* 繼承，Inheritance
  * 子類繼承父類，子類可使用父類的屬性與方法。
* 多型，Polymorphism
  * 覆寫，Overriding，子類覆寫父類的屬性與方法。
  * 多載，Overloading，Java 中為在同個類別(Class)中定義相同名稱的方法(Method)但參數(Parameter)不同，然而在 php 中則是動態建立物件的屬性與方法。
[PHP,overloading](https://www.php.net/manual/en/language.oop5.overloading.php)

```php
<?php
  class Father{
    // 宣告 Class 這個類別的屬性(properties)、方法(method)
    // static，不需建立物件即可直接使用
    static $staticValue = "static";
    // public，需要建立物件，可在類別外使用，未加宣告的都視為 public
    public $publicValue = "public";
    // protected，類別內或是子類別可以使用
    protected $protectedValue = "protected";
    // private，只有類別內可以使用
    private $privateValue = "private";

    function getprivate(){
      return $this->privateValue;
    }
    // 建構子，初始化動作，物件一建立就會執行
    function __construct(){
      echo $this->protectedValue . " 父類, construct" . "</br>";
    }
    public function pet(){
      return "dog,class Father()" . "</br>";
    }
  }
  // static 不需建立物件，可直接使用
  echo Father::$staticValue . "</br>";
  // 建立
  $dosomething = new Father();
  echo $dosomething->publicValue . "</br>";
  echo $dosomething->getprivate(). "</br>";

  class son extends Father{
    // override，覆寫
    function __construct(){
      echo $this->protectedValue . " 子類, construct" . "</br>";
    }
    function testExtends(){
      return $this->protectedValue ." testExtends" . "</br>";
    }
    // 解構子
    function __destruct(){
      echo $this->protectedValue . " destruct";
    }
  }
  // 物件一建立便執行 __construct，物件結束前會執行 __destruct
  $dothing = new son(); 
  // 執行 son 中的 testExtends() 並取得從父親繼承來的 protectedValue
  echo $dothing->testExtends();
?>
```

### week10

覺得自己的學習情況其實不是很好，有很多東西是查詢後使用，還沒到內部吸收消化，在六月初的時候離職，目前應該要更能拿出更多時間專注學習才對，某方面來說也是用這次一次四週的回顧做檢討(?)既然都不想回去以前檢測、電子業那就真的該努力點(其實還有做過一些其他不同領域的XD)，有時又覺得自己是不是沒天份可是作業又還算做得出來，或許只是最近心情比較低潮...吧，反正就繼續打 code、寫筆記。

能幫人解決問題，是一件很開心的事情。