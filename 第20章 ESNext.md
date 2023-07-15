https://developer.aliyun.com/article/700302

# ES6（2015）

## 1. 声明与表达式

### 1.1. let & const

默认使用 const，只有当确实需要改变变量的值的时候才使用 `let`，这是因为大部分的变量的值在初始化后不应再改变，而预料之外的变量的修改是很多 bug 的源头。

let & const 引起 **块级作用域**，在ES6之前，只存在两种作用域，即：**全局作用域** 和 **函数作用域** *（Eval作用域不算）*。

let & const 不会引起变量提升，会有 **暂时性死区**（TDZ，**T**emporal **D**ead **Z**one，指在使用 let 或 const 声明变量时，在变量声明之前访问该变量会引发错误的行为 ），暂时性死区的存在是为了避免在变量未初始化之前意外地使用它们，这有助于减少由于变量提升和作用域问题而导致的错误。

说到暂时性死区就要说到代码执行过程，分两个阶段：

1. 编译阶段：编译器将js代码编译成可执行代码；
2. 执行阶段：执行代码，执行上下文在这个阶段全部创建完成。

在通过语法分析，确认语法无误之后，编译阶段会对变量的内存空间进行分配，**变量提升** 就是在此阶段完成的。那我们刚刚提到的 **暂时性死区** 其实就与 **变量提升** 有关，看如下代码：

```js
function foo() {
  console.log(bar);
  var bar = 3;
}
foo();
```

会输出：`undefined` ，原因是变量 bar 在函数内进行了提升，相当于：

```js
function foo() {
  var bar;
  console.log(bar);
  bar = 3;
}
foo();
```

> **提示：**这是在编译阶段执行的 “伪代码”，当 `foo()` 执行时，就是第二阶段，执行代码。

现在我们使用 `let` 关键字声明：

```js
function foo() {
  console.log(bar);
  let bar = 3;
}
foo();
```

会报错：ReferenceError: Cannot access 'bar' before initialization

我们知道使用 let & const 声明变量，会针对这个变量形成一个封闭的 **块级作用域**，在这个块级作用域当中，如果在声明变量前访问该变量，就会报 `referenceError` 错误；如果在声明变量后访问，则可以正常获取变量值：

```js
function foo() {
  let bar = 3;
  console.log(bar);
}
foo();
```

正常输出 3。因此在相应花括号形成的作用域中，存在一个“**死区**”，起始于函数开头，终止与相关变量声明的一行。在这个范围内无法访问 let & const 声明的变量。这个“死区” 就是我们刚刚提到的 **暂时性死区**（TDZ，**T**emporal **D**ead **Z**one. ）

结论：

1. var 存在变量变量提升，let & const 不会（暂时性死区的原因）
2. let & const 不能重复定义
3. let & const 引起块级作用域

### 1.2. 变量解构

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。

#### 1.2.1 解构示例

> a）解构数组

```js
const [id, name, skill] = [1, "李白", "青莲剑客"];
console.log(id, name, skill); 
```

> b）解构对象

```js
const { name, address, job } = {
  name: '张三',
  job: '前端工程师',
  address: '成都市高新区雅和南四路216号',
};
console.log(name, address, job);
```

> c）设置默认值

```js
const {
  name = '张三',
  address,
  job,
} = {
  job: '前端工程师',
  address: '成都市高新区雅和南四路216号',
};
console.log(name, address, job);
```

> d）解构字符串

```javascript
const [a, b, c, d, e] = 'CHINA';
console.log(a, b, c, d, e);
// C H I N A
```

#### 1.2.2. 用途

> a）交换值

```javascript
const x = 10, y = 20;
[x, y] = [y, x];
```

> b）函数返回值

```js
function conditions() {
  const min = 18, max = 50;
  return { min, max };
}
```

> c）函数参数

```javascript
function sum([a, b]) {
  return a + b;
}
```

> d）提取JSON数据

解构赋值对提取 `JSON` 对象中的数据，尤其有用。

```javascript
const json = {
  code: '0',
  data: {
    name: '张三',
    job: '前端工程师',
  },
};
const { code, data } = json;
```

### 1.3. Symbol

Symbol 是一种原始数据类型，它的主要作用是创建具有唯一性的标识符。

Symbol 的使用场景包括但不限于以下几个方面：

1. **创建对象的唯一属性名**：Symbol 可以用作对象属性的唯一标识符，避免属性名冲突的问题。通过使用 Symbol 作为属性名，可以确保属性的唯一性，不会被意外覆盖或冲突。

   ```js
   const id = Symbol('id');
   const obj = {
     [id]: '12345'
   };
   ```

2. **防止属性被意外访问**：通过使用 Symbol 创建对象的私有属性或方法，可以避免其他代码意外地访问或修改它们。因为 Symbol 创建的属性在常规的对象迭代中是不可枚举的。

   ```js
   const _privateMethod = Symbol('privateMethod');
   class MyClass {
     [_privateMethod]() {
       // 私有方法的实现
     }
   }
   ```

3. **定义常量**：由于每个 Symbol 都是唯一的，可以将 Symbol 用作常量值，确保不会与其他值产生冲突。

   ```js
   const LOG_LEVEL = {
     DEBUG: Symbol('debug'),
     INFO: Symbol('info'),
     ERROR: Symbol('error')
   };
   ```

4. **使用 Symbol 内置值**：ES6 还提供了一些内置的 Symbol 值，如 `Symbol.iterator`、`Symbol.toStringTag`、`Symbol.hasInstance` 等，可以用于自定义对象的行为和特性。

   ```js
   const obj = {
     [Symbol.toStringTag]: 'MyObject'
   };
   console.log(obj.toString());  // 输出：[object MyObject]
   ```

需要注意的是，由于 Symbol 创建的属性是不可枚举的，因此无法使用常规的方式遍历对象的 Symbol 属性。可以使用 `Object.getOwnPropertySymbols()` 方法获取对象的 Symbol 属性列表。

Symbol 的使用场景主要涉及 **对象属性的唯一性和私有性**，**以及自定义对象行为的扩展性**。通过合理使用 Symbol，可以更好地组织和保护代码，避免命名冲突和属性暴露的问题。

## 2. 内置对象

###  2.1. Map & WeakMap（*News*）

- Map：[参考这里 >>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
- WeakMap：[参考这里 >>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

Map 是一种用于存储键值对的数据结构，它具有一些特性和使用场景，下面是一些常见的 Map 的使用场景：

1. 对象属性的存储和访问：Map 可以作为一种替代对象（Object）的数据结构，用于存储和访问属性。相比于对象，Map 具有更灵活的键类型和更丰富的方法，可以方便地添加、删除和查找键值对。
2. 数据缓存：Map 可以用于实现简单的数据缓存。通过将数据存储在 Map 中，可以将数据的键作为缓存的标识符，并在需要时快速检索数据。
3. 迭代和顺序：Map 保持插入顺序，这意味着当需要按照键值对的插入顺序进行迭代时，Map 是一个有用的选择。它提供了方法来遍历键值对，或仅遍历键或值。
4. 键的比较：在 Map 中，键是基于 "SameValueZero" 算法进行比较的，这意味着键的比较不仅仅是引用相等性。这使得 Map 适用于需要进行复杂键比较的场景，例如使用自定义对象作为键。
5. 集合操作：Map 的键是唯一的，这使得它可以用于处理集合操作。可以使用 Map 的方法，如 `set`、`has`、`delete` 等来执行并集、交集、差集等集合操作。
6. 数据转换和映射：Map 可以用于数据的转换和映射。通过遍历 Map，并在每个键值对上应用转换或映射函数，可以轻松地将原始数据转换为新的格式。

需要根据具体的需求来选择数据结构，如果需要存储键值对并且需要进行复杂的键比较、保持顺序或进行集合操作等，Map 是一个强大且灵活的选择。

Map 与其他数据类型转换：

> `Map` → `Array`

```js
const map = new Map();
map.set('name', '张三');
map.set('job', '前端工程师');
console.log([...map]); // [ [ 'name', '张三' ], [ 'job', '前端工程师' ] ]
```

> `Array` → `Map`

```js
const arr = [
  ['name', '张三'],
  ['job', '前端工程师'],
];
const map = new Map(arr);
console.log(map); // Map(2) { 'name' => '张三', 'job' => '前端工程师' }
```

> `Map` → `Object`

```js
function mapToObj(map) {
  let obj = Object.create(null);
  for (let [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}
const map = new Map().set('name', '张三').set('job', '前端工程师');
console.log(mapToObj(map)); //  { name: '张三', job: '前端工程师' }
```

> 提示：如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

> `Object` → `Map`

```js
function objToMap(obj) {
  const map = new Map();
  for (let key of Object.keys(obj)) {
    map.set(key, obj[key]);
  }
  return map;
}
console.log(objToMap({ name: '张三', job: '前端工程师' }));
```

### 2.2. Set & WeakSet（*News*）

Set 类似于数组，但成员是唯一且无序的，没有重复的值。

- Set：[参考这里 >>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
- WeakSet：[参考这里 >>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

常见的Set对象使用场景包括：

1. 去重：可以使用Set来去除数组中的重复元素。
2. 数组操作：可以将Set与数组进行转换，以便执行交集、并集和差集等操作。
3. 缓存：可以使用Set来缓存已经处理过的数据，以避免重复处理相同的数据。
4. 监听器：可以使用Set来存储监听器函数，以确保每个监听器只被调用一次。
5. 计数器：可以使用Set来计数一组数据中不同的元素数量。

使用 Set 数据结构可以很方便地求差集、并集、交集，假设有两个 Set a 和 b，它们分别包含一些元素。

1. 求差集

   ```js
   const differenceSet = new Set([...a].filter(x => !b.has(x)));
   ```

2. 求并集

   ```js
   const unionSet = new Set([...a, ...b]);
   ```

3. 求差集

   ```js
   const intersectionSet = new Set([...a].filter(x => b.has(x)));
   ```

上述代码中，`[...a]` 表示将 Set 转换为数组，然后再使用数组的方法进行处理。`filter()` 方法用于过滤数组中不符合条件的元素，`has()` 方法用于判断 Set 中是否包含某个元素。最后， `new Set()` 可以将结果转换回 Set。

### 2.3. Proxy & Reflect \*（*News*）

Proxy 和 Reflect 是 ES6 引入的两个新的内置对象，它们提供了一些强大的功能，可以用于拦截和操作对象的行为。

#### 2.3.1. 基础

[Proxy >>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

语法：

```js
const p = new Proxy(target, handler)
```

- `target`： 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
- `handler`：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为

#### 2.3.2. Handlers(13)

Proxy 支持13种拦截方式，如下所示：

- [**`handler.apply()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply)：拦截函数的调用。
- [**`handler.construct()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct)：拦截 new 操作符。
- [**`handler.defineProperty()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineProperty)：拦截对象的 Object.defineProperty() 操作。
- [**`handler.deleteProperty()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/deleteProperty)：拦截对对象属性的 [`delete`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete) 操作。
- [**`handler.get()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get)：拦截对象的读取属性操作。*（重要）*
- [**`handler.getOwnPropertyDescriptor()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor)： 方法是 [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) 的钩子。
- [**`handler.getPrototypeOf()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getPrototypeOf)：读取代理对象的原型时，该方法就会被调用。
- [**`handler.has()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has#%E5%B0%9D%E8%AF%95%E4%B8%80%E4%B8%8B)： 拦截 [`in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 操作符。
- [**`handler.isExtensible()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/isExtensible)：拦截对对象的 Object.isExtensible() 操作。
- [**`handler.ownKeys()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys)：拦截 [`Reflect.ownKeys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)。
- [**`handler.preventExtensions()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/preventExtensions)：拦截对对象的 [`Object.preventExtensions()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) 操作。
- [**`handler.set()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)： 拦截对象的设置属性操作。*（重要）*
- [**`handler.setPrototypeOf()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/setPrototypeOf)：拦截 [`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf).

下面主要介绍几个常用的拦截方式：

##### [`handler.get()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get)

语法：

```javascript
const p = new Proxy(target, {
  get: function (target, property, receiver) {},
});
```

- `tagrt`：目标对象
- `propKey`：被获取的属性名
- `receiver`：Proxy 或者继承 Proxy 的对象

> 1）读取属性

```javascript
const object = { name: '张三', job: '前端工程师' };
const p = new Proxy(object, {
  get(target, property, receiver) {
    const value = target[property];
    if (value) {
      return value;
    } else {
      throw new ReferenceError(`Property ${property} does not exist.`);
    }
  },
});

console.log(p.name);  // 张三
console.log(p.major); // ReferenceError: Property major does not exist.
```

> 2）实现数组读取负数的索引

```javascript
function createArray(elements) {
  return new Proxy(elements, {
    get(target, property, receiver) {
      const index = +property;
      if (index < 0) {
        property = target.length + index;
      }
      return Reflect.get(target, property, receiver);
    },
  });
}
const arr = createArray([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 输出：5
```

> 3）`get` 方法可以继承

```javascript
const car = {
  _brand: '东风本田',
  color: '珍珠白',
};
const p = new Proxy(car, {
  get(target, property, receiver) {
    // 实现私有属性的保护
    if (/^_/.test(property)) {
      throw new Error(`私有属性 ${property} 不可访问.`);
    }
    return Reflect.get(target, property, receiver);
  },
});

console.log(p.color); // 珍珠白
console.log(p._brand); // Error: 私有属性 _brand 不可访问.
```

##### [`handler.set()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)

语法：

```js
const p = new Proxy(target, {
  set: function (target, property, value, receiver) {},
});
```

示例：

```javascript
const formData = {
  username: '',
  age: 0,
  mobile: '',
};
const p = new Proxy(formData, {
  set(target, property, value, receiver) {
    // 1. 校验规则 不能为空
    if (!value) {
      throw new Error(`请填写 ${property}.`);
    }
    // 2. 校验用户名：4位以上，字母数字下划线
    if (property === 'name' && /\W{4}/.test(value)) {
      throw new Error('用户名仅支持4位以上的字母数字下划线.');
    }
    // 3. 校验年龄：大于18
    if (property === 'age' && +value < 18) {
      throw new Error('年龄必须大于18岁.');
    }
    // 4. 校验手机号
    if (property === 'mobile' && !/^1[3456789]\d{9}$/.test(value)) {
      throw new Error('手机号码格式不正确');
    }
    target[property] = value;
  },
});
```

#### 2.3.3. Reflect

[Reflect >>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect) 是一个内置的对象，它提供了一组与对象操作相关的方法，这些方法与对应的 Object 方法功能基本相同。Reflect 的方法设计更加合理，使用更加方便，并且可以作为函数直接调用，而不需要通过对象实例来调用。Reflect 方法包括 Reflect.get、Reflect.set、Reflect.has 等。它们可以用于代替 Object 的相关方法，完成对象属性的读取、赋值和判断等操作。

Reflect APIs 和 Proxy APIs 一致，笔者认为，二者的区别可以这么理解， Reflect 是用来操作对象的，Proxy 是用来操作代理的。

#### 2.3.4. 场景

> **1）私有属性**

在 js 或其他语言中，大家会约定俗成地在变量名之前添加下划线（`_`）来表明这是一个私有属性（并不是真正的私有），但我们无法保证真的没人会去访问或修改它。在下面的代码中，我们声明了一个私有的 appsecret，便于 api 这个对象内部的方法调用，但不希望从外部也能够访问 api._appsecret：

```js
const api = {
  _appsecret: "5732e4c9db7ff9f7",
  appID: "wx1695393264bf7d",
  wx: "gh_133b3cd88m3a",
};

api._appsecret = "123456789";
console.log(api._appsecret); // 123456789
```

很显然，约定俗成是没有束缚力的。使用 ES6 Proxy 我们就可以实现真实的私有变量了，下面针对不同的读取方式演示两个不同的私有化方法。

```js
const api = {
  _appsecret: '5732e4c9db7ff9f7',
  appID: 'wx1695393264bf7d',
  wx: 'gh_133b3cd88m3a',
};

const p = new Proxy(api, {
  get(target, property, receiver) {
    if (/^_/.test(property)) {
      console.log(`私有属性 ${property} 不支持访问.`);
      return null;
    }
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    if (/^_/.test(property)) {
      console.log(`私有属性 ${property} 不支持赋值.`);
      return null;
    }
    return Reflect.set(target, property, value, receiver);
  },
});

console.log(p.appID); // - 5732e4c9db7ff9f7
console.log(p._appsecret); // - 有属性 _appsecret 不支持访问.
```

> **2）实现观察者模式**

```javascript
const createObservable = (obj, onChange) => {
  return new Proxy(obj, {
    set(target, property, value, receiver) {
      target[property] = value;
      onChange(property, value);
      return true;
    },
  });
};

// Example usage:
const person = createObservable({ name: 'Alice', age: 25 }, (key, value) => {
  console.log(`Property '${key}' changed to '${value}'`);
});

person.name = 'Bob';
person.age = 30;

// Output:
// Property 'name' changed to 'Bob'
// Property 'age' changed to '30'
```

在上述示例中，`createObservable` 函数返回一个代理对象，当设置属性时会调用 `onChange` 回调函数，并将属性名称和新值作为参数传递给它。该示例仅用于演示目的，实际应用中可能需要更复杂的逻辑来处理观察者列表的添加和删除，以及通知机制的实现。

### 2.4. 字符串

#### 2.4.1. 模板字符串

模板字面量（Template Literals）：使用反引号（\`）包围字符串，可以在字符串中插入变量或表达式，通过 `${}` 来引用。这使得字符串拼接更加简洁和可读。

```javascript
const name = 'John';
const message = `Hello, ${name}!`;
```

> 提示：
>
> 1、模板字符串中嵌入变量使用 `${}`，`${}` 中可以是变量或表达式。
>
> 2、如果使用模板字符串表示多行字符串，所有的空格、缩进和换行都会保留在输出之中。

#### 2.4.2. 新增APIs

- [String.prototype.includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
- [String.prototype.startsWith()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
- [String.prototype.endsWith()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
- [String.prototype.repeat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)
- [String.prototype.padStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
- [String.prototype.padEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)

### 2.5. 数值

#### 2.5.1. Number 

- [Number.parseInt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseint)
- [Number.parseFloat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat)

- [Number.isNaN()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)
- [Number.isInteger()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)

#### 2.5.2. Math

- [Math.trunc()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc)：去除小数部分，返回整数部分
- [Math.sign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sign)：判断一个数是正数、负数还是零。

### 2.6. 对象

#### 2.6.1. 属性简写

```js
const name = '张三', job = '前端工程师';
const person = { 
  name, 
  job,  
  description() {
    console.log(`${this.name} - ${this.job}`);
  }
};
```

#### 2.6.2. 属性名表达式

```js
const person = {
  ['person' + 'Name']: "张三",
  ['show' + 'Name']() {
    console.log(this.personName);
  }
}

console.log(person.personName);
person.showName();
```

#### 2.6.3. APIs

- [**`Object.assign()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)：浅拷贝
- [**`Object.is()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)：判断两个值是否为[同一个值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)。

### 2.7. 数组

- [**`Array.from()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)：将类似数组转变为真正的数组；
- [**`Array.of()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)：将一组值，转换为数组；

- [**`Array.prototype.copyWithin()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)：将数组内的某组元素复制替换到指定位置。
- [**`Array.prototype.find()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)：返回数组中满足提供的测试函数的第一个元素的值。
- [**`Array.prototype.findIndex()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)：返回数组中满足提供的测试函数的第一个元素的 **索引**。若没有找到对应元素则返回-1。
- [**`Array.prototype.includes()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)：判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
- [**`Array.prototype.entries()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)：返回一个新的 **Array Iterator** 对象，该对象包含数组中每个索引的键/值对。
- [**`Array.prototype.keys()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)：返回一个包含数组中每个索引键的 **Array Iterator** 对象。
- [**`Array.prototype.values()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values)：返回一个新的 **`Array Iterator`** 对象，该对象包含数组每个索引的值
- [**`Array.prototype.fill()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)：该方法使用给定值，填充一个数组。
- [**`Array.prototype.every()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)：测试一个数组内的**所有元素**是否都能通过某个指定函数的测试。它返回一个布尔值。
- [**`Array.prototype.some()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)：测试数组中是不是**至少有1个**元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
- [**`Array.prototype.flat()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)：按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
- [**`Array.prototype.map()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)：创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
- [**`Array.prototype.filter()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)：过滤数组元素
- [**`Array.prototype.reduce()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)：对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

## 3. 运算符与语句

### 3.1. 函数

#### 3.1.1. 函数参数的扩展

**默认参数**

```js
function print(name, gender = '保密', job = '未知') {
  console.log(`${name} - ${gender} - ${job}`);
}
print("张三", "男");  // 输出：张三 - 男 - 未知
```

**不定参数**

形式为 `...变量名`，用于获取函数的多余参数，这样就不需要使用`arguments`对象了。

```js
function sum(...nums) {
  return nums.reduce((prev, cur) => prev + cur, 0);
}
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4)); // 10
```

#### 3.1.2. 箭头函数

[Arrow_functions =>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

ES6允许使用箭头定义函数，其语法形式为：

```javascript
// 1. 基础示例
(param1, param2, ..., paramN) => { statements }
(param1, param2, ..., paramN) => expression  → (param1, param2, …, paramN) => { return expression; }

// 2. 当只有一个参数时，圆括号是可选的：
(singleParam) => { statements } → singleParam => { statements }

// 3. 没有参数的函数应该写成一对圆括号。
() => { statements }
```

> 注意：
>
> 1、箭头函数定义在哪个对象上，`this` 关键字就指向哪个对象。
>
> 2、不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
>
> 3、不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 ...args 参数代替。

**场景**

箭头函数适用于简单的函数表达式，特别是回调函数和匿名函数。以下是箭头函数适合使用的场景：

- 使用场景：
  - 单行函数体
  - 简单的返回表达式
  - 不需要 this、arguments 或 super 的函数
- 不适用场景：
  - 需要动态上下文 (例如 this) 的方法
  - 在对象中使用的方法
  - 需要具有命名函数的构造函数
  - 需要使用 arguments 对象的函数

### 3.2. class类

#### 3.2.1. 基本语法

##### 概述

js 生成对象传统方法是通过构造函数实现，如下所示：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.description = function () {
  return `${this.name} - ${this.age}`;
};
const person = new Person('张三', 30);
```

上面这种写法跟传统的面向对象语言差异很大，很容易让新学习这门语言的程序员感到困惑。ES6提供了更接近传统语言的写法，引入了Class（类）作为对象的模板。通过 `class` 关键字，可以定义类。基本上，ES6  `class` 的绝大部分功能，ES5都可以做到，新的Class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用ES6的Class 改写如下所示：

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  description() {
    return `${this.name} - ${this.age}`;appsecret
  }
}
const person = new Person('张三', 30);
```

上面代码定义了一个Person类，可以看到里面有一个 `constructor`（*构造函数*） 方法，而 `this` 关键字则代表实例对象。也就是说，ES5的构造函数 Person，对应ES6的 Person.constructor。

Person 类除了构造方法，还定义了一个`description` 方法。注意，定义类的方法的时候，前面不需要加上 `function` 关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

ES6的类，完全可以看作构造函数的另一种写法。

```javascript
class Person {
  // ...
}

console.log(typeof Person); // 输出：function
console.log(Person === Person.prototype.constructor); // 输出：true
```

上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

使用的时候，也是直接对类使用 `new` 命令，跟构造函数的用法完全一致。

构造函数的 prototype 属性，在 ES6 的类上面继续存在。事实上，类的所有方法都定义在类的 prototype 属性上面。

##### 构造函数

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加。				

```javascript
class User {}
class User {
  constructor() {}
}
```

> 提示：
>
> 1. constructor 方法默认返回实例对象(即 `this` )，当然也可以通过 `return` 返回其他对象。
> 2. 创建对象实例时，必须加上 `new` 关键字。

##### 实例对象

```javascript
class Student {
  constructor(name, major) {
    this.name = name;
    this.major = major;
  }
  description() {
    console.log(`${this.name} - ${this.major}`);
  }
}

const student = new Student("张三", "软件工程");
console.log(student.hasOwnProperty('name')); // true
console.log(student.hasOwnProperty('major')); // true
console.log(student.hasOwnProperty('description')); // false 
console.log(student.__proto__.hasOwnProperty("description")); // true 
```

> **注意**：实例的属性除非显式定义在其本身(即定义在 this 对象上)，否则都是定义在原型上。

与 ES5 一样，类的所有实例共享一个原型对象。

```javascript
const stu1 = new Student();
const stu2 = new Student();
console.log(stu1.__proto__ === stu2.__proto__); // true
```

这也意味着，可以通过实例的 \__proto__ 属性为“类”添加方法。

```javascript
stu1.__proto__.sayHi = function() {
  console.log("Hi");
}
stu2.sayHi(); // Hi
```

> 注意：使用实例的 \__proto__ 属性改写原型，必须相当谨慎，不推荐使用，因为这会改变类的原始定义，影响到所有实例。

##### 类不支持变量提升

类不存在变量提升，这意味着创建类的实例时，必须先定义类。

##### 私有属性/方法

在属性或方法名前添加 ‘#’ 号即可声明私有属性和方法。

```js
class Person {
  // -- 私有属性
  #id = '123';
  // -- 私有方法
  #sayHi = function () {
    console.log('Hi');
  };
  // -- 测试函数
  test() {
    console.log(this.#id);
    this.#sayHi(); // - Hi
  }
}

const person = new Person();
console.log(person.#id); // - SyntaxError: Private field '#id' must be declared in an enclosing class
person.test(); // - 123 Hi
```

##### this 指向

类的方法内部如果含有 this ，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

```javascript
class Person {
  sayHello(name = 'Admin') {
    this.print(name);
  }
  print(desc) {
    console.log(`Hello, ${desc}`);
  }
}

const person = new Person();
person.sayHello("Tom");

const { sayHello } = person;
sayHello("Jack"); // TypeError: Cannot read properties of undefined (reading 'print')
```

要解决这个问题，主要有两种弄方案：

**方案1：在构造方法中动态绑定this**

```javascript
class Person {
  constructor() {
    // -- 动态绑定this
    this.sayHello = this.sayHello.bind(this);
  }
  // ...
}
```

**方案2：使用箭头函数**

```javascript
class Person {
  constructor() {
    this.sayHello = (name = "Admin") => {
      this.print(name);
    }
  }
  // ...
}
```

##### set & get

与 ES5 一样，在类的内部可以使 set 和 get 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class Person {
  constructor() {}
  get name() {
    console.log('call the get.');
    return 'Admin';
  }
  set name(value) {
    console.log('call the set.');
  }
}
let per = new Person();
per.name = 'Admin'; // set
console.log(`name: ${per.name}`); // get
```

上面代码中，`name` 属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

##### 静态属性/方法

静态属性/方法不会被实例继承，而是直接通过类来调用。静态方法声明需在属性/方法前通过 `static` 关键字修饰。

```javascript
class Person {
  // 静态属性
  static k = '__k';
  // 静态方法
  static sayHi() {
    console.log('Hi');
  }
  // 实例方法
  drinkWith(desc) {
    console.log(`喝${desc}!`);
  }
}
let person = new Person();
// 静态属性/方法通过类名直接调用
console.log(Person.k); // __k
Person.sayHi(); // Hello
person.sayHi(); // TypeError: person.sayHi is not a function
person.drinkWith("龙井茶");
```

> **注意**：如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例。

#### 3.2.2. 继承

ES6 继承可通过 `extends` 关键字实现。

```javascript
// 定义基础类（Person）
class Person {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
  }

  static sayHi() {
    console.log('Hi');
  }
  play() {
    console.log('play basketball.');
  }
}

// 定义学生类（Student）继承于基础类（Person）
class Student extends Person {
  constructor(name, gender, major) {
    // 调用父类构造方法初始化父类实例属性
    super(name, gender);
    this.major = major;
  }

  // 重写父类方法
  play() {
    // -- 在子类中调用父类方法
    super.play();
    console.log('play football.');
  }
}

const student = new Student("张三", "男", "软件工程");
student.play();
console.log(Object.getPrototypeOf(Student) === Person); // true
```

提示：

1. 通过 [**`Object.getPropertyOf()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) 方法可以查看对象原型，可以使用这个方法判断，一个类是否继承了另一个类。
2. super 关键字指向父类，可作为函数调用，也可作为对象调用
   - 当super作为函数调用时，调用父类的构造方法。
   - 当super作为对象调用时，可通过super关键字调用父类的属性和方法。

### 3.3. 模块化

[模块化 >>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules) 就是将应用程序拆分成可按需导入的单独模块。模块功能主要由两个命令构成：

- [**`export`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)：导出模块
- [**`import`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)：导入模块

## 4. 异步编程

### 4.1. Promise

Promise 相关面试题 [戳这里 >>](https://juejin.cn/post/6844904077537574919)

#### 4.1.1. 概述

[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 是 js 中处理异步操作的一种机制，它提供了一种更优雅和可靠的方式来处理异步代码。Promise 是一个代表异步操作最终完成或失败的对象，可以通过链式调用来组织和控制异步操作的流程。

Promise 解决了 js 异步编程的痛点，即 **回调地狱** 和 **多层嵌套**。

以下是我对 Promise 的理解：

1. **异步操作**：Promise 用于处理异步操作，例如网络请求、文件读写、定时器等需要一定时间才能完成的操作。

2. **状态**：Promise 可以处于三种状态：Pending（进行中）、Fulfilled（已成功）和Rejected（已失败）。

   一旦状态确定，就不可改变。

3. **执行流程**：Promise 的执行流程包括三个阶段：Pending、Fulfilled 和 Rejected。

   - 当执行异步操作时，Promise 处于 Pending 状态；
   - 操作成功完成时，Promise 进入 Fulfilled 状态，并返回结果；
   - 操作失败时，Promise 进入 Rejected 状态，并返回错误信息。

4. **链式调用**：Promise 提供了 `then()` 方法，可以通过链式调用来组织和控制异步操作的流程。通过 `then()` 方法，可以指定在异步操作成功完成时执行的回调函数（Fulfilled 状态），以及在操作失败时执行的回调函数（Rejected 状态）。

5. **错误处理**：Promise 提供了 `catch()` 方法来捕获并处理操作过程中发生的错误。通过 `catch()` 方法，可以在 Promise 链中捕获到任何一个操作的失败，并执行相应的错误处理逻辑。

6. **解决回调地狱问题**：Promise 的链式调用可以解决回调地狱（Callback Hell）问题，使得异步代码的编写和阅读更加清晰和可维护。

7. **并行执行和串行执行**：可以利用 `Promise.all()` 方法来并行执行多个 Promise，等待所有 Promise 完成后进行后续处理；也可以使用 Promise 的链式调用来实现串行执行，将多个异步操作按照顺序进行处理

Promise 的出现使得异步操作的编写和控制更加简洁和可靠，避免了回调地狱的问题，提高了代码的可读性和可维护性。它是现代 JavaScript 异步编程的重要工具之一。

当然，Promise 也存在一些缺陷，比如：

1. **无法取消**：一旦创建了一个 Promise，就无法取消它，即使在异步操作尚未完成之前。这可能会导致资源浪费或不必要的操作。
2. **无法处理同步异常**：Promise 的错误处理机制主要针对异步操作中的错误，而无法直接处理同步操作中的异常。同步代码中的异常会被立即抛出，而不会被 Promise 的错误处理函数捕获。
3. **无法处理多个并发请求**：Promise 提供的方法如 `Promise.all()` 可以用于并发执行多个异步操作并等待它们全部完成，但一旦有一个操作失败，整个 `Promise.all()` 的结果就会失败。这种机制无法细粒度地处理多个并发请求的结果。
4. **无法在途中插入步骤**：在 Promise 的链式调用中，一旦链式调用开始执行，就无法在中间插入其他步骤或操作。这可能会限制一些动态操作或条件分支的处理。
5. **无法直接处理回调函数**：很多现有的库和异步函数仍然使用回调函数的方式来处理异步操作，而 Promise 并不能直接处理这些回调函数，需要通过额外的包装或转换来适应。
6. **错误堆栈不完整**：当 Promise 链中发生错误时，错误信息只会出现在最后一个 Promise 的错误处理函数中，而不会显示完整的错误堆栈信息，这可能会对错误的追踪和调试造成困扰。

#### 4.1.2. 用法

语法形式：

```js
const promise = new Promise((resolve, reject) => {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
})
```

Promise 构造函数接受一个函数作为参数，该函数有两个参数，分别是 resolve 和 reject。

- resolve：标识成功，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
- reject：标识失败，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

Promise 实例生成以后，可以用 `then` 方法分别指定 Fulfilled 状态和 Rejected 状态的回调函数。

```js
promise.then(() => {
  // success
}, error => {
  // fail
});
```

then方法可以接收两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为 Fulfilled 时调用，第二个回调函数是Promise对象的状态变为Rejected时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

#### 4.1.3. then

[**`.then()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 方法返回一个 Pomise，它最多需要有两个参数：Promise 的成功和失败情况的回调函数。语法形式如下：

```js
then(onFulfilled)
then(onFulfilled, onRejected)
```

then 不是最终部分，你可以将各个 then 链接在一起来改变值，或依次运行额外的异步操作。

##### 改变值

只需返回新值即可改变值：

```js
const promise = new Promise((resolve) => resolve('ACDB'));
promise
  .then((resp) => {
    console.log(resp); // → ACDB
    return resp.split('');
  })
  .then((letters) => {
    console.log(letters); // → [ 'A', 'C', 'D', 'B' ]
    return letters.sort();
  })
  .then((sorted) => {
    console.log(sorted); // → [ 'A', 'B', 'C', 'D' ]
    return sorted.join('');
  })
  .then((result) => {
    console.log(result); // → ABCD
  });
```

##### 异步操作队列

您还可以链接多个 `then`，以便按顺序运行异步操作。

```js
function t1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("t1");
      resolve("t1成功后返回的内容！");
    }, 1500);
  });
}
function t2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("t2");
      resolve("t2成功后返回的内容！");
    }, 500);
  });
}
function t3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("t3");
      resolve("t3成功后返回的内容！");
    }, 1000);
  });
}

// 连续调用
t1()
  .then((data) => {
    console.log(data);
    return t2();
  })
  .then((data) => {
    console.log(data);
    return t3();
  })
  .then((data) => {
    console.log(data);
  });
/* 
t1
t1成功后返回的内容！
t2
t2成功后返回的内容！
t3
t3成功后返回的内容！ */
```

#### 4.1.4. catch

[**`.catch()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) 方法用于注册一个在 promise 被拒绝时调用的函数。

```js
login()
  .then(() => {
    console.log('Login success.');
  })
  .catch((error) => {
    console.log('Login failure.');
  });
```

#### 4.1.5. finally

[**`.finally()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally) 方法返回一个 Promise。在 Promise 结束时，无论结果是 fulfilled 或者是 rejected，都会执行指定的回调函数

#### 4.1.6. Promise.all()

[**`Promise.all()`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) 包含一组 Promises，并创建一个在所有内容成功完成后执行的 Promise。 您将获得一组结果（即一组 Promise 执行的结果），其顺序与您与传入 Promise 的顺序相同。

```js
const promises = [promise1, promise2, promise3];
Promise.all(promises)
  .then(results => {
    // 所有 Promise 成功完成，results 是一个包含所有结果的数组
  })
  .catch(error => {
    // 任意一个 Promise 失败，错误处理
  });
```

#### 4.1.7. Promise.race()

[**`Promise.race(iterable)`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) 方法返回一个 Promise，一旦迭代器中的某个 Promise 成功或失败，返回的 Promise 就会完成。

```js
const promises = [promise1, promise2, promise3];
Promise.race(promises)
  .then(result => {
    // 第一个完成的 Promise 成功，result 是该 Promise 的结果
  })
  .catch(error => {
    // 第一个完成的 Promise 失败，错误处理
  });
```

### 4.2. [Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator) 

Generator 函数是 ES6 提供的一种异步编程解决方案，它可以在执行过程中暂停和恢复。Generator 函数通过 `function*` 声明，内部使用 `yield` 关键字来定义暂停点。

使用 Generator 的基本用法：

1. 声明 Generator 函数：使用 `function*` 关键字声明一个 Generator 函数。
2. 定义暂停点：在 Generator 函数内部使用 `yield` 关键字来定义暂停点。`yield` 表达式的值将作为 Generator 的下一个 `next()` 调用的返回值。
3. 创建 Generator 对象：通过调用 Generator 函数返回的迭代器对象来创建 Generator 对象。
4. 控制执行流程：可以通过调用 Generator 对象的 `next()` 方法来执行 Generator 函数的代码，并在每次执行到 `yield` 关键字时暂停执行并返回结果。
5. 恢复执行：通过多次调用 Generator 对象的 `next()` 方法来逐步恢复执行，每次恢复执行都会执行到下一个 `yield` 关键字处，并将 `yield` 表达式的值作为结果返回。

#### 4.2.1. 示例

> **基础示例**

```js
function* hello() {
  yield  1;
  yield  2;
  return 3;
}

const p = hello();
console.log(p.next()); // {value: 1, done: false}
console.log(p.next()); // {value: 2, done: false}
console.log(p.next()); // {value: 3, done: true }
```

> **异步操作的流程控制**

```js
function* asyncFlow() {
  // 执行异步操作
  const result1 = yield asyncOperation1();
  // 暂停执行，并等待异步操作1完成后继续执行
  const result2 = yield asyncOperation2(result1);
  // 暂停执行，并等待异步操作2完成后继续执行
  const result3 = yield asyncOperation3(result2);
  // ...
}

// 调用异步操作的流程控制
const flow = asyncFlow();
flow
  .next()
  .value.then((result1) => flow.next(result1).value)
  .then((result2) => flow.next(result2).value)
  .then((result3) => {
    // ...
  });
```

> **自定义迭代器**

```js
function* customIterator() {
  yield 'Apple';
  yield 'Banana';
  yield 'Cherry';
}

// 遍历自定义迭代器
const iterator = customIterator();
for (const item of iterator) {
  console.log(item); // Apple, Banana, Cherry
}
```

> **生成器组合**

```js
function* generator1() {
  yield 'Hello';
  yield 'World';
}

function* generator2() {
  yield* generator1();
  yield '!';
}

// 遍历组合的生成器
const iterator = generator2();
for (const item of iterator) {
  console.log(item); // Hello, World, !
}
```

# ES7（2016）

## 1. Array.prototype.includes()

`includes()` 函数用来判断一个数组是否包含一个指定的值，如果包含则返回 `true`，否则返回`false`。

```javascript
console.log([1, 2, 3].includes(1)); // true
console.log([1, 2, 3].includes(4)); // false
```

ES7 之前，我们通过 `indexOf` 判断，如：

```javascript
console.log([1, 2, 3].indexOf(1) !== -1);
```

## 2. 指数操作符 `**`

在 ES7 中引入了指数运算符 `**`，`**` 具有与 `Math.pow(..)` 等效的计算结果。

 ```javascript
 2 ** 3 === Math.pow(2, 3)
 ```

# ES8（2017）

## 1. `async` / `await`

### 1.1. 概述

`async` / `await` 是基于 `promise` 的语法糖，它的作用是让异步代码看起来像同步代码 → 方便控制顺序。

`async` / `await` 的基本原理是利用 Promise 对象和 Generator 函数。async 函数用于声明一个异步函数，而 await 关键字用于暂停 async 函数的执行，等待一个 Promise 对象的解析结果，然后继续执行。

使用 async/await 的特点和优势如下：

1. 简洁清晰的语法：相比于使用回调函数或者 Promise 链式调用，async/await 提供了更直观、类似同步代码的写法，使得异步操作的代码更易于理解和维护。
2. 更好的错误处理：使用 try/catch 结构可以方便地捕获异步操作中的错误，并进行统一的错误处理，提高代码的健壮性和可读性。
3. 链式调用的优势：通过 await 关键字，可以按照顺序依次执行多个异步操作，避免了回调地狱和嵌套的层次结构，使得代码逻辑更加清晰。
4. 更好的控制流程：使用 async/await 可以很方便地控制异步操作的执行顺序，等待前一个异步操作完成后再执行下一个操作，使得代码的执行流程更加可控。

使用 async/await 的基本语法如下：

```js
async function someAsyncFunction() {
  try {
    const result1 = await asyncOperation1(); // 等待异步操作1完成
    const result2 = await asyncOperation2(result1); // 等待异步操作2完成，使用前一个操作的结果
    // ...
    return finalResult; // 返回最终结果
  } catch (error) {
    // 处理异常情况
  }
}
```

在上述示例中，`someAsyncFunction()` 是一个异步函数，内部使用 `await` 关键字暂停执行，等待异步操作的结果。在 `try` 代码块中，我们按照顺序执行了多个异步操作，利用前一个操作的结果作为后一个操作的参数或者依赖。如果任意一个异步操作失败，就会被 `catch` 代码块捕获，进行错误处理。

需要注意的是，`await` 关键字只能在 `async` 函数内部使用，并且只能等待一个 Promise 对象的解析结果。如果要并行执行多个异步操作，可以使用 `Promise.all()` 或者其他并发控制的方法

### 1.2. async

我们使用 `async` 关键字，把它放在函数声明之前，使其成为 [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)（异步函数）。

在 `async` 修饰的函数里面，一定会返回一个 `promise` 对象，如果你没返回一个 `promise` 对象的话，默认会返回一个值为`undefined` 的 `promise` 对象

```javascript
async function hello() {
  return "Li-HONGYAO";
};
console.log(hello()); // → Promise { 'Li-HONGYAO' }

async function hello() {};
console.log(hello()); // → Promise { undefined }
```

我们可以通过 `then` 来获取异步函数的返回值。

### 1.3. await

`await` 操作符用于等待一个 `Promise` 对象, 它只能在异步函数 `async function` 内部使用。

`await` 后面如果是同步执行代码，那么会等待其执行完成，如果是异步代码则只有返回一个 `Promise` 对象时，才会进行等待。

异步函数的工作方式是这样的：

```js
async function myFirstAsyncFunction() {
  try {
    const fulfilledValue = await promiseFn;
  } catch (rejectedValue) {
    // …
  }
}
```

如果在函数定义之前使用了 `async` 关键字，就可以在函数内使用 `await`。 当您 `await` 某个 Promise 时，函数暂停执行，直至该 Promise 产生结果，并且暂停并不会阻塞主线程。 如果 Promise 执行，则会返回值。 如果 Promise 拒绝，则会抛出拒绝的值。

### 1.4. 异步函数几种写法

我们已经见识了 `async function() {}`，但 `async` 关键字还可用于其他函数语法：

> **1）箭头函数**

```js
const getData = async () => {
  const data = {};
  const r = await api.get("URI", data);
  return r;
};
```

> **2）对象方法**

```js
const storage = {
    async getAvatar(name) {
        const cache = await caches.open('avatars');
        return cache.match(`/avatars/${name}.jpg`);
    }
};
storage.getAvatar('muzili').then(/* ... */);
```

> **3）类方法**

```js
class Storage {
    constructor() {
        this.cachePromise = caches.open('avatars');
    }

    async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
    }
}

const storage = new Storage();
storage.getAvatar('jaffathecake').then(/* ... */);
```

> 提示：类构造函数以及 getter/settings 方法不能是异步的。

### 1.5. 应用场景

> **1）`async/await` 在并发场景中的应用**

先来看一个例子：

```js
const getName = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Li-HONGYAO');
    }, 1000);
  });

const getJob = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Web Front-end Engineer');
    }, 2000);
  });

(async () => {
  console.log('code running...');
  const name = await getName();
  const job = await getJob();
  console.table({ name, job });
})();
```

对于上述的例子，我们调用 `await` 两次，第1次等待1秒，第2次等待2秒，一共是3秒，效率比较低，而且两次 `await` 的调用没有依赖关系，那能不能让其并发执行呢，答案是可以的。

开始之前，我们先看 Promise 的语法：

```js
new Promise(function(resolve, reject) {...} /* executor(执行函数) */ );
```

> `executor` 是带有 `resolve` 和 `reject` 两个参数的函数 。 <u>`Promise` 构造函数执行时立即 调用 `executor` 函数</u> ， `resolve` 和 `reject` 两个函数作为参数传递给 `executor`（executor 函数在 Promise 构造函数返回新建对象前被调用）。`executor` 内部通常会执行一些异步操作，一旦完成，可以调用 `resolve` 函数来将 `promise` 状态改成 `fulfilled`（成功），或者在发生错误时将它的状态改为 `rejected`（失败）。

传给 `Promise` 作为参数的函数会在 `new` 创建实例时立即调用。

上面的代码，可以分解成这样：

```js
(async () => {
  console.log('code running...');

  const namePromise = getName();
  console.log('namePromise');
  const name = await namePromise;

  const jobPromise = getJob(); //  1秒之后才生成 Promise 实例
  console.log('jobPromise');
  const job = await jobPromise;

  console.table({ name, job });
})();
```

所以，如果想并行执行，我们应该先生成所有需要使用的 `Promise` 实例：

```js
(async () => {
  console.log('code running...');
  // 先生成所有 promise 实例
  const namePromise = getName();
  const jobPromise = getJob();
  const name = await namePromise;
  const job = await jobPromise;
  console.table({ name, job });
})();
```

或者使用 `Promise.all`

```js
(async () => {
  console.log('code running...');
  // → 通过 Promise.all 实现异步函数的并行执行
  const [name, job] = await Promise.all([getName(), getJob()]);
  console.table({ name, job });
})();
```

## 2. `Object.values()`

`Object.values()` 是一个与 `Object.keys()` 类似的新函数，但返回的是 `Object` 自身属性的所有值，不包括继承的值。

假设我们要遍历如下对象 `obj` 的所有值：

```javascript
const obj = { a: 1, b: 2, c: 3 };

// → ES8 before
const vals = Object.keys(obj).map((k) => obj[k]);
console.log(vals); // [ 1, 2, 3 ]

// → ES8 after
console.log(Object.values(obj)); // [ 1, 2, 3 ]
```

## 3. `Object.entries()`

`Object.entries()` 函数返回一个给定对象自身可枚举属性的键值对的数组。

接下来我们来遍历上文中的 `obj` 对象的所有属性的 `key` 和 `value`：

```javascript
const obj = { a: 1, b: 2, c: 3 };

// → ES8 before
Object.keys(obj).forEach((k) => {
  console.log(`key: ${k}, value: ${obj[k]}`);
});

// → ES8 after
for (const [k, v] of Object.entries(obj)) {
  console.log(`key: ${k}, value: ${v}`);
}

/**
 * -- console.log
 * key: a, value: 1
 * key: b, value: 2
 * key: c, value: 3
 */
```

## 4. String padding

在 ES8 中 String 新增了两个实例函数 `String.prototype.padStart` 和 `String.prototype.padEnd`，允许将空字符串或其他字符串添加到原始字符串的开头或结尾。语法形式如下：

```javascript
String.padStart(targetLength [, padString]);
String.padEnd(targetLength [, padString]);
```

- `targetLength`：当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- `padString`：填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 `""`。

**应用场景：**

> 1）补全指定位数，如格式化时间或日期时

```javascript
const d = new Date();
const year = d.getFullYear();
const month = (d.getMonth() + 1 + '').padStart(2, 0);
const day = (d.getDate() + '').padStart(2, 0);
const hours = (d.getHours() + '').padStart(2, 0);
const minutes = (d.getMinutes() + '').padStart(2, 0);
const seconds = (d.getSeconds() + '').padStart(2, 0);
console.log(`当前时间：${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
// → 2022-01-17 11:01:01
```

当月日时分秒在小于10时，我们一般的处理方式是在位数前加一个 `0`，比如秒数是 `2`，那需要将其转换成 `02` 来展示已实现视觉上的统一。这是，通过 `padStart` 方法就可以非常方便的实现啦。

## 5. `Object.getOwnPropertyDescriptors()`

`Object.getOwnPropertyDescriptors()` 函数用来获取一个对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。

```javascript
const obj = { name: 'Li-HONGYAO' };
console.log(Object.getOwnPropertyDescriptors(obj));
/**
{
  name: {
    value: 'Li-HONGYAO',
    writable: true,
    enumerable: true,
    configurable: true
  }
}
 */
```