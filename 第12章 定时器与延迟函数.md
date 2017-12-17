# # 延时调用 setTimeout()

  在实际开发中，我们可能会延时执行某一个操作，比如主页加载完之后，延时几秒弹出广告，这个时候我们就需要用到延时函数（又称“延迟函数”），其语法形式为：`setTimeout(function, delay)`。

  这个函数包含两个参数，第一个参数为回调函数（即延时时间结束之后调用的函数）；第二个参数表示延时执行的时间，单位为“毫秒”。接下来我们来看一下延时函数的用法。

  第一种用法就是直接将需要执行的函数名称作为第一个参数，或写成需要执行的“函数名+()”的字符串形式，如下：

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
setTimeout("printText(content)", 1000);  // 正确
setTimeout("printText('延时输出内容！')"); // 正确
```

  关于 `setTimeout()` 函数的第二种写法就是直接将第一个参数设为一个匿名函数，然后再在里面编写语句或调用方法。在功能比较复杂的项目中，这种写法更被推崇。因为这样可以让一个延时函数执行多个函数或方法，一定程度上降低了代码的耦合度，参数的配置也更符合我们平时开发的习惯。

```javascript
setTimeout(function () {
	console.log(`Hello, world!`);
}, 1000);
```

  在实际开发中还有一种需求，就是需要延时执行的代码因为某种条件的成立需要取消执行，这个时候就可以用到与之配套的 `clearTimeout()` 函数，它可以清除正处于延时过程中的函数，使之不再执行。它的参数为延时函数的实例化对象（变量）名称。也就是说，哪怕将 `setTimeout()` 函数赋给一个变量它也是也能执行的。我们来看下面的例子：

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

# # 定时器 setInterval()

  该函数的代码结构及大体功能和 **setTimeout** 函数一样，但区别是该函数会根据设置的第二个参数的毫秒数作为间隔来 重复执行，它同样有一个配套的中止函数方法: `clearInterval(function, delay)`。

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

// 9
// 8
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// 定时器停止！
```

  定时执行函数在现在的项目中有有非常多的用处，基本每个项目都会有所涉及，常用于开发如图片轮播，倒计时，定时数据更新，计时关闭跳转页面等功能，务必要熟悉其使用方法。