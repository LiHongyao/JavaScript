# 一、概述

JavaScript 是一门 **单线程的 /非阻塞** 的脚本语言，单线程意味着JavaScript在处理任务的时候，所有任务只能在一个线程上排队被执行。非阻塞靠的就是 event loop（事件循环）。

为了协调事件、用户交互、脚本、UI 渲染和网络处理等行为，用户引擎必须使用 event loops（摘自[官网](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)译文）。Event Loop 包含两类：一类是基于 Browsing Context ，一种是基于 [Web-Worker]()  ，二者是独立运行的。 

# 二、构成

Event loop主要由三部分组成：**主线程、宏队列（macro task）、微队列（micro task）**

在最新标准中，宏任务与微任务被分别称为task与jobs。

JavaScript的任务队列分为 <ins>同步任务</ins> 和 <ins>异步任务</ins>，所有的同步任务都是在主线程里执行的，异步任务可能会在宏队列或者微队列里面。

**同步任务**：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；

**异步任务**：不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

# 三、宏队列 vs 微队列

在JavaScript中，任务被分为两种：宏任务（task）和微任务（jobs）：

| #      | 场景                                                         |
| ------ | ------------------------------------------------------------ |
| 宏任务 | script(整体代码)、setTimeout、setInterval、setImmediate、I/O、UI rendering |
| 微任务 | Promise.then()、await、MutaionObserver、process.nextTick     |

宏任务与微任务都是独立于主线程之外的另外两个队列，可以在概念上划分在<ins>异步任务队列</ins>里。而这些队列由JavaScript的事件循环来搞定。

微任务（jobs）优先于宏任务（task）执行，所以如果有需要优先执行的逻辑，放入microtask 队列会比 task 更早的被执行。每个宏任务结束后，都要清空所有的微任务。

# 四、执行顺序

1、先执行主线程

2、遇到宏队列（task）放到宏队列（task）

3、遇到微队列（jobs）放到微队列（jobs）

4、主线程执行完毕

5、执行微队列（jobs），微队列（jobs）执行完毕

6、执行宏队列（task），宏队列（task）执行完毕

上述过程的不断重复就是我们说的 <ins> Event Loop</ins>。

在事件循环中，每进行一次循环操作称为tick，每一次 tick 的任务处理模型是比较复杂的，其关键的步骤可以总结如下：

1. 在此次 tick 中选择最先进入队列的任务( oldest task )，如果有则执行(一次)
2. 检查是否存在 Microtasks（宏/微任务） ，如果存在则不停地执行，直至清空Microtask Queue
3. 更新 render
4. 主线程重复执行上述步骤

可以用一张图来说明下流程：

![](./IMGS/event-loop-tick.jpg)

# 五、代码示例

[参考 >>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

【示例-01】

```js
(function() {

  console.log('this is the start');

  setTimeout(function cb() {
    console.log('Callback 1: this is a msg from call back');
  }); // has a default time value of 0

  console.log('this is just a message');

  setTimeout(function cb1() {
    console.log('Callback 2: this is a msg from call back');
  }, 0);

  console.log('this is the end');

})();

// "this is the start"
// "this is just a message"
// "this is the end"
// "Callback 1: this is a msg from call back"
// "Callback 2: this is a msg from call back"
```

【示例-02】

```js
console.log('start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise1');
}).then(() => {
  console.log('promise2');
});

console.log('end');
```

代码分析：

\1. 整体 script  作为第一个宏任务进入主线程，遇到 console.log，输出 ”start“

\2. 遇到 setTimeout，其回调函数被分发到宏任务 Event Queue 中

\3. 遇到 Promise，其 then函数被分到微任务 Event Queue 中,记为 then1，之后又遇到了 then 函数，将其分到微任务 Event Queue 中，记为 then2

\4. 遇到 console.log，输出 script end

至此，Event Queue 中存在三个任务，如下表：

| 宏任务     | 微任务 |
| ---------- | ------ |
| setTimeout | then1  |
| -          | then2  |

\5. 执行微任务，首先执行then1，输出 promise1, 然后执行 then2，输出 promise2，这样就清空了所有微任务

\6. 执行 setTimeout 任务，输出 setTimeout 

因此，输出的顺序是：start -> end -> promise1 -> promise2 -> setTimeout

【示例-03】

```javascript
console.log('start');

setTimeout(function() {
  console.log('timeout1');
}, 5);

new Promise(resolve => {
    console.log('promise1');
    resolve();
    setTimeout(() => console.log('timeout2'), 5);
}).then(function() {
    console.log('then1')
})

console.log('end');
```

代码分析：

![](./IMGS/event-loop-eg.jpg)



因此，输出顺序为：start -> promise1 -> end -> then1 -> timeout1 -> timeout2

# 六、拓展

node.js中的非IO的异步API提供了四种方法，分别为setTimeOut(), setInterval(), setImmediate()以及process.nextTick()，四种方法实现原理相似，但达到的效果略有区别：

| #                  | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| process.nextTick() | 效率最高，消费资源小，但会阻塞CPU的后续调用                  |
| setTimeout()       | 精确度不高，可能有延迟执行的情况发生，且因为动用了红黑树，所以消耗资源大； |
| setImmediate()     | 消耗的资源小，也不会造成阻塞，但效率也是最低的。             |

[参考 >>](https://www.cnblogs.com/jymz/p/7900443.html)

> 注意：**JavaScript 是一门单线程语言，异步操作都是放到事件循环队列里面，等待主执行栈来执行的，并没有专门的异步执行线程**



