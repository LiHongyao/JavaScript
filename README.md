

# 一、 概要

> 本仓库主要是JS基础知识的讲解，md文件格式，建议下载一个markdown编辑器用于演示内容。

# 二、js文件引入方式

  js文件的引入方式主要分为两种

## 1、内嵌方式

直接在html文档的`head`或`body`标签中嵌入js，如下所示：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
    <script>
        // insert javascript codes in here....
    </script>
</head>
<body>
    <script>
        // insert javascript codes in here....
    </script>
</body>
</html>
```

> tips：`script`标签可以放在网页任意位置，不过不建议这样使用，一般放置在`heade`标签内，或`body`结束标签之前。

## 2、外链方式



创建js文件，在html的`head`标签中引入js文件，代码如下：

```javascript
// my.js
window.onload = function() {
  // insert javascript codes in here...
}
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
    <script type="text/javascript" src="my.js"></script>
</head>
<body>
	
</body>
</html>
```

> tips：这里建议大家使用外链方式，将js代码独立放置到一个文件中，便于我们后期维护整合优化。

# 三、知识点概要

> 第01章 [基础语法](https://github.com/LiHongyao/Basic-knowledge-of-js/blob/master/%E7%AC%AC01%E7%AB%A0%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.md)

> 第02章 [程序结构]()

> 第03章 [数据类型]()

