

> 本仓库主要是涉及JavaScript基础知识的讲解，md文件格式，建议下载一个markdown编辑器用于演示内容，推荐使用：Typora。

前端三大基础：

- HTML：结构层(标签)
- CSS：渲染层(样式)
- JavaScript：行为层(交互)

# # JavaScript 

## 1. 概述

JavaScript是世界上最流行的**脚本语言**，因为你在电脑、手机、平板上浏览的所有的网页，以及无数基于HTML5的手机App，交互逻辑都是由JavaScript驱动的。

JavaScript是一种轻量级的 **脚本语言**。所谓“脚本语言”，指的是它不具备开发操作系统的能力，而是只用来编写控制其他大型应用程序的“脚本”。

JavaScript是一种 **嵌入式语言**。它本身提供的核心语法，规模相当小，只能用来做一些数学和逻辑运算。JavaScript本身不提供任何与I/O（输入/输出）相关的API，都要靠宿主环境（host）提供，所以JavaScript只合适嵌入更大型的应用程序环境，去调用宿主环境提供的底层API。

目前，已经嵌入JavaScript的宿主环境有多种，最常见的环境就是浏览器，另外还有服务器环境，也就是Node项目。

从语法角度看，JavaScript语言是一种 **面向对象语言**。各种宿主环境通过这个模型，描述自己的功能和操作接口，从而通过JavaScript控制这些功能。但是，JavaScript并不是纯粹的“面向对象语言”，还支持函数式编程。这导致几乎任何一个问题，JavaScript都有多种解决方法。

JavaScript的核心语法部分相当精简，只包括两个部分：基本的语法构造（比如操作符、控制结构、语句）和标准库（就是一系列具有各种功能的对象比如 *Array*、*Date*、*Math* 等）。除此之外，各种宿主环境提供额外的API（即只能在该环境使用的接口），以便JavaScript调用。以浏览器为例，它提供的额外API可以分成三大类。

- **浏览器控制类**：操作浏览器
- **DOM类**：操作网页的各种元素
- **Web类**：实现互联网的各种功能

如果宿主环境是服务器，则会提供各种操作系统的API，比如文件操作API、网络通信API等等。这些你都可以在Node环境中找到。

## 2. 为什么学习 JavaScript

JavaScript语言有一些显著特点，使得它非常值得学习。它既适合当作学习编程的入门语言，也适合当作日常开发的工作语言。它是目前发展最好、最热门的计算机语言之一。无论是从事Web前端开发还是从事后台数据操作的开发人员都可以去使用它。

JavaScript的发明目的，就是作为浏览器的内置脚本语言，为网页开发者提供操控浏览器的能力。它是目前唯一一种通用的浏览器脚本语言，所有浏览器都支持。它可以让网页呈现更多特殊效果，扩展Web页面或者应用的功能，为用户提供良好的互动体验。

目前，全世界几乎所有网页都使用JavaScript。如果不去使用它，那么网站的易用性和使用效率将大打折扣，而且在功能需求上都会存在诸多的限制，的很难满足现代浏览器或应用挑剔的用户的“味口”的，从而让自己的项目产品失去竞争力、失去用户。

对于一个互联网开发者来说，如果你想提供漂亮的网页、令用户满意的上网体验、各种基于浏览器的便捷功能、前后端之间紧密高效的联系，JavaScript是必不可少的。

> **特点**

- JavaScript主要用来向HTML页面添加交互行为。
- JavaScript是一种脚本语言，语法和Java类似。
- javaScript一般用来编写客户端的脚本。
- JavaScript是一种解释性语言。

> **应用领域**

近年来，正是JavaScript所具有的灵活的语法特性和轻量化以及高运行性能的优势，使得它的使用范围，慢慢超越了浏览器，正在向通用的系统语言发展，正是“遍地开花”之时。

- **浏览器的平台化**：

  随着HTML5的出现，浏览器本身的功能越来越强，不再仅仅能浏览网页，而是越来越像一个平台，JavaScript因此得以调用许多系统功能，比如操作本地文件、操作图片、调用摄像头和麦克风等等。这使得JavaScript可以完成许多以前无法想象的事情。

  

- **Node**

  Node项目使得JavaScript可以用于开发服务器端的大型项目，网站的前后端都用JavaScript开发已经成为了现实。目前，有越来越多的嵌入式平台能够安装Node.js，于是JavaScript就能为这些平台开发应用程序。

  

- **数据库操作**

  JavaScript甚至也可以用来操作数据库。NoSQL数据库这个概念，本身就是在JSON（JavaScript Object Notation，JavaScript对象表示法）格式的基础上诞生的，大部分NoSQL数据库允许JavaScript直接操作。基于SQL语言的开源数据库PostgreSQL支持JavaScript作为操作语言，可以部分取代SQL查询语言。

  

- **跨移动平台**

  JavaScript也正在成为手机应用的开发语言。一般来说，Android平台使用Java语言开发，iOS平台使用Objective-C或Swift语言开发。许多人正在努力，让JavaScript成为各个平台的通用开发语言。PhoneGap项目就是将JavaScript和HTML5打包在一个容器之中，使得它能同时在iOS和Android上运行。Facebook的React Native项目则是将JavaScript写的组件，编译成原生组件，从而使它们具备优秀的性能。Mozilla基金会的手机操作系统Firefox OS，更是直接将JavaScript作为操作系统的平台语言。

  

- **内嵌脚本语言**

  越来越多的应用程序，将JavaScript作为内嵌的脚本语言，比如Adobe公司的著名PDF阅读器Acrobat、Linux桌面环境GNOME 3。

  

- **跨平台的桌面应用程序**

  Chromium OS、Windows 8等操作系统直接支持JavaScript编写应用程序。Mozilla的Open Web Apps项目、Google的Chrome App项目、Github的Electron项目、以及TideSDK项目，都可以用来编写运行于Windows、Mac OS和Android等多个桌面平台的程序，不依赖浏览器。

> **易学性**

相比学习其他语言，学习JavaScript有一些有利条件：

- **学习环境无处不在**

  只要有浏览器，就能运行JavaScript程序；只要有文本编辑器，就能编写JavaScript程序。这意味着，几乎所有电脑都原生提供JavaScript学习环境，不用另行安装复杂的IDE（集成开发环境）和编译器。

- **简单性**

  相比其他脚本语言（比如Python或Ruby），JavaScript的语法相对简单一些，本身的语法特性并不是特别多。而且，那些语法中的复杂部分，也不是必需要学会。你完全可以只用简单命令，完成大部分的操作。

- **与主流语言的相似性**

  JavaScript的语法很类似C/C++和Java，如果学过这些语言，JavaScript的入门会非常容易。

  必须说明的是，虽然核心语法不难，但是JavaScript的复杂性体现在另外两个方面。

  首先，它涉及大量的外部API。JavaScript要发挥作用，必须与其他组件配合，这些外部组件五花八门，数量极其庞大，几乎涉及网络应用的各个方面，要掌握它们绝非朝夕之事。

  其次，JavaScript语言有一些设计缺陷。某些地方相当不合理，另一些地方则会出现怪异的运行结果。学习JavaScript，很大一部分时间是用来搞清楚哪些地方有陷阱，如浏览器的兼容性。

  尽管如此，目前看来，JavaScript的地位还是无法动摇。加之，语言标准的快速进化，使得JavaScript功能日益增强，而语法缺陷和怪异之处得到了弥补。所以，JavaScript还是值得学习，而作为一个Web前端开发工程师，基本上是必学的，况且它的入门相对于其它编程语言的确是非常简单的。

> **JavaScript 性能**

  JavaScript的性能优势体现在以下方面:

-  **语法灵活，表达力强**

   JavaScript既支持类似C语言清晰的过程式编程，也支持灵活的函数式编程。可以用来写并发处理。这些语法特性已经被证明非常强大，可以用于许多场合，尤其适用非同步编程。

   JavaScript的所有值都是对象，这为程序员提供了灵活性和便利性。因为你可以很方便地、按照需要随时创造数据结构，不用进行麻烦的预定义。

   JavaScript的标准还在快速进化中，并不断合理化，并添加更适用的语法特性

   

- **支持编译运行**

    JavaScript语言本身，虽然是一种解释型语言，但是在现代浏览器中，JavaScript都是编译后运行。程序会被高度优化，运行效率接近二进制程序。而且，JavaScript引擎正在快速发展，性能将越来越好。

    

- **事件驱动和非阻塞式设计**

    JavaScript程序可以采用事件驱动和非阻塞式设计，在服务器端适合高并发环境，普通的硬件就可以承受很大的访问量。

## 3. JavaScript 历史

1990年底，欧洲核能研究组织（CERN）科学家Tim Berners-Lee，在全世界最大的电脑网络——互联网的基础上，发明了万维网（World Wide Web），从此可以在网上浏览网页文件。最早的网页只能在操作系统的终端里浏览，也就是说只能使用命令行操作，网页都是在字符窗口中显示，这当然非常不方便。

1992年底，美国国家超级电脑应用中心（NCSA）开始开发一个独立的浏览器，叫做Mosaic。这是人类历史上第一个浏览器，从此网页可以在图形界面的窗口浏览。

1994年10月，NCSA的一个主要程序员Marc Andreessen联合风险投资家Jim Clark，成立了Mosaic通信公司（Mosaic Communications），不久后改名为Netscape。这家公司的方向，就是在Mosaic的基础上，开发面向普通用户的新一代的浏览器Netscape Navigator。

Netscape公司很快发现，Navigator浏览器需要一种可以嵌入网页的脚本语言，用来控制浏览器行为。当时，网速很慢而且上网费很贵，有些操作不宜在服务器端完成。比如，如果用户忘记填写“用户名”，就点了“发送”按钮，到服务器再发现这一点就有点太晚了，最好能在用户发出数据之前，就告诉用户“请填写用户名”。这就需要在网页中嵌入小程序，让浏览器检查每一栏是否都填写了。

管理层对这种浏览器脚本语言的设想是：功能不需要太强，语法较为简单，容易学习和部署。那一年，正逢Sun公司的Java语言问世，市场推广活动非常成功。Netscape公司决定与Sun公司合作，浏览器支持嵌入Java小程序（后来称为Java applet）。但是，浏览器脚本语言是否就选用Java，则存在争论。后来，还是决定不使用Java，因为网页小程序不需要Java这么“重”的语法。但是，同时也决定脚本语言的语法要接近Java，并且可以支持Java程序。这些设想直接排除了使用现存语言，比如Perl、Python和TCL。

1995年，Netscape公司雇佣了程序员Brendan Eich开发这种网页脚本语言。Brendan Eich有很强的函数式编程背景，希望以Scheme语言（函数式语言鼻祖LISP语言的一种方言）为蓝本，实现这种新语言。

1995年5月，Brendan Eich只用了10天，就设计完成了这种语言的第一版。它是一个大杂烩，语法有多个来源：

- 基本语法：借鉴C语言和Java语言
- 数据结构：借鉴Java语言，包括将值分成原始值和对象两大类
- 函数用法：借鉴Scheme语言和Awk语言，将函数当作第一等公民，并引入闭包
- 原型继承模型：借鉴Self语言
- 正则表达式：借鉴Perl语言
- 字符串和数组处理：借鉴Python语言

为了保持简单，这种脚本语言缺少一些关键的功能，比如块级作用域、模块、子类型（subtyping）等等，但是可以利用现有功能找出解决办法。这种功能的不足，直接导致了后来JavaScript的一个显著特点：对于其他语言，你需要学习语言的各种功能，而对于JavaScript，你常常需要学习各种解决问题的模式。而且由于来源多样，从一开始就注定，JavaScript的编程风格是函数式编程和面向对象编程的一种混合体。

Netscape公司的这种浏览器脚本语言，最初名字叫做Mocha，1995年9月改为LiveScript。12月，Netscape公司与Sun公司（Java语言的发明者和所有者）达成协议，后者允许将这种语言叫做JavaScript。这样一来，Netscape公司可以借助Java语言的声势，而Sun公司则将自己的影响力扩展到了浏览器。

之所以起这个名字，并不是因为JavaScript本身与Java语言有多么深的关系（事实上，两者关系并不深），而是因为Netscape公司已经决定，使用Java语言开发网络应用程序，JavaScript可以像胶水一样，将各个部分连接起来。当然，后来的历史是Java语言的浏览器插件失败了，JavaScript反而发扬光大。

1995年12月4日，Netscape公司与Sun公司联合发布了JavaScript语言。

1996年3月，Navigator 2.0浏览器正式内置了JavaScript脚本语言。

## 4. JavaScript 与 ECMAScript 

1996年8月，微软模仿JavaScript开发了一种相近的语言，取名为JScript（JavaScript是Netscape的注册商标，微软不能用），首先内置于IE 3.0。Netscape公司面临丧失浏览器脚本语言的主导权的局面。

1996年11月，Netscape公司决定将JavaScript提交给国际标准化组织ECMA（European Computer Manufacturers Association），希望JavaScript能够成为国际标准，以此抵抗微软。ECMA的39号技术委员会（Technical Committee 39）负责制定和审核这个标准，成员由业内的大公司派出的工程师组成，目前共25个人。该委员会定期开会，所有的邮件讨论和会议记录，都是公开的。

1997年7月，ECMA组织发布262号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为ECMAScript。这个版本就是ECMAScript 1.0版。之所以不叫JavaScript，一方面是由于商标的关系，Java是Sun公司的商标，根据一份授权协议，只有Netscape公司可以合法地使用JavaScript这个名字，且JavaScript已经被Netscape公司注册为商标，另一方面也是想体现这门语言的制定者是ECMA，不是Netscape，这样有利于保证这门语言的开放性和中立性。因此，ECMAScript和JavaScript的关系是，前者是后者的规格，后者是前者的一种实现。在日常场合，这两个词是可以互换的。

ECMAScript只用来标准化JavaScript这种语言的基本语法结构，与部署环境相关的标准都由其他标准规定，比如DOM的标准就是由W3C组织（World Wide Web Consortium）制定的。

ECMA-262标准后来也被另一个国际标准化组织ISO（International Organization for Standardization）批准，标准号是ISO-16262。

## 5. ECMAScript 的历史

ES6 从开始制定到最后发布，整整用了15年。

前面提到，ECMAScript 1.0是1997年发布的，接下来的两年，连续发布了 ECMAScript 2.0（1998年6月）和 ECMAScript 3.0（1999年12月）。3.0版是一个巨大的成功，在业界得到广泛支持，成为通行标准，奠定了 JavaScript 语言的基本语法，以后的版本完全继承。直到今天，初学者一开始学习 JavaScript，其实就是在学3.0版的语法。

2000年，ECMAScript 4.0开始酝酿。这个版本最后没有通过，但是它的大部分内容被ES6继承了。因此，ES6制定的起点其实是2000年。

为什么ES4没有通过呢？因为这个版本太激进了，对ES3做了彻底升级，导致标准委员会的一些成员不愿意接受。ECMA的第39号技术专家委员会（Technical Committee 39，简称TC39）负责制订ECMAScript标准，成员包括Microsoft、Mozilla、Google等大公司。

2007年10月，ECMAScript 4.0版草案发布，本来预计次年8月发布正式版本。但是，各方对于是否通过这个标准，发生了严重分歧。以Yahoo、Microsoft、Google为首的大公司，反对JavaScript的大幅升级，主张小幅改动；以JavaScript创造者Brendan Eich为首的Mozilla公司，则坚持当前的草案。

2008年7月，由于对于下一个版本应该包括哪些功能，各方分歧太大，争论过于激烈，ECMA开会决定，中止ECMAScript 4.0的开发，将其中涉及现有功能改善的一小部分，发布为ECMAScript 3.1，而将其他激进的设想扩大范围，放入以后的版本，由于会议的气氛，该版本的项目代号起名为Harmony（和谐）。会后不久，ECMAScript 3.1就改名为ECMAScript 5。

2009年12月，ECMAScript 5.0版正式发布。Harmony项目则一分为二，一些较为可行的设想定名为JavaScript.next继续开发，后来演变成ECMAScript 6；一些不是很成熟的设想，则被视为JavaScript.next.next，在更远的将来再考虑推出。TC39委员会的总体考虑是，ES5与ES3基本保持兼容，较大的语法修正和新功能加入，将由JavaScript.next完成。当时，JavaScript.next指的是ES6，第六版发布以后，就指ES7。TC39的判断是，ES5会在2013年的年中成为JavaScript开发的主流标准，并在此后五年中一直保持这个位置。

2011年6月，ECMAscript 5.1版发布，并且成为ISO国际标准（ISO/IEC 16262:2011）。

2013年3月，ECMAScript 6草案冻结，不再添加新功能。新的功能设想将被放到ECMAScript 7。

2013年12月，ECMAScript 6草案发布。然后是12个月的讨论期，听取各方反馈。

2015年6月，ECMAScript 6正式通过，成为国际标准。从2000年算起，这时已经过去了15年。

## 6. JavaScript 与 Java 的关系

JavaScript和Java是两种不一样的语言，但是它们之间存在联系。

JavaScript的基本语法和对象体系，是模仿Java而设计的。但是，JavaScript没有采用Java的静态类型。正是因为JavaScript与Java有很大的相似性，所以这门语言才从一开始的LiveScript改名为JavaScript。基本上，JavaScript这个名字的原意是“很像Java的脚本语言”。

在JavaScript语言中，函数是一种独立的数据类型，以及采用基于原型对象（prototype）的继承链。这是它与Java语法最大的两点区别。JavaScript语法要比Java自由得多。

另外，Java语言需要编译，而JavaScript语言则是运行时由解释器直接执行。

总之，JavaScript的原始设计目标是一种小型的、简单的动态语言，与Java有足够的相似性，使得使用者（尤其是Java程序员）可以快速上手。

# # JavaScript 引入方式

## 1、内嵌方式

直接在 html 文档的 **head** 或 **body** 标签中嵌入 js，如下所示：

```html
<!DOCTYPE html>
<html lang="zh-CN">
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

> tips：**script** 标签可以放在网页任意位置，通常不建议这样使用，而是将 *JavaScript* 代码独立放到一个文件中再引入使用，即后面要讲到的外链引入方式。

## 2、外链方式

创建 `.js`  文件，在 `head` 标签内或在 `body` 结束标签前引入。引入 `.js` 文件使用 `script` 标签，并通过 `src` 属性指定文件路径，代码如下：

```javascript
// my.js

// insert javascript codes in here...

```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
    <!-- 引入方式1 -->
    <script type="text/javascript" src="my.js"></script>
</head>
<body>
    <!-- 引入方式2 -->
	<script type="text/javascript" src="my.js"></script>
</body>
</html>
```

> tips：
>
> 1. 这里建议大家使用外链方式，将js代码独立放置到一个文件中，便于我们后期维护整合优化。
> 2. 一般建议将引入脚本的位置放在body结束标签之前
