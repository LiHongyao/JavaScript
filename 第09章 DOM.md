# 一、概述

DOM是JavaScript操作网页的接口，全称为 “**文档对象模型** ”（Document Object Model）。它的作用是将网页转为一个JavaScript对象，从而可以用脚本进行各种操作（比如增删内容）。

浏览器会根据DOM模型，将结构化文档（比如HTML和XML）解析成一系列的节点，再由这些节点组成一个树状结构。所有的节点和最终的树状结构，都有规范的对外接口。所以，DOM可以理解成网页的编程接口。

严格地说，DOM不属于JavaScript，但是操作DOM是JavaScript最常见的任务，而JavaScript也是最常用于DOM操作的语言。本章介绍的就是JavaScript对DOM标准的实现和用法。

# 二、节点

## 1、概念

DOM的最小组成单位叫做节点（Node）。文档的树形结构（DOM树），就是由各种不同类型的节点组成。

节点的类型有七种：

- **Document**：文档节点 -> 整个文档树的顶层节点 
- **DocumentType**：*doctype* 标签（比如 `<!DOCTYPE html>` ）
- **Element**：元素节点 -> 网页的各种HTML标签（比如 `<body>`、`<a>`等）*
- **Attribute**：属性节点 -> 网页元素的属性（比如 `class="right"` ）*
- **Text**：文本节点 -> 标签之间或标签包含的文本*
- **Comment**：注释节点 -> 网页中的注释
- **DocumentFragment**：文档的片段

> 提示：这七种节点都属于浏览器原生提供的节点对象的派生对象，具有一些共同的属性和方法。

我们可通过 nodeName 和 nodeType 属性判断对应节点的名称和类型。

| 类型                   | 描述     | nodeName                  | nodeType |
| ---------------------- | -------- | ------------------------- | -------- |
| ELEMENT_NODE *         | 元素节点 | 大写的HTML标签名          | 1        |
| ATTRIBUTE_NODE *       | 属性节点 | 等同于Attr.name（属性名） | 2        |
| TEXT_NODE *            | 文本节点 | #text                     | 3        |
| COMMENT_NODE           | 注释节点 | #comment                  | 8        |
| DOCUMENT_NODE          | 文档节点 | #document                 | 9        |
| DOCUMENT_FRAGMENT_NODE |          | #document-fragment        | 11       |
| DOCUMENT_TYPE_NODE     |          | 等同于DocumentType.name   | 10       |

> 提示：本节知识点作为了解即可。

##  2、节点树

一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是DOM树。

最顶层的节点就是 document 节点，它代表了整个文档。文档里面最高一层的HTML标签，一般是 `<html>`，它构成树结构的根节点（root node），其他HTML标签节点都是它的下级。

除了根节点以外，其他节点对于周围的节点都存在两种关系。

- 父子关系
- 兄弟关系

示例：

```html
<!DOCTYPE html>
<html>  
	<head>  
	    <title>DOM Tutorial</title>   
	</head>   
	<body>   
	    <h1>DOM Lesson one</h1>    
	    <a href="javascript:;">主页</a>   
	</body>   
</html> 
```

上述代码的节点树模型：

![](IMGS/nodeTree.png)

## 3、节点集合

节点都是单个对象，有时会需要一种数据结构，能够容纳多个节点。DOM提供两种集合对象，用于实现这种节点的集合：

- NodeList
- HTMLCollection

访问集合成员可通过下标或 `.item(index)` 获取。

> 提示：NodeList/HTMLCollection 属于类似数组对象，不能直接使用数组方法，如果要通过数组方法来遍历节点集合，你需要将它们转换为真正的数组。

# 三、节点查询

为了便于演示后面的示例，我们现在HTML编辑如下内容：

```html
<p id="name">成都睿峰软件职业技能培训中心</p>
<ul class="departments">
    <li>教学部</li>
    <li>教务部</li>
    <li>市场部</li>
    <li>咨询部</li>
    <li>行政部</li>
  	<li>财务部</li>
</ul>
<p name="address">成都市高新区天府软件园B区5座1层</p>
```

## 1、直接查找 *

```js
// 1. 根据ID查找
document.getElementById("name"); 
// 2. 根据name属性查找
document.getElementsByName("address");
// 3. 根据类名查找
document.getElementsByClassName("departments");
// 4. 根据标签名查找
document.getElementsByTagName("li");
// 5. 根据CSS选择器查找
document.querySelector("#name"); *
document.querySelectorAll(".departments li"); *
```

## 2、间接查找 *

通过已找到的其他标签来查找。

```js
// 获取参照节点
var list = document.querySelector(".departments");
// 1. 获取上一个兄弟节点
list.previousElementSibling;
// 2. 获取下一个兄弟节点
list.nextElementSibling
// 3. 获取父节点
list.parentElement
// 4. 获取所有子节点
list.children
// 5. 获取第一个子节点
list.firstElementChild
// 5. 获取最后一个子节点
list.lastElementChild
```

## 3、其他查询

```js
// 01. 查找文档类型
document.doctype
// 02. 查找根节点
document.documentElement
// 03. 查找Window对象
document.defaultView
// 04. 查找head元素
document.head
// 05. 查找body元素
document.body
// 06. 查询页面中正在获取焦点的元素
document.activeElement
// 07. 获取页面所有的<a>
document.links
// 08. 获取页面所有的<form>
document.forms
// 09. 获取页面所有的<img>
document.images
// 10. 获取页面所有的<script>
document.scripts
// 11. 获取页面所有的<link>
document.styleSheets
// 12. 获取页面所有的<embeds>
document.embeds
// 13. 获取/设置网页标题
document.title
```

# 四、节点操作

## 1、创建节点

```js
// 创建节点
var el = document.createElement("a");
```

## 2、操作属性

```js
// 1. 设置、修改、读取属性 *
el.setAttribute("href", "https://github.com/lihongyao");
el.setAttribute("target", "_blank");
el.getAttribute("href");
// 2. 判断指定属性是否存在 *
el.hasAttribute("href");
// 3. 移除指定属性 *
el.removeAttribute("target");
// 4. 获取所有属性
el.attributes;
// 5. 添加自定义属性“data-*” *
el.dataset.desc = "耀哥博客地址";
```

## 3、操作类名

```js
// 1. 通过classname操作类名 *
// - 设置类名
el.className = "link"; 
el.className = "link blog";
// - 访问类名
el.className;
// - 移除类名
el.className = "";

// 2. 通过classList操作类名
// - 添加类名 *
el.classList.add("link");
el.classList.add("flag");
// - 移除类名 *
el.classList.remove("flag");
// - 查询是否包含某个类名 *
el.classList.contains("link"); // true
// - 查询指定位置的类名
el.classList.item(0); // link
// - 将类名集合转为字符串
el.classList.toString();
```

## 4、操作内容

```js
// 1. textContent
// - 设置
el.textContent = "Henry's github link";
// - 读取
el.textContent 

// 2. innerHTML
// - 设置
el.innerHTML = "<mark>Henry's</mark> github link";
// - 读取
el.innerHTML
```

> 提示：textContent 设置显示文本，不能识别html标签，而innerHTML可以识别html标签。

## 5. 插入节点



# 六、DOM Element

- **Element.attributes**：该属性返回当前元素所有属性节点的一个类似数组对象。*（了解）*

- **Element.id**：该属性返回指定元素的id属性，是一个可读可写的属性。

- **Element.tagName**：该属性返回指定元素的大写标签名，与 nodeName 属性的值相等。但在事件对象（event）上通常使用tagName更加常见。*（了解）*

- **Element.innerHTML**：该属性返回该元素包含的HTML代码。该属性可读写，常用来设置某个Element节点的内容。如果将该属性设为空字符串，等于删除了它包含的所有节点。

- **Element.outerHTML**：该属性返回一个字符串，内容为指定元素节点的所有HTML代码，包括它自身和包含的所有子元素。该属性是同样是可读可写的，对它进行赋值，等于替换掉当前元素。但是如果该Element节点已经被赋值给一个变量了，在使用outerHTML替换原来的标签后，之前的变量值还是能够访问，也就是说被替换掉的内容依然保存于内存。*（了解）*

- **Element.matches()**：该方法用于匹配当前的Element节点是否匹配方法参数内的CSS选择器字符串，CSS选择器必须是完整的选择符（如id前需要加上“#”，class前面要加上“.”，属性选择器要用“[]”括起来等）。它返回的是一个布尔值。*（了解）*

- **Element.scrollIntoView()**

  该方法滚动当前元素，进入浏览器的可见区域。

  该方法可以接受一个布尔值作为参数。如果为true，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为false，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为true。

- **Element.focus()** *（了解）*

  该方法可以让元素获得焦点。用户使用键盘Tab键可以切换获得焦点的元素，都可以使用该方法来获得焦点。

- **Element.hasChildNodes()**

  该方法返回一个布尔值，表示当前节点是否有子节点。

- **Element.cloneNode()**  

  该方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点，默认是 false，即不克隆子节点。克隆一个节点之后，DOM树有可能出现两个有相同ID属性的HTML元素，这时应该修改其中一个HTML元素的ID属性。

- **Element.contains()**

  该方法接受一个节点作为参数，返回一个布尔值，表示参数节点是否为当前节点的后代节点。需要注意的是，如果将当前节点传入contains方法，也会返回true。

- **Element.isEqualNode()** *（了解）*

  该方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。

- **Element.normalize()**   *（了解）*

  该方法用于清理当前节点内部的所有Text节点。它会去除空的文本节点，并且将毗邻的文本节点合并成一个。

## 1、插入节点 *

- **Element.appendChild()**

  该方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。

- **Element.before()**

  该方法用于在当前节点的前面，插入一个同级节点。如果参数是节点对象，插入DOM的就是该节点对象；如果参数是文本，插入DOM的就是参数对应的文本节点。

- **Element.after()**

  该方法用于在当前节点的后面，插入一个同级节点。如果参数是节点对象，插入DOM的就是该节点对象；如果参数是文本，插入DOM的就是参数对应的文本节点。

- **Element.insertBefore()**

  该方法用于将某个节点插入当前节点的指定位置。它接受两个参数，第一个参数是所要插入的节点，第二个参数是当前节点的一个子节点，新的节点将插在这个节点的前面。该方法返回被插入的新节点。

  如果*insertBefore()*方法的第二个参数为 `null`，则新节点将插在当前节点的最后位置，即变成最后一个子节点。如果所要插入的节点是当前DOM现有的节点，则该节点将从原有的位置移除，插入新的位置。

  由于不存在insertAfter()方法，如果要插在当前节点的某个子节点后面，可以用insertBefore方法结合nextSibling属性模拟。

- **Element.insertAdjacentHTML()**

  该方法解析HTML字符串，然后将生成的节点插入DOM树的指定位置。该方法带有两个参数，第一个参数表示插入位置，第二个参数表示插入的字符串（可以是HTML标签）。

  第一个插入参数允许的值如下：

  - beforebegin：在当前元素节点的前面。
  - afterend：在当前元素节点的后面。
  - afterbegin：在当前元素节点的里面，插在它的第一个子元素之前。
  - beforeend：在当前元素节点的里面，插在它的最后一个子元素之后。

## 3、替换节点 *

- **Element.replaceWith()**

  该方法使用参数指定的节点，替换当前节点。如果参数是节点对象，替换当前节点的就是该节点对象；如果参数是文本，替换当前节点的就是参数对应的文本节点。

- **Element.replaceChild()**

  该方法用于将一个新的节点，替换当前节点的某一个子节点。它接受两个参数，第一个参数是用来替换的新节点，第二个参数将要被替换走的子节点。它返回被替换走的那个节点。

## 4、移除节点 *

- **Element.remove()**

  调用这个方法的节点，移除的是节点本身，而不是它的父节点。

- **Element.removeChild()**

  该方法接受一个子节点作为参数，用于从当前节点移除该子节点。它返回被移除的子节点。

# 八、DOM Style *

每一个网页元素对应一个DOM节点对象。这个对象的 **style** 属性可以直接操作，用来读写行内CSS样式。style对象的属性值都是字符串，设置时必须包括单位，但是不含规则结尾的分号。比如，`divStyle.width`不能写为`100`，而要写为`100px`。

```javascript
var el = document.getElementById('div');
el.style.width  = '100px';
el.style.height = '100px';
el.style.backgroundColor = 'red';
```

style对象的 **cssText** 属性允许直接以字符串的形式来设置一个元素的样式，可以设置一个样式，也可以是多个，其语法与CSS文件选择器内部的语法完全一致。

```javascript
var el = document.getElementById('div');
el.style.cssText = 'width:100px; height:100px; background-color:red;'
```

> 提示：我们可以使用 `document.body.style.CSS样式属性名` 或 `document.body.style["CSS样式属性名"]` 的方式来检测当前的浏览器是否支持某一CSS样式，只要返回的值是一个非undefined的值，就说明当前浏览器是支持该CSS样式的。

# 九、DOM Class *

每个Element节点对象都具有两个关于Class的属性：className 和 classList。

## 1、className

该属性用来读写当前元素节点的 `class` 属性。它的值是一个字符串，每个 class 之间用空格分割。

## 2、classList

该属性返回一个类似数组的对象，当前元素节点的每个 class 就是这个对象的一个成员。

classList  对象有下列方法：

- **add()**：增加一个class。 *
- **remove()**：移除一个class。 *
- **contains()**：检查当前元素是否包含某个class。 *
- **toggle()**：将某个class移入或移出当前元素。
- **item()**：返回指定索引位置的class。
- **toString()**：将class的列表转为字符串。


# 十、拓展

## 1、获取非行间样式

```javascript
function getStyle(obj, attr) {
	// 兼容IE
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else {
		return getComputedStyle(obj, null)[attr];
	}
}
```

## 2、DOM 性能优化

- [高频dom操作和页面性能优化探索](https://feclub.cn/post/content/dom)
- 通过修改 class 更新样式
- 使用 innerHTML 批量生产 DOM
- 使用 DocumentFragment  批量生产 DOM
- 避免使用 +=，将拼接元素放入数组通过 join() 方法效率更高
- 创建节点之后应立即append
- 通过 absolute 或 显示/隐藏元素 后再操作DOM可以减少重排/重绘
- 进来使用 id 来遍历 DOM 元素


















