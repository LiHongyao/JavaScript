# 一、概述

  *BOM*（Browers Object Model，浏览器对象模型）是浏览器为JavaScript提供的一个*API*（Application Programming Interface，应用编程接口），所以它不是原生JavaScript提供的。通过BOM我们可以访问和设置浏览器的一些属性和函数。

  对于BOM的几乎所有操作都以依赖一个*全局对象*，那就是“*window*”对象。由于它是一个全局对象，所以很多时候在访问它内部的子对象的属性和方法的时候都是可以将window一词省略不写的，如“window.screen”可以直接写成“screen”也正常访问该子对象。

window对象下主要包含了以下子对象：

- ***document***：文档对象
- ***frames***：浏览器的框架（如iframe和现在废弃了的frameset）
- ***history***：浏览器浏览历史对象
- ***location***：浏览器页面所处位置对象
- ***navigator***：浏览器信息导航对象
- ***screen***：浏览器屏幕对象

  除了这些属性，window对象还提供了一些方法函数，如：*alert()*、*open()*、*close()*、*setTimeout()*、*clearTimeout()*、*setIntelval()*、*clearInterval()*等。

  BOM到现在都没有一个组织对其进行标准化，JavaScript语法的标准化组织是ECMA，DOM的标准化组织是W3C，但这并不妨碍浏览器厂商们对其的支持。随着Web编程技术的发展，浏览器厂商在很多BOM的内容上都达成了共识，这使得很多没有标准的属性和方法也可以在大多数现代浏览器上正常的使用。

  在全局环境下，window对象以下几种表示法：

- ***window***
- ***this***
- ***self***
- ***fremes***

  它们在全局环境下都是指向window对象

![](IMGS/part_10_1.jpeg)



  window对象下的属性和方法非常之多，多至现在也没有一份权威的统计表明window下到底有多少个属性和方法，这个只需要打开Google Chrome（主要推荐，但也可以是其它非IE系列的主流浏览器）的控制台（ctrl+shift+J），然后输入“window.”（后面需要加上“点”）就可以看到window下的属性们了，而且里面很多属性下还包含二级、三级甚至更多级的属性。也就是说想要完全去掌握window下的所有属性和方法肯定是不现实的，我们只需要掌握一些常用的，对我们实际项目开发中有一定帮助的即可。接下来我们我们开始对window的这些主要属性和方法进行讲解。

# 二、窗口属性

  用于描述当前浏览器窗口的相关属性，这对于现在这个屏幕小到“160x160”（如智能手表），大到“4096×2160”（4K屏幕）的互联网时代来说，要做到同一个项目在不同分辨率屏幕的设备上做出响应式的设计一直是前端开发工程师头痛的问题。虽然说现在已经有很多CSS框架都或多或少的能帮上一些忙，但它们都有各自的局限性，而且还存在一些学习成本。但是如果能掌握原生JavaScript一些关于浏览器窗口的属性，对于我们做响应式设计也有不小的帮助。

  浏览器窗口相关的主要属性有以下（数值表示的统一为像素）:

- **window.innerWidth**：浏览器窗口的可见宽度
- **window.innerHeight**：浏览器窗口的可见高度
- **window.outerWidth**：浏览器窗口的实际宽度（包括浏览器菜单和边框）
- **window.outerHeight**：浏览器窗口的实际高度（包括浏览器菜单和边框）
- **window.pageXOffset**：浏览器窗口滚动条水平滚动的距离
- **window.pageYOffset**：浏览器窗口滚动条垂直滚动的距离

  需要注意的是innerWidth、innerHeight、outerWidth、outerHeight都会包含滚动条的宽度。这些属性都是只读的，它们会根据当前浏览器的尺寸或内容的变化而动态地跟随变化。

# 三、窗口方法

## 1、window.open()和window.close()

  window.open()方法用于打开一个新的窗口（或标签页），而window.close()用于关闭当前窗口，他们同样可以将方法前的window对象省略不写，也能达到同样的方法效果。

  相比于close()方法用于直接关闭浏览器窗口，open()方法就要稍微复杂一些，该方法有4个可选参数，它们的作用分别是：

- **URL**

  新窗口的URL地址，为一个字符串。

- **名称**

  新窗口的名称，为一个字符串。

- **窗口特性**

  新窗口的URL，为一个字符串。具体可以配置以下内容：

  - *width*：窗口宽度，值为一个像素数值
  - *height*：窗口高度，值为一个像素数值
  - *left*：窗口的屏幕X坐标，值为一个像素数值
  - *top*：窗口的屏幕Y坐标，值为一个像素数值
  - *channelmode*：是否“影院模式”显示窗口，值：yes/no（默认）
  - *fullscreen*：是否全屏显示，处于全屏模式的窗口必须同时处于剧院模式，值：yes/no（默认）
  - *directories*：是否添加目录按钮，值：yes（默认）/no
  - *location*：是否显示地址字段，值：yes（默认）/no
  - *menubar*：是否显示菜单栏，值：yes（默认）/no
  - *resizable*：窗口是否可以调整尺寸，值：yes（默认）/no
  - *scrollbars*：是否显示滚动条，值：yes（默认）/no
  - *status*：是否显示状态栏，值：yes（默认）/no
  - *titlebar*：是否显示标题栏，值：yes（默认）/no
  - *toolbar*：是否显示工具栏，值：yes（默认）/no

  在这些配置项中，各浏览器的支持情况都不是很理想，在目前标准（包括HTML5标准和ECMAScript标准）支持最好的Google Chrome上也只支持上面的前四个配置。所以，如非定制浏览器开发，否则没有必要去进行配置。

- 记录

  在浏览器历史中替换或新建记录，为一个布尔值。true为替换，false为新建。

  我们来看一个示例：

```html
<!-- HTML部分 -->
<form>
	<button type="button" id="nothing">新窗口</button>
	<button type="button" id="openBaidu">百度</button>
	<button type="button" id="openTencent">腾讯</button>
</form>

<!-- JavaScript部分 -->
<script type="text/javascript">
	var nothing     = document.getElementById('nothing');
	var openBaidu   = document.getElementById('openBaidu');
	var openTencent = document.getElementById('openTencent');

	nothing.onclick = function() {
		window.open();
	}
	openBaidu.onclick = function() {
		window.open("https://www.baidu.com", "百度", "width=900, height=500, top=100,left=100");
	}
	openTencent.onclick = function() {
		window.open("http://www.qq.com/", "腾讯", "channelmode=yes, fullscreen=yes");
	}
</script>
```

## 2、window.print()

  在PC端很多网站的《XXX服务条款》或需要用传统笔来填写和签名的表格都会有一个“打印”按钮，用于连接有打印机的设备打印当前的页面。这个时候只需要简单一句代码即可实现，如例：

```html
<button type="button" onclick="print()">打印</button>
```

  在点击了绑定“print()”按钮之后只需要按照平时页面打印的常规设置即可使用打印机进行打印。这里需要注意的一个小细节是，在打印页面最上方会有两段小的文字，一个是当前电脑上的月份和日期，后面一个是写在HTML的\<head>标签里\<title>标签内的文本内容，可以根据需要设置。

## 3、window.getSelection()

  getSelection()方法返回一个Selection对象，表示用户现在选中的文本。而用这个方法的toString()方法可以用于返回被选中的文本。我们来通过一个简单的示例来了解该方法的实际运用：

```html
<!-- HTML部分 -->
<div id="selection">这是一段用于测试被选中的内容的文本。</div>
<div id="resText">
	<span>您选中的是：</span>
	<span></span>
</div>
<!-- JavaScript部分 -->
<script type="text/javascript">
	var selection = document.getElementById('selection');
	var resText = document.getElementById('resText');

	selection.onmouseup = function() {
		var sltObj = getSelection();
		var sltTxt = sltObj.toString();
		var resShow = document.getElementsByTagName('span')[1];
		resShow.textContent = sltTxt;
	}
</script>
```

  示例中使用了一个“*onmouseup*”事件来激活用户选择文本的操作，该事件触发户松开鼠标左键的时候。通过我们后面章节学习的“JavaScript事件”可以利用该方法来完成一些有意思的功能，也可以用来简化界面操作，提升用户体验。

## 4、setTimeout()

  在一个稍微复杂一点的项目中，很多时候我们是需要控制代码执行的时间的，也就是需要控制代码执行的顺序。单纯地调整代码执行的位置很多时候在满满都是各种回调函数的程序里面是行不通的,这个时候我们就需要用到延时函数（又称“延迟函数”）“*setTimeout(function, delay)*”。

  这个函数包含两个参数，第一个参数接收一个function数据类型的值（也可以是“函数名+()”的字符串），第二个参数表示延时执行的时间，单位为“毫秒”。接下来我们来看一下延时函数的用法。

  第一种用法就是直接将需要执行的函数的名称作为第一个参数，或写成需要执行的“函数名+()”的字符串形式，如下：

```javascript
// 定义一个控制台输出函数	
function printText() {
	console.log("延时输出内容！");
}
// 延时1s执行
setTimeout(printText, 1000);
// 或写成
setTimeout("printText()", 1000);
```

  如果需要执行的函数没有参数，可以采用上例的第一种写法，如果需要带参数的话，就需要采用上例的第二种写法，但是采用上例的第二种写法需要注意，带进括号的参数也属于字符串的一部分，不能使用字符串拼接。

```javascript
// 定义一个控制台输出函数	
function printText(text) {
	console.log(text);
}
var content = "延时输出内容！";

setTimeout("printText("+ content +")", 1000); // 报错
setTimeout("printText(content)", 1000);  // 正确1
setTimeout("printText('延时输出内容！')"); // 正确2
```

  关于setTimeout()函数的第二种写法就是直接将第一个参数设为一个匿名函数，然后再在里面编写语句或调用方法。在功能比较复杂的项目中，这种写法更被推崇。因为这样可以让一个延时函数执行多个函数或方法，一定程度上降低了代码的耦合度，参数的配置也更符合我们平时开发的习惯。

```javascript
function sum(a, b) {
	return a + b;
}

setTimeout(function () {
	console.log(sum(10, 20) + sum(20, 30));
}, 1000);
```

  在实际开发中还有一种需求，就是需要延时执行的代码因为某种条件的成立需要取消执行，这个时候就可以用到“与之配套”的“*clearTimeout()*函数”，它可以清除正处于延时过程中的函数，使之不再执行。它的参数为延时函数的实例化对象（变量）名称。也就是说，哪怕将setTimeout()函数赋给一个变量它也是也能执行的。我们来看下面的例子：

```html
<!-- HTML部分 -->
<form>
	<button type="button">延迟显示结果</button>
	<button type="button">取消结果显示</button>
</form>
<p id="resShow"></p>

<!-- JavaScript部分 -->
<script type="text/javascript">

var btn1 = document.getElementsByTagName('button')[0];
var btn2 = document.getElementsByTagName('button')[1];
var p    = document.getElementById('resShow');

function printText() {
	p.textContent = "这是延迟显示的结果！";
}

// 接收延时函数
var timeout;

btn1.onclick = function() {
	// 执行延时函数
	timeout = setTimeout(function() {
		printText();
	}, 2000);
}

btn2.onclick = function() {
	// 取消延时函数
	clearTimeout(timeout);
}

</script>
```

  对于将一个延时函数赋给一个变量的方式需要说明一点，就是这样的做法不需要任何事件去触发，它也是会执行的。所以不要企图将一个延时函数存为一个变量，待需要的时候才去调用这个变量。

## 5、setInterval()

  该函数的代码结构及大体功能和 *setTimeout()* 函数一样，但区别是该函数会根据设置的第二个参数的毫秒数作为间隔来 *重复执行*，它同样有一个配套的中止函数方法“*clearInterval(function, delay)*”。

```javascript
var n = 10;
var interval;
interval = setInterval(function(){
	if (n == 0) {
		this.clearInterval(interval);
		console.log('定时器停止！');
	}else {
		console.log(--n);
	}
}, 1000);

// test.html:17 9
// test.html:17 8
// test.html:17 7
// test.html:17 6
// test.html:17 5
// test.html:17 4
// test.html:17 3
// test.html:17 2
// test.html:17 1
// test.html:17 0
// test.html:15 定时器停止！
```

  定时执行函数在现在的项目中有有非常多的用处，基本每个项目都会有所涉及，常用于开发如图片轮播，倒计时，定时数据更新，计时关闭跳转页面等功能，务必要熟悉其使用方法。

# 四、文档对象 document

  对于window对象来说，document和DOM里面的document还是稍稍有些区别的，window对象的document子对象只有一个属性，就是“all”属性，它可以返回当前页面的标签集合，组成一个类似数组的对象。

  新建一个基本的HTML文档：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>测试文件</title>
</head>
<body></body>
</html>
```

  在控制台测试这个属性：

![](IMGS/part_10_2.jpeg)

  该属性已经被标准化的DOM操作所代替，不过在一些较老的项目里仍然可以看到其身影。

# 五、框架对象 frames

  在这一章的第一节中通过例子我们已经见到过，frames和window是严格相等的，实际上，frames只是window的别名，它们表示的应用场景是不一样的。但只要window具有的属性，frames也具有，反之也成立。

  为了证明上述，我们看一个示例：

```html
<body>
	<iframe src="" frameborder="0" name="iframe1"></iframe>
	<iframe src="" frameborder="0" name="iframe2"></iframe>
	<iframe src="" frameborder="0" name="iframe3"></iframe>
</body>
<script type="text/javascript">

    // 设置当前窗口的名称
	window.name = "testIframe";
	// 访问frames的名称
	console.log(frames.name); // "testIframe"
	// 当前窗口含有的窗口
	console.log(window.length); // 3
	console.log(frames.length); // 3
</script>
```

   通过这个测试可以发现，window对象和frames对象完全是同一个对象，它们都是内存里那个window对象的引用，其中一个对象的属性发生变化，和它相关的对象随之变化。

  在HTML中提到过，\<iframe>标签就是“浏览器窗口中嵌入的浏览器窗口”。像上面那3个已经具有了name属性的\<iframe>标签我们可以通过这样的形式去访问：

![](IMGS/part_10_3.jpeg)

  通过这个测试又可以发现，不仅可以简单地通过frames对象简单地去访问这些iframe;，而且它们返回的结果和之前我们看到的window等同引用的对象的返回结果基本是一样的，注意这里说的是“基本一样”，因为从最后三个测试结果可以发现，这三个iframe是互不相等的。

  要访问页面内指定的iframe除了上面提供的方法外，还可以用索引下标或中括号字符串的形式去访问。比如说现在我们要访问刚才那个name属性为“iframe2”的\<iframe>标签，还可以使用下面两种形式：

![](IMGS/part_10_4.jpeg)

  在Ajax不盛行的年代，\<iframe>标签是在页面内嵌入网站的最好选择，但随着JavaScript相关编程技术的高速发展，使用\<iframe>标签嵌套子页面的形式已经开始不被推荐，而是用Ajax的异步加载的形式去请求“*文档片段*”，这样可以使得页面不需要再去加载子页面内的整个css和js等文件，和一些不必要的标签（包括整个\<head>标签和文档声明）。这样一来就使得页面加载的速度得到很大提升，页面也不会因为跳转刷新出现短暂白屏的情况，从而使得用户体验得到提升。不需要页面跳转，网站所有功能都通过一个页面完成的页面现在的术语叫法为“*SPA*”（single page application，译为：单页面应用程序。也有叫“SPWA”，其中的“W”表示“web”），是现在Web互联网应用开发的一个主流趋势。

# 六、屏幕对象 screen

  屏幕对象和相关的属性都是只读的，它们返回浏览器相对于当前计算机屏幕的数据信息。

  screen对象是用于描述当前浏览器相对于屏幕信息的主要对象，所含属性如下：

![](IMGS/part_10_5.jpeg)

  其中availWidth和availHeight表示的是当前的浏览器窗口相对于屏幕而言的可用宽度和高度，而colorDepth和pixelDepth表示的是颜色深度和像素深度这些色彩图形学上的东西。

  和屏幕相关的还有以下属性：

- **screenLeft**：返回当前浏览器窗口距离屏幕左侧的像素数值
- **screenTop**：返回当前浏览器窗口距离屏幕上侧的像素数值
- **screenX**：作用和screenLeft相同
- **screenY**：作用和screenTop相同

  之所以出现这样同功能的属性归根到底，还是因为BOM一直没有一个标准造成的，根据资料显示支持screenLeft和screenTop的浏览器有：IE、Chrome、Safari、Opera，但Firxfox不支持。而支持screenX和screenY的浏览器有：Firxfox、Chrome、Safari、Opera，但IE不支持。

  为了解决这样兼容性问题，我们可以用一个自定义的三元表达式的办法来解决：

```javascript
// 窗口距离屏幕左侧
var scrMarginX = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
// 窗口距离屏幕右侧
var scrMarginY = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;
```

  现在我们就尝试多次调整浏览器窗口来试验一下刚才自定义的“属性”：

![](IMGS/part_10_6.jpeg)

  但是需要注意的是使用我们自定义变量来接收浏览器屏幕信息需要每次窗口移动后都要进行一次表达值赋值，否则我们的“属性值”永远是第一次取到的值。显然这样的做法并不好，但由于BOM标准的问题，这也是一种不得已而为之的办法，只是一种浏览器兼容性的方案。

# 七、导航对象 navigator

  这个对象用来包含浏览器详细信息的对象，通常用于做浏览器兼容性处理和设备的响应设计。可以打开浏览器输入这个navigator对象的名称来查看不同的浏览器的相关属性，这里我们还是以现在国内使用量[排行第一](http://tongji.baidu.com/data/browser)（并且也是最长时间来对[HTML5](http://html5test.com/)和[ECMAScript 6](https://kangax.github.io/compat-table/es6/)支持最好的浏览器）的Google Chrome进行测试：

![](IMGS/part_10_7.jpeg)

  在控制台输出的内容为一个对象，对象展开后会包含比较多的属性，其中“*userAgent*”是一个比较重要的属性。在早期作浏览器判断都是依靠这个属性，不过随着浏览器版本的发展，再用这个属性去区分不同的浏览器已经行不通了。可以尝试地在控制台输入这个属性进行观察：

![](IMGS/part_10_8.jpg)

  通过观察，可以在里面发现一些其它浏览器的信息，如“Mozilla”（FireFox浏览器厂商）和“Safari”（苹果浏览器）这些额外的信息，所以想通过它来判断当前浏览器究竟是哪个浏览器是不可能了，但是使用这个属性还是可以用于判断当前的设备是PC端还是移动端的。现在我们通过谷歌开发者工具将当前环境模拟为移动端环境，然后再次在控制内输入navigator.userAgent这个属性观察：

![](IMGS/part_10_9.jpg)

  通过肉眼对比已经可以发现两端代码的长度是不一样的了，认真对比还会发现里面有些内容被替换了，而且还新增了一些字符，如“iPhone”、“iPhone OS 9_1”、“Mobile”等字符。利用这一点我们可以用来很好地解决一些跨平台的代码兼容性问题，或者开发针对设备的特殊交互效果。

  现在我们利用navigator.userAgent来编写一段用于判断当前环境是否为移动端并且是否是“iPhone”手机的代码：

```javascript
function testIPhone() {
	let navUserAgent = window.navigator.userAgent.toLowerCase();
	let isMobile = /Mobile/i.test(navUserAgent);
	let isIPhone = /iphone/i.test(navUserAgent);
	if (isMobile && isIPhone) {
		return "当前运行的环境为移动端，使用的手机为'iphone'.";
	}else if(isMobile) {
		return "当前运行的环境为移动端，使用的手机不是'iphone'.";
	}else {
		return "当前运行的环境不是移动端";
	}
}
```

  然后我们就几种情况进行测试。

- PC端：

  ![](IMGS/part_10_10.jpg)


- iPhone 4：

  ![](IMGS/part_10_11.jpg)

- Samsung Note 3：

  ![](IMGS/part_10_12.jpg)

    若在PC端判断当前的浏览器厂商也提供了一个属性，就是“navigator.*vendor*”。虽然这个属性得到了现在主流浏览器的支持，但除了谷歌会返回“Google Inc.”的字符串结果外，其它浏览器目前返回的仍然是一个空字符串（以Google Chrome 57版本同期时段为例），相信以后更多浏览器厂商会加上这个信息。
# 八、位置对象 location

  该对象同样属于window对象中的一个子对象，它用于描述当前页面的*地址信息*。首先我们拿百度首页来做这个对象的测试，简单观察该对象的相关属性属性。

![](IMGS/part_10_13.jpeg)

  现在我们就按照对象返回属性的这个顺序开始简单地讲解这个对象，我们首先来看里面的属性：

- **hash**

  地址栏的“*哈希值*”，返回或设置当前地址的哈希值，如果没有哈希值则返回空字符串。返回和设置的值以“#”号开始，后面接一段字符或简单符号组成的字符，如当前课件地址栏中的“#”+英文字母的部分。这个属性是现在SPA页面（单页面）做页面路由常用的一个属性。

- **host**

  设置或返回当前URL主机名和端口号（如果有的话）。通过设置这个属性可以达到跳转页面的效果。如现在有一个URL“https://github.com/LiHongyao/”，将其host设置为“baidu.com”的话，它会跳转到“https://www.baidu.com/”这个URL对应的页面。

- **hostname**

  设置或返回当前URL的主机名。除了不能返回端口号，该属性作用和host属性基本一致。

- **href**

  设置或返回完整的URL。相对于host等属性来说，href的表达更加完整，是经常用于做页面跳转的属性。

  该属性在项目的很多地方都会涉及。如这样一个场景：当一个用户进入一个有账户系统的网站去点击名为“个人中心”的导航按钮。这个时候我们就需要做出如下判断：通过一个设置在全局里值为布尔型的对象属性判断当前用户是否登录，如果登录了，那直接跳转向“个人中心”获取并显示该用户的相关信息；如果判断出该用户还没有登录，那将跳转向“用户登录”所在的页面。

  ```javascript
  var userInfo = {
  	name: "Henrry Lee",
  	vip: 3,
  	loginState: true
  	// ...
  }
  // 当用户出发了“个人中心”的点击事件函数
  function toUserCenter() {
  	// 如果已经登录
  	if (userInfo.loginState) {
  		// 跳转到个人中心
  		window.location.href = "user/usercenter.html";
  	}
  	// 如果没有登录
  	else {
  		// 跳转到登录页面
  		window.location.href = "user/login.html";
  	}
  }
  ```

  当然，在本例中使用的跳转只是跳转“*同域*”。如果有特殊需要也可以跳转向其它域名，这个时候就需要输入类似于“http://www.?????（注册域名名称）.com”这样的URL地址了。

- **origin**

  表面看上去它和href属性没有什么区别，但若当地址里面带有“?”及后面的参数的时候就不一样了，该属性只会返回“?”之前的内容，而href会将完整的URL返回（这一点可以进入任意电子商务网站，点击超链接进入用户登录的页面，观察地址栏）。

- **pathname**

  设置或返回当前URL的路径部分。在我们上面输出百度的location属性时看到这个属性返回的值为“/”，这是因为现在处于这个网站的根目录下。也就是说如果进入这个网站的更深一级目录，再去访问这个属性的时候即可看到当前所在的路径了（如果HTTP服务器设置的默认页面名不为“index.html”的话，那这个字符串也会被返回）。

- **port**

  设置或返回当前URL的端口号。

- **protocol**

  设置或返回当前URL的协议，常见如“http:”、“https:”、“file:” 等。现在通常用来做网站协议类型“http”升级到“https”之后的重定向，帮助用户点击浏览器收藏夹或复制而来的网址都能正常地跳转向“https”协议的地址。

- **search**

  设置或返回从问号“？”开始的URL，及查询部分。

  除了这些属性外，location对象包含了三个方法：

- **assign()**

  加载新的Web文档，除了“属性”和“方法”使用上的区别外，它和location.href的用途基本是完全一样的。

  ```javascript
  window.location.href = "https://www.baidu.com/"
  // 等价于
  window.location.assign("https://www.baidu.com/")
  ```

- **reload()**

  重新加载当前Web页面。相当于按下了键盘上的“F5”按键或点击浏览器刷新按钮的功能。该方法有一个可选参数，为一个布尔值。当值为true的时候，当前的页面将不会从浏览器缓存去加载当前的页面，而是去服务器端获取相关的资源，而值为false（默认）的时候，页面会从浏览器缓存里去获取相关资源。

- **replace()**

  该方法的使用和assign()一样，区别是该方法不会留下历史记录。因为从名称可以大概明白它的实现方式是用一个页面“替换”掉当前的Web页面，这样不会留下历史记录，即通过点击浏览器的返回按钮无法回到之前的页面。

# 九、历史对象 history

  浏览器有一个history对象，这个对象用于保存页面浏览通过超链接或程序链接跳转的记录，通常会将其直译为“*历史记录*”对象。首先，按照我们“一贯的作风”，将这个对象在浏览器的控制台进行一次输出观察。

![](IMGS/part_10_14.jpeg)

  可以发现，这个对象只有3个属性，分别是：记录长度、记录回滚和状态，但实际上这个对象的真正实用的方法都是“藏”在了原型里，我将“__proto__”展开后再看看这些方法。

![](IMGS/part_10_15.jpeg)

  细心一点可以发现，这个原型里面基本不包含属性（有也只是之前的那3个属性），基本都是以方法的形式存在的。我们首先来看一下这个对象常用的3个原型方法：

- **history.back()**

  返回到上一个访问页面，等同于浏览器的后退键。用于制作手机客户端左上角的返回按钮是个不错的选择。不要将返回的按钮设置为一个超链接，因为有的时候不知道是从哪个页面跳到这个页面的，如果用超链接的方式有时是无法正确回到上一个页面的。

- **history.forward()**

  前进到下一个访问页面，等同于浏览器的前进键。

- **history.go()**

  相对当前记录后退或前进到第几个记录，参数为一个“正负整数”。如例说明：

  ```javascript
  history.go(-2); // 回退到上上个页面
  history.go(-1); // 回退到上个页面
  history.go(0);  // 相当于刷新当前页面
  history.go(1);  // 前进到下个页面
  history.go(2);  // 前进到下下个页面
  ```

  另外，HTML5后还新增了pushState()和replaceState()这两个方法，它们用于新增和修改当前的历史记录，这两个方法都包含三个参数：

- ***state***：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
- ***title***：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
- ***url***：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。

  “state”这个里面的popstate事件是当同一个文档的history对象出现变化时才会触发。但是，仅仅调用pushState()方法或replaceState()方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用JavaScript调用back()、forward()、go()方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

  通过上面的描述，我们基本可以大致能归类出pushState()和replaceState()这两个方法的一个用途了，就是如果当前网站采用的是Ajax的SPA页面的话，可以使用这两个方法来模拟出页面的跳转（实际上页面并没有跳转，只是通过Ajax导入了新的内容，而这些内容正是这两个方法URL参数里对应的页面而已）

  由于我们还没有正式地开始学习Ajax的相关内容，这两个方法现在就暂时不作深入的讲解了，在以后学习Ajax后再将这两个方法拿来做实际运用的例子。

# 十、Web Storage机制

  “*Web Storage*”是HTML5新增的一种数据存储机制，随着浏览器对HTML5的支持度不断增加，在新建的项目中基本已经取代了*cookie*（它是服务器保存在浏览器的一小段文本信息，每个Cookie的大小一般不能超过4KB，超过这个长度的Cookie，将被忽略，不会被设置）。

  “Web Storage”更像是cookie的强化版，能够动用大得多的存储空间。目前，每个域名的存储上限据浏览器而定，Chrome是2.5MB，Firefox和Opera是5MB，IE是10MB。其中，Firefox的存储空间由一级域名决定，而其他浏览器没有这个限制。也就是说，在Firefox中，“https://music.baidu.com”和“https://zhidao.baidu.com”共享5MB的存储空间。另外，与Cookie一样，它们也受同域限制。某个网页存入的数据，只有同域下的网页才能读取。

  “Web Storage”存储机制包含*sessionStorage*和*localStorage*这两个对象，从名称上直译，可以将其称作“*会话存储*”和“*本地存储*”。它们存储值的方式和JavaScript中对象属性储存值的方式一样，都是以“键值对”存在的，这两个对象的区别是：会话存储（sessionStorage）的键值在浏览器关闭后会被清除，而本地存储（localStorage）存储的键值会一直存在于浏览器中，除非被手动清除或使用clear()方法清除。需要注意，浏览器自带的“历史记录”清除功能也无法将其清除。这样一来我们Web前端开发者也可以达到“数据持久化存储”的目的了。接下来我们看学习这两个对象的使用方式。

## 1、window.sessionStorage

  学习这个对象首先要从*setItem()*这个方法开始，这个方法包含两个参数，第一个参数为这个对象的键名（属性名），第二个参数为这个对象的键值（属性值），配置和访问方法如下：

![](IMGS/part_10_16.jpeg)

  这样一来我们就将这个属性名为“name”的键值对存入了浏览器。除了直接输出sessionStorage这个对象以外，我们还可以在开发者工具的“Application”中“Storage”一栏的“Session Storage”子菜单中去查看存储的值。

![](IMGS/part_10_17.jpeg)

  这个值现在已经被存入浏览器，只要不关闭浏览器，当前域名下的这个值就始终是存在的，关闭浏览器后再次打开浏览器会发现这个键值对已经被销毁了。

  如果是要读取已经存储于浏览器内的sessionStorage的值就需要用到 *getItem()* 这个方法了，方法参数为指定的键名，如例：

```javascript
var name = sessionStorage.getItem('name')
console.log(`您上次存储的作者名为：“${name}”`)
// 您上次存储的作者名为：“Henrry Lee”
```

  如果需要清除指定的键值对可以使用*removeItem()*，方法参数为指定的键名，如例：

```javascript
sessionStorage.removeItem('name')
sessionStorage.getItem('name')
// null
```

  这个时候再去开发者工具“Application”栏里去查看刚才存储的值，发现“name”键值对已经不存在了。

  如果是要一次性清除所有sessionStorage对象存储的键值对，可以使用*clear()*方法，该方法不需要参数。

```javascript
sessionStorage.clear()
```

## 2、window.localStorage

  该对象的所有方法和sessionStorage完全一致。在浏览器查看的位置位于开发者工具中“Application”栏中“Storage”一栏的“Local Storage”子菜单中。它们的区别在于，localStorage可以真正地实现数据的“永久存储”，即使用户关闭浏览器，或使用清除浏览历史等功能，通过localStorage存储的数据仍然存在。

## 3、extension

  这两个存储对象可以通过 *key()* 方法遍历出所有的键名，现在以localStorage为例先创建几个键值对，然后对其进行键名的遍历存入一个数组：

```javascript
localStorage.setItem('name', "Henrry Lee");
localStorage.setItem('age', "24");
localStorage.setItem('profession', "Web前端工程师");
localStorage.setItem('address', "四川省成都市");

var arr = [];
for (var i = 0; i < localStorage.length; i++) {
	arr.push(localStorage.key(i))
}
console.log(arr);
// ["address", "age", "name", "profession"]
```

  当储存的数据发生变化时，会触发storage事件。我们可以为window添加监听函数来监听“Web Storage”的两个对象发生值变化事件，通过回调函数来执行相应的函数操作，回调函数接受一个event对象作为参数。这个event对象主要包含4个属性：

- ***key***：保存发生变化的键名
- ***oldValue***：更新前的值。如果该键为新增加，则这个属性为null
- ***newValue***：更新后的值。如果该键被删除，则这个属性为null
- ***url***：原始触发storage事件的那个网页的网址

监听函数的格式如下：

```javascript
window.addEventListener('storage', function(e) {
	console.log(e.key);
	console.log(e.oldValue);
	console.log(e.newValue);
	console.log(e.url);
});
```

  值得特别注意的是，该事件不在导致数据变化的当前页面触发。如果浏览器同时打开一个域名下面的多个页面，当其中的一个页面改变sessionStorage或localStorage的数据时，其他所有页面的storage事件会被触发，而原始页面并不触发storage事件。可以通过这种机制，实现多个窗口之间的通信。所有浏览器之中，只有IE浏览器除外，它会在所有页面触发storage事件。

  对于“Web Storage”还有一点需要补充说明的是，它们只能存储字符串的值。若需要进行数值计算和条件判断的时候记得需要进行数据类型转换。存储为数组形式的值，取到的值也是一段用逗号分隔的字符串，也需要用“*split(",")* ”方法重新转换回数组的形式。但如果是存储内容为一个对象的时候，返回的是"[object Object]"的字符串，如下。

```javascript
var obj = {
	name: "Henrry Lee",
	age: 24,
	address: "四川省成都市"
}
localStorage.setItem("userInfo", obj);
localStorage.getItem("userInfo");
// [object Object]
```

  这个时候我们需要用JSON提供的两个方法来完成“Web Storage”对对象的存储，即：parse()和stringify()方法，使用方法如例：

```javascript
var obj = {
	name: "Henrry Lee",
	age: 24,
	address: "四川省成都市"
}
// 转成JSON字符串格式
var strObj = JSON.stringify(obj);
localStorage.setItem("userInfo", strObj);

// 访问
var storageStrObj = localStorage.getItem("userInfo");
// 将JSON字符串转为JS对象
var jsObj = JSON.parse(storageStrObj);
console.log(jsObj);
```

