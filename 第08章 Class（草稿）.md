## 一、Class 基本语法

## 1、概述

  JavaScript 生成对象传统方法是通过构造函数实现，如下所示：

```javascript
function Person(name, age) {
	this.name = name;
	this.age  = age;
}
Person.prototype.description = function() {
	return `name: ${this.name} age: ${this.age}`
}
let per = new Person(`Henrry Lee`, 25);
```

  上面这种写法跟传统的面向对象语言差异很大，很容易让新学习这门语言的程序员感到困惑。ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过 `class` 关键字，可以定义类。基本上，ES6  `class` 的绝大部分功能，ES5都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用ES6的 “类” 改写如下所示：

```javascript
class Person {
    // 构造方法
	constructor(name, age) {
		this.name = name;
		this.age  = age;
	}

	description() {
		return `name: ${this.name} age: ${this.age}`
	}
}
let per = new Person(`Henrry Lee`, 25);
```

  上面代码定义了一个“类”，可以看到里面有一个`constructor` 方法，这就是构造方法，而`this`关键字则代表实例对象。也就是说，ES5的构造函数 `Person`，对应ES6的 `Person`类的构造方法。

  `Person` 类除了构造方法，还定义了一个`description`方法。注意，定义“类”的方法的时候，前面不需要加上`function`这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

  ES6的类，完全可以看作构造函数的另一种写法。

```javascript
class Person {
  // ...
}

console.log(typeof Person) // "function"
console.log(Person === Person.prototype.constructor) // true
```

  上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

  使用的时候，也是直接对类使用`new`命令，跟构造函数的用法完全一致。



