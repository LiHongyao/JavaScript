# 一、概述

数据存储，可以是临时存储，也可以是永久存储，接下来我们一起看看在Web中，有哪些方式可以存储数据。

# 二、Cookie

<https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie>

# 三、Web Storage

## 1、概述

Web Storage 是HTML5新增的一种数据存储机制，随着浏览器对HTML5的支持度不断增加，在新建的项目中基本已经取代了cookie（它是服务器保存在浏览器的一小段文本信息，每个Cookie的大小一般不能超过4KB，超过这个长度的Cookie，将被忽略，不会被设置）。Web Storage更像是cookie的强化版，能够动用大得多的存储空间。某个网页存入的数据，只有同域下的网页才能读取。Web Storage存储机制包含 会话存储 和 本地存储 这两个对象。它们存储值的方式和JavaScript中对象属性储存值的方式一样，都是以“键值对”存在的。

## 2、本地存储 & 会话存储

- `sessionStorage`：会话存储（临时存储），数据在浏览器关闭后会被清除
- `localStorage`：本地存储，数据一直存在于浏览器中，除非调用 `clear` 清除，一般用于数据持久化存储

会话存储和本地存储常用的方法：

- `setItem(key, val)`：存储数据 & 修改数据
- `getItem(key)`：获取数据
- `removeItem(key)`：移除数据
- `clear()`：清空数据

> 提示：
>
> \- 不管是sessionStorage还是localStorage，他们的本质都是对象，所以我们可以通过点语法的形式对它们进行增删改查。
>
> \- 在浏览器调试工具的 Application 选项中可查看存储数据的可视化形式。

## 3、对象存储

Webstorage 不能直接存储对象类型的数据，需将对象类型的数据转换成JSON数据之后进行存储，读取的时候需进行解析。

```js
// 1. 存
sessionStorage.usr = JSON.stringify({
	name: "木子李",
	age: 31,
	major: "软件技术"
});

// 2. 取
JSON.parse(sessionStorage.usr);
```



