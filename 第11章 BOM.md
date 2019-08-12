# 一、概述

*The Browser Object Model(BOM) allows JavaScript to "talk to" the browser.*

**BOM**（Browers Object Model，浏览器对象模型）是浏览器为JavaScript提供的一个API（Application Programming Interface，应用编程接口），所以它不是原生JavaScript提供的。通过BOM我们可以访问和设置浏览器的一些属性和函数。

对于BOM的几乎所有操作都依赖于一个全局对象，那就是 `window` 对象。由于它是一个全局对象，所以很多时候在访问它内部的子对象的属性和方法的时候都是可以将window一词省略不写的，如 `window.console.log()`可以直接写成 `console.log()` 也能正常访问。

window 对象下主要包含了以下子对象：

- **document**：文档对象
- **frames**：浏览器的框架
- **history**：浏览器浏览历史对象
- **location**：浏览器页面所处位置对象
- **navigator**：浏览器信息导航对象
- **screen**：浏览器屏幕对象

除了这些子对象，window对象还提供了一些方法，如：*alert()*、*open()*、*close()*、*setTimeout()*、*clearTimeout()*、*setIntelval()*、*clearInterval()*等。

BOM到现在都没有一个组织对其进行标准化，JavaScript语法的标准化组织是ECMA，DOM的标准化组织是W3C，但这并不妨碍浏览器厂商们对其的支持。随着Web编程技术的发展，浏览器厂商在很多BOM的内容上都达成了共识，这使得很多没有标准的属性和方法也可以在大多数现代浏览器上正常的使用。

在全局环境下，window对象以下几种表示法：

- **window**
- **this**
- **self**
- **frames**

它们在全局环境下都是指向window对象：

```js
self
Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}

window
Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}

frames
Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}

this
Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```

window 对象下的属性和方法非常之多，多至现在也没有一份权威的统计表明window下到底有多少个属性和方法，这个只需要打开Google Chrome（主要推荐，但也可以是其它非IE系列的主流浏览器）的控制台，然后输入“window.”（后面需要加上“点”）就可以看到window下的属性了，而且里面很多属性下还包含二级、三级甚至更多级的属性。也就是说想要完全去掌握window下的所有属性和方法肯定是不现实的，我们只需要掌握一些常用的，对我们实际项目开发中有一定帮助的即可。接下来我们我们开始对window的这些主要属性和方法进行讲解。

# 二、窗口属性 *

用于描述当前浏览器窗口的相关属性，这对于现在这个屏幕小到“160x160”（如智能手表），大到“4096×2160”（4K屏幕）的互联网时代来说，要做到同一个项目在不同分辨率屏幕的设备上做出响应式的设计一直是前端开发工程师头痛的问题。虽然说现在已经有很多CSS框架都或多或少的能帮上一些忙，但它们都有各自的局限性，而且还存在一些学习成本。但是如果能掌握原生JavaScript一些关于浏览器窗口的属性，对于我们做响应式设计也有不小的帮助。

浏览器窗口相关的主要属性有以下（数值表示的单位统一为像素）:

| 属性        | 描述                                         |
| ----------- | -------------------------------------------- |
| innerWith   | 浏览器窗口的可见宽度 *                       |
| innerHeight | 浏览器窗口的可见高度 *                       |
| outerWidth  | 浏览器窗口的实际宽度（包括浏览器菜单和边框） |
| outerHeight | 浏览器窗口的实际高度（包括浏览器菜单和边框） |
| pageXOffset | 浏览器窗口滚动条水平滚动的距离 *             |
| pageYOffset | 浏览器窗口滚动条垂直滚动的距离 *             |

> 提示：
>
> window.pageYOffset 类似于 scrollTop
>
> ```
> document.documentElement.scrollTop || document.body.scrollTop
> ```

> 注意：innerWidth、innerHeight、outerWidth、outerHeight都会包含滚动条的宽度。这些属性都是只读的，它们会根据当前浏览器的尺寸或内容的变化而动态地跟随变化。

```css
/*隐藏滚动条*/
body::-webkit-scrollbar {
    display: none;
}
```

# 三、窗口方法 *

- `open(?url, ?target)`：打开新网页
- `close()`：关闭网页

- `print()`：打印网页
- `getSelection() `：获取选中文本

【实例 1】获取选中内容

```html
<div id="selText">
	<pre>曾经沧海难为水，除却巫山不是云。</pre>
	<pre>取次花丛懒回顾，半缘修道半缘君。</pre>
</div>
<p id="selRes">您选中的内容是：</p>
```

```js
var oDiv = document.querySelector('#selBox');
var oSel = document.querySelector('#selRes');
oDiv.onmouseup = function() {
    // 获取选中对象
    var selObj = getSelection();
    // 将选中对象转为字符串
    var selTxt = selObj.toString();
    oSel.innerHTML = "您选中的内容是：<b>“" + selTxt + "”</b>";
}
```

示例中使用了一个 `mouseup` 事件来激活用户选择文本的操作。

# 四、窗口对象

## 1、document

详情参考标准化DOM操作里面的 `document` 对象。

## 2、frames

在Ajax不盛行的年代，\<iframe>标签是在页面内嵌入网站的最好选择，但随着JavaScript相关编程技术的高速发展，使用\<iframe>标签嵌套子页面的形式已经开始不被推荐，而是用Ajax的异步加载的形式去请求“ 文档片段 ”，这样可以使得页面不需要再去加载子页面内的整个css和js等文件，和一些不必要的标签（包括整个\<head>标签和文档声明）。这样一来就使得页面加载的速度得到很大提升，页面也不会因为跳转刷新出现短暂白屏的情况，从而使得用户体验得到提升。不需要页面跳转，网站所有功能都通过一个页面完成的页面现在的术语叫法为“*SPA*”（single page application，译为：单页面应用程序。也有叫“SPWA”，其中的“W”表示“web”），是现在Web互联网应用开发的一个主流趋势。

## 3、screen 

屏幕对象相关属性都是只读的，它们返回浏览器相对于当前计算机屏幕的数据信息。screen对象是用于描述当前浏览器相对于屏幕信息的主要对象，所含属性如下：

```js
screen
Screen {availWidth: 1280, availHeight: 1001, width: 1280, height: 1024, colorDepth: 24, …}
  availHeight: 1001
  availLeft: 0
  availTop: 23
  availWidth: 1280
  colorDepth: 24
  height: 1024
  orientation: ScreenOrientation {angle: 0, type: "landscape-primary", onchange: null}
  pixelDepth: 24
  width: 1280
  __proto__: Screen
```

|             | -                                |
| ----------- | -------------------------------- |
| availWidth  | 览器窗口相对于屏幕而言的可用宽度 |
| availHeight | 览器窗口相对于屏幕而言的可用高度 |
| colorDepth  | 颜色深度                         |
| pixelDepth  | 像素深度                         |
| width       | 屏幕宽度                         |
| height      | 屏幕高度                         |

| 属性       | 描述                                     |
| ---------- | ---------------------------------------- |
| screenLeft | 返回当前浏览器窗口距离屏幕左侧的像素数值 |
| screenTop  | 返回当前浏览器窗口距离屏幕上侧的像素数值 |
| screenX    | 作用和screenLeft相同                     |
| screenY    | 作用和screenTop相同                      |

之所以出现这样同功能的属性归根到底，还是因为BOM一直没有一个标准造成的，根据资料显示支持screenLeft和screenTop的浏览器有：IE、Chrome、Safari、Opera，但Firxfox不支持。而支持screenX和screenY的浏览器有：Firxfox、Chrome、Safari、Opera，但IE不支持。

为了解决这样兼容性问题，我们可以用一个自定义的三元表达式的办法来解决：

## 4、navigator

这个对象用来包含浏览器详细信息的对象，通常用于做浏览器兼容性处理和设备的响应设计。可以打开浏览器输入这个navigator对象的名称来查看不同的浏览器的相关属性，这里我们还是以现在国内使用量[排行第一](http://tongji.baidu.com/data/browser)（并且也是最长时间来对[HTML5](http://html5test.com/)和[ECMAScript 6](https://kangax.github.io/compat-table/es6/)支持最好的浏览器）的Google Chrome进行测试：

```js
Navigator {vendorSub: "", productSub: "20030107", vendor: "Google Inc.", maxTouchPoints: 0, hardwareConcurrency: 4, …}
      appCodeName: "Mozilla"
      appName: "Netscape"
      appVersion: "5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"
      bluetooth: Bluetooth {}
      clipboard: Clipboard {}
      connection: NetworkInformation {onchange: null, effectiveType: "4g", rtt: 100, downlink: 10, saveData: false}
      cookieEnabled: true
      credentials: CredentialsContainer {}
      deviceMemory: 8
      doNotTrack: null
      geolocation: Geolocation {}
      hardwareConcurrency: 4
      keyboard: Keyboard {}
      language: "zh-CN"
      languages: (4) ["zh-CN", "zh", "en", "la"]
      locks: LockManager {}
      maxTouchPoints: 0
      mediaCapabilities: MediaCapabilities {}
      mediaDevices: MediaDevices {ondevicechange: null}
      mediaSession: MediaSession {metadata: null, playbackState: "none"}
      mimeTypes: MimeTypeArray {0: MimeType, 1: MimeType, 2: MimeType, 3: MimeType, application/pdf: MimeType, application/x-google-chrome-pdf: MimeType, application/x-nacl: MimeType, application/x-pnacl: MimeType, length: 4}
      onLine: true
      permissions: Permissions {}
      platform: "MacIntel"
      plugins: PluginArray {0: Plugin, 1: Plugin, 2: Plugin, Chrome PDF Plugin: Plugin, Chrome PDF Viewer: Plugin, Native Client: Plugin, length: 3}
      presentation: Presentation {receiver: null, defaultRequest: null}
      product: "Gecko"
      productSub: "20030107"
      serviceWorker: ServiceWorkerContainer {ready: Promise, controller: null, oncontrollerchange: null, onmessage: null}
      storage: StorageManager {}
      usb: USB {onconnect: null, ondisconnect: null}
      userActivation: UserActivation {hasBeenActive: true, isActive: true}
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"
      vendor: "Google Inc."
      vendorSub: ""
      webkitPersistentStorage: DeprecatedStorageQuota {}
      webkitTemporaryStorage: DeprecatedStorageQuota {}
      __proto__: Navigator
```

在控制台输出的内容为一个对象，对象展开后会包含比较多的属性，其中“*userAgent*”是一个比较重要的属性。在早期作浏览器判断都是依靠这个属性，不过随着浏览器版本的发展，再用这个属性去区分不同的浏览器已经行不通了。

通过观察，可以在里面发现一些其它浏览器的信息，如“Mozilla”（FireFox浏览器厂商）和“Safari”（苹果浏览器）这些额外的信息，所以想通过它来判断当前浏览器究竟是哪个浏览器是不可能了，但是使用这个属性还是可以用于判断当前的设备是PC端还是移动端的。现在我们通过谷歌开发者工具将当前环境模拟为移动端环境，然后再次在控制内输入navigator.userAgent这个属性观察：

```
"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
```

```js
// 1. 判断是移动端还是PC端
/Mobile/.test(navigator.userAgent);

// 2. 判断是否是iOS系统
/iOS/.test(navigator.userAgent);

// 3. 判断是否是Android系统
/Android/.test(navigator.userAgent);
```

## 5、location

该对象用于描述当前页面的地址信息。首先我们拿百度首页来做这个对象的测试，简单观察该对象的相关属性属性。

```js
Location {replace: ƒ, href: "https://www.baidu.com/", ancestorOrigins: DOMStringList, origin: "https://www.baidu.com", protocol: "https:", …}
      ancestorOrigins: DOMStringList {length: 0}
      assign: ƒ assign()
      hash: ""
      host: "www.baidu.com"
      hostname: "www.baidu.com"
      href: "https://www.baidu.com/"
      origin: "https://www.baidu.com"
      pathname: "/"
      port: ""
      protocol: "https:"
      reload: ƒ reload()
      replace: ƒ ()
      search: ""
      toString: ƒ toString()
      valueOf: ƒ valueOf()
      Symbol(Symbol.toPrimitive): undefined
__proto__: Location
```

【实例 1】通过 `location.href` 实现重定向或页面跳转：

```js
// 进入主页，首先判断用户是否登陆，如果用户没有登陆，跳转至登陆页面
var isLogin = false;
if(!isLogin) {
	location.href = "./pages/login.html";
}
```

【实例 2】通过 `location.href` 和 `location.search` 实现数据传递 和 获取：

比如从A页面需传递id、数量、颜色给B页面，那么在A页面跳转至B页面时的代码如下：

```js
// 页面跳转时，将参数拼接在地址后面，通过?隔开，参数与参数之间使用&隔开
location.href = "../pages/B.html?id=1001&nums=2&color=black";
```

在B页面中，可以通过 `location.search` 获取：

```js
location.search // ?id=1001&nums=2&color=black"
```

拿到参数之后，我们需要对参数进行处理，将其转换成一个字符串，可参考下列函数：

```javascript
function locSearchValToObj(searchStr) {
    // 异常处理
    if (!searchStr) {
        return null;
    }else {
        var str = searchStr.slice(1);
        var strArr = str.split('&');
        var obj = {};
        strArr.forEach(function(item){
            var arr = item.split('=');
            var key = decodeURI(arr[0]);
            var val = decodeURI(arr[1]);
            obj[key] = val;
        });
        return obj;
    }
}
```

## 6、history

浏览器有一个history对象，这个对象用于保存页面浏览通过超链接或程序链接跳转的记录，通常会将其直译为“历史记录”对象。首先，按照我们“一贯的作风”，将这个对象在浏览器的控制台进行一次输出观察。

```js
History {length: 1, scrollRestoration: "auto", state: null}
      length: 1
      scrollRestoration: "auto"
      state: null
__proto__: History
```

可以发现，这个对象只有3个属性，分别是：记录长度、记录回滚和状态，但实际上这个对象的真正实用的方法都是“藏”在了原型里，我将“\_\_proto\_\_”展开后再看看这些方法：

```js
__proto__: History
      back: ƒ back()
      forward: ƒ forward()
      go: ƒ go()
      length: (...)
      pushState: ƒ pushState()
      replaceState: ƒ replaceState()
      scrollRestoration: (...)
      state: (...)
      constructor: ƒ History()
      Symbol(Symbol.toStringTag): "History"
      get length: ƒ length()
      get scrollRestoration: ƒ scrollRestoration()
      set scrollRestoration: ƒ scrollRestoration()
      get state: ƒ state()
			__proto__: Object
```

细心一点可以发现，这个原型里面基本不包含属性（有也只是之前的那3个属性），基本都是以方法的形式存在的。我们首先来看一下这个对象常用的3个原型方法：

- `history.back()`：返回到上一个访问页面，等同于浏览器的后退键。用于制作手机客户端左上角的返回按钮是个不错的选择。不要将返回的按钮设置为一个超链接，因为有的时候不知道是从哪个页面跳到这个页面的，如果用超链接的方式有时是无法正确回到上一个页面的。

- `history.forward()`：前进到下一个访问页面，等同于浏览器的前进键。

- `history.go()`：相对当前记录后退或前进到第几个记录，参数为一个“正负整数”。如例说明：

  ```javascript
history.go(-2); // 回退到上上个页面
  history.go(-1); // 回退到上个页面
  history.go(0);  // 相当于刷新当前页面
  history.go(1);  // 前进到下个页面
  history.go(2);  // 前进到下下个页面
  ```

- `pushState()`：创建历史记录，可以配合popstate事件（H5）
- `replaceState()`：替换当前的URL，不会产生历史记录（H5）

> 注意：只能用同域的URL替换，例如你不能用http://baidu.com去替换http://google.com。而且state对象不存储不可序列化的对象如DOM。

> 提示：新增的H5方法使用示例可参考 <https://www.jb51.net/html5/606481.html>

