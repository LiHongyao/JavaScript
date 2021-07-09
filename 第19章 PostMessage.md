# 一、前言



postMessage是HTML5引入的API，`postMessage()` 方法允许来自不同源的脚本采用异步方式进行有效的通信，可以实现跨文本文档，多窗口，跨域消息传递。多用于窗口间数据通信，这也使它成为跨域通信的一种有效的解决方案。

**➦ 兼容性**

![](https://s5.mogucdn.com/mlcdn/fe720b/210510_7c43f8hi991cgdb650e901kf4dbg1_1364x407.png)

**➦ message 事件对象**

message 事件包含5个只读属性：

- data：包含任意字符串数据，由原始脚本发送
- origin：一个字符串，包含原始文档的方案、域名以及端口(如：http://domain.example:80)
- lastEventId：一个字符串，包含了当前的消息事件的唯一标识符。
- source：原始文件的窗口的引用。更确切地说，它是一个[WindowProxy对象](http://www.whatwg.org/specs/web-apps/current-work/multipage/browsers.html#windowproxy)。
- ports：一个数组，包含任何[MessagePort](http://dev.w3.org/html5/postmsg/#messageport)对象发送消息。

在跨文档通信和通道通信中，`lastEventId`的值一般是个空字符串；`lastEventId`应用在服务器端发送事件上。发送信息中如果没有ports, 则`ports`属性值就是个长度为0的数组。

`MessageEvent`继承DOM[事件接口](http://dvcs.w3.org/hg/domcore/raw-file/tip/Overview.html#interface-event)，且属性共享。然而，通信事件并没有冒泡，不能取消，也没有默认行为

# 二、API

## 1. 发送数据

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

- otherWindow：其他窗口的一个引用，比如iframe的contentWindow属性、执行[window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)返回的窗口对象、或者是命名过或数值索引的[window.frames](https://developer.mozilla.org/en-US/docs/Web/API/Window/frames)。
- message：将要发送到其他 window的数据。
- targetOrigin：通过窗口的origin属性来指定哪些窗口能接收到消息事件，指定后只有对应origin下的窗口才可以接收到消息，设置为通配符（`*`）表示可以发送到任何窗口，但通常处于安全性考虑不建议这么做.，如果想要发送到与当前窗口同源的窗口可设置为 `/`。
- transfer | 可选属性：是一串和message同时传递的**Transferable**对象,这些对象的所有权将被转移给消息的接收方,而发送一方将不再保有所有权。

## 2. 接收数据

```js
window.addEventListener("message", receiveMessage, false) ;
function receiveMessage(event) {
     var origin= event.origin;
     console.log(event);
}
```

# 三、示例

父窗口:

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>INDEX PAGE</title>
</head>

<body>
  <div style="margin-bottom: 16px;">
    <input placeholder="请输入您要发送的信息" />
    <br />
    <br />
    <button type="button">发送</button>
  </div>
  <iframe src="http://127.0.0.1:5500/index.html"></iframe>
</body>

<script>
  // 1. 发送消息给子窗口
  const iframe = document.querySelector('iframe');
  const input = document.querySelector('input');
  const button = document.querySelector('button');

  button.addEventListener('click', () => {
    iframe.contentWindow.postMessage(input.value, '*')
  }, false);
  // 2. 监听子窗口返回的消息
  window.addEventListener('message', e => {
    console.log(e.data);
  }, false)

</script>

</html>
```

子窗口：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTHER PAGE</title>
</head>

<body>
  <div>Sub window recived message is:</div>
  <div class="ct"></div>
  <script>
    const ct = document.querySelector('.ct');
    window.addEventListener('message', e => {
      ct.textContent = e.data;
      parent.postMessage('信息已收到!', '*')
    }, false);
  </script>
</body>


</html>
```

# 四、参考

- https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage
- https://www.zhangxinxu.com/wordpress/2012/02/html5-web-messaging-cross-document-messaging-channel-messaging/

