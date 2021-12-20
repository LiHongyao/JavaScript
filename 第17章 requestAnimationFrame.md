 # 一、前言

在Web应用中，实现动画效果的方法比较多：

- HTML5：Canvas

- CSS：Transition（过度） / Animation（动画）
- JavaScript：setInterval（定时器） / requestAnimationFrame（请求动画帧） / jQuery

本篇文章重点讲解 requestAnimationFrame **请求动画帧**；

requestAnimationFrame 的用法跟 setInterval 差不多，与 setInterval 相比，最大的优势是 **由浏览器来决定函数的执行时机**。形象一点的解释就是：告诉浏览器说 “我这里有一个函数要执行，你有空了帮忙执行一下”，然后浏览器相对比较空闲的时候就给执行了。

# 二、相关概念

为了理解 `requestAnimationFrame ` 背后的原理，我们首先需要了解一下与之相关的几个概念

## 1. 页面可见

当页面被最小化或者被切换成后台标签页时，页面为不可见，浏览器会触发一个 `visibilitychange` 事件，并设置 `document.hidden` 属性为 `true`；切换到显示状态时，页面为可见，也同样触发一个 `visibilitychange` 事件，设置 `document.hidden` 属性为 `false`。

## 2. 动画帧请求回调函数列表

每个Document都有一个动画帧请求回调函数列表，该列表可以看成是由 `<handlerId, callback>` 元组组成的集合。其中 handlerId 是一个整数，唯一地标识了元组在列表中的位置；callback是回调函数。

## 3. 屏幕刷新频率

即图像在屏幕上更新的速度，也即屏幕上的图像每秒钟出现的次数，它的单位是赫兹(Hz)。 对于一般笔记本电脑，这个频率大概是60Hz， 这个值的设定受屏幕分辨率、屏幕尺寸和显卡的影响。

## 4. 动画原理

根据上面的原理我们知道，你眼前所看到图像正在以每秒60次的频率刷新，由于刷新频率很高，因此你感觉不到它在刷新。而 **动画本质就是要让人眼看到图像被刷新而引起变化的视觉效果，这个变化要以连贯的、平滑的方式进行过渡。**  那怎么样才能做到这种效果呢？

刷新频率为60Hz的屏幕每16.7ms刷新一次，我们在屏幕每次刷新前，将图像的位置向左移动一个像素，即1px。这样一来，屏幕每次刷出来的图像位置都比前一个要差1px，因此你会看到图像在移动；由于我们人眼的视觉停留效应，当前位置的图像停留在大脑的印象还没消失，紧接着图像又被移到了下一个位置，因此你才会看到图像在流畅的移动，这就是视觉效果上形成的动画。

# 三、API

## 1. 语法

```js
const handlerId = window.requestAnimationFrame(callback);
```

- `callback`：下一次重绘之前更新动画帧所调用的函数（回调函数）
- `handlerId`：请求 ID，大于0的长整型 ，唯一标识了该回调函数在回调列表中的位置;

## 2. 浏览器执行过程

1）首先要判断 `document.hidden` 属性是否为`true`，即页面处于可见状态下才会执行；

2）浏览器清空上一轮的动画函数；

3）这个方法返回的 `handlerId` 值会和动画函数 `callback`，以`<handlerId , callback>`  进入到动画帧请求回调函数列；

4）浏览器会遍历动画帧请求回调函数列表，根据 `handlerId` 的值大小，依次去执行相应的动画函数。

## 3. 取消动画函数

```js
cancelAnimationFrame(handlerId)
```

# 四、使用

## 1. 动画

requestAnimationFrame API 本身的设计就是用来解决 JavaScript 动画的性能问题。那么，为什么 requestAnimationFrame 做动画性能会更好呢？主要原因在于 requestAnimationFrame 更加智能，它并非加快执行速度，而是适当时候降帧，防止并解决丢帧问题。当它发现无法维持60fps的频率时，它会把频率降低到30fps来保持帧数的稳定。也就是说如果上一次raf的回调执行时间过长，那么触发下一次raf回调的时间就会缩短，反之亦然，这也是为什么说由浏览器来决定执行时机性能会更好。

我们来看一个进度条的实现：

```html
<div class="progress">
  <div class="v"></div>
</div>
```

```css
.progress {
  width: 300px;
  height: 10px;
  border-radius: 12px;
  background: #eee;
}
.v {
  height: 100%;
  background: cornflowerblue;
  border-radius: 12px;
}
```

```javascript
let progress = document.querySelector('.v');
let step = 0;
let render = () => {
  step++;
  progress.style.width = `${step}%`;
  if(step < 100) {
    window.requestAnimationFrame(render);
  }
}
render();
```

## 2. 函数节流

在高频率事件中，为了防止16ms内发生多次函数执行，使用raf可保证16ms内只触发一次，这既能保证流畅性也能更好的节省函数执行的开销。**16ms内函数执行多次没有意义，因为显示器16ms刷新一次，多次执行并不会在界面上有任何显示。**

```javascript
window.onmousemove = ({ clientX, clientY }) => {
  requestAnimationFrame(() => {
    console.log(clientX, clientY);
  });
};
```

## 3. DPU节能

requestAnimationFrame的另一个特性是：如果页面不是激活状态下的话，函数会自动暂停，有效节省了CPU开销。在移动端，如果页面中有自动播放的轮播图、倒计时或使用`setTimeout/setInterval`来执行任务的定时器。那么**当app进到后台或是锁屏后，WebViewCoreThread仍然持续占用CPU，导致耗电**。而使用raf可以很简单的解决此类问题。

## 4. 优雅降级

由于兼容性问题，需要降级对接口进行封装，优先使用高级特性，再根据浏览器不同情况进行回退，直到只能使用settimeout。参考：https://github.com/darius/requestAnimationFrame

## 5. 分帧初始化

都知道，requestAnimationFrame 的执行时间约为16.7ms，即为一帧。那么可以使用它将页面初始化的函数进行打散到每一帧里，这样**可以在初始化时降低CPU及内存开销**。

很多页面，初始化加载时，CPU都会有很明显的波动，就是因为大量的操作都集中到了一点上。

举个例子：

页面中有4个模块，A、B、C、D，在页面加载时进行实例化，一般的写法类似于：

```javascript
$(function(){
    new A();
    new B();
    new C();
    new D();
})
```

而使用raf可将每个模块分别初始化，即 **每个模块都有16ms的初始化时间**

```javascript
var lazyLoadList = [A, B, C, D];
lazyLoadList.forEach((module) => {
  window.requestAnimationFrame(() => {
    new module();
  });
});
```

## 6. 异步化

requestAnimationFrame实际是一种异步化的操作，曾经 `setTimeout(function(){},0)` 一度成为解决了很多前端疑难杂症的法宝。而现在，可以用它来代替。

# 五、setInverval & requestAnimationFrame

这里主要是比较二者在动画上的区别 /

**① setInverval**

setInverval 是通过设置一个间隔时间来不断的改变图像的位置，从而达到动画效果的。但利用 setInverval 实现的动画在某些低端机上会出现卡顿、抖动的现象。 这种现象的产生有两个原因：

- setInverval 的执行时间并不是确定的。在 Javascript 中， setInverval 任务（宏任务）被放进了异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列里的任务是否需要开始执行，因此 **setInverval 的实际执行时间一般要比其设定的时间晚一些。**
- 刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的屏幕刷新频率可能会不同，而 setInterval 只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同。

以上两种情况都会导致 setInterval 的执行步调和屏幕的刷新步调不一致，从而引起 **丢帧** 现象。 那为什么步调不一致就会引起丢帧呢？

首先要明白，setInterval 的执行只是在内存中对图像属性进行改变，这个变化必须要等到屏幕下次刷新时才会被更新到屏幕上。如果两者的步调不一致，就可能会导致中间某一帧的操作被跨越过去，而直接更新下一帧的图像。

假设屏幕每隔16.7ms刷新一次，而 setInterval 每隔10ms设置图像向左移动1px， 就会出现如下绘制过程：

- 第0ms :  屏幕未刷新，等待中，setInterval 也未执行，等待中；
- 第10ms:  屏幕未刷新，等待中，setInterval 开始执行并设置图像属性left=1px；
- 第16.7ms:  屏幕开始刷新，屏幕上的图像向左移动了1px， setInterval 未执行，继续等待中；
- 第20ms:  屏幕未刷新，等待中，setInterval 开始执行并设置left=2px;
- 第30ms:  屏幕未刷新，等待中，setInterval 开始执行并设置left=3px;
- 第33.4ms：屏幕开始刷新，屏幕上的图像向左移动了3px，setInterval 未执行，继续等待中；
- …

从上面的绘制过程中可以看出，屏幕没有更新left=2px的那一帧画面，图像直接从1px的位置跳到了3px的的位置，这就是丢帧现象，这种现象就会引起动画卡顿。

**② requestAnimationFrame**

与 setInterval 相比，requestAnimationFrame 最大的优势是由系统来决定回调函数的执行时机。具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame 的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

这个API的调用很简单，如下所示：

```js
var progress = 0;
// 回调函数
function render() {  
  // 修改图像的位置  
  progress += 1; 
  if (progress < 100) {  
    // 在动画没有结束前，递归渲染    
    window.requestAnimationFrame(render); 
  }
}
// 第一帧渲染
window.requestAnimationFrame(render);
```

除此之外，`requestAnimationFrame` 还有以下两个优势：

- **CPU节能**：使用 setInterval 实现的动画，当页面被隐藏或最小化时，setInterval 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而 requestAnimationFrame 则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的 requestAnimationFrame 也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。

- **函数节流**：在高频率事件（ resize / scroll等 ）中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。







