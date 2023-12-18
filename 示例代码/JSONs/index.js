/*
 * @Author: Lee
 * @Date: 2022-11-29 13:46:56
 * @LastEditors: Lee
 * @LastEditTime: 2022-11-29 14:11:15
 * @Description:
 */

/// 语法形式：JSON.stringify(value[, replacer[, space]])

/// -- 转换

var person = {
  name: '张三',
  age: 30,
  sex: '男',
  job: '前端工程师',
};

// 1. 转换对象
console.log(JSON.stringify(person));
// → {"name":"张三","age":30,"sex":"男","job":"前端工程师"}

// 2. 转换普通值
console.log(JSON.stringify('成都')); // → "成都"
console.log(JSON.stringify(1)); // → "1"
console.log(JSON.stringify(true)); // → "true"
console.log(JSON.stringify(null)); // → "null"

// 3. 指定replacer参数为：函数
console.log(
  JSON.stringify(person, (key, value) => {
    // -- 过滤属性值为 number 类型的 key-value 对
    return typeof value === 'number' ? undefined : value;
  })
);
// → {"name":"张三","sex":"男","job":"前端工程师"}

// 4. 指定replacer参数为：数组
console.log(JSON.stringify(person, ['name', 'age']));
// → {"name":"张三","age":30}

// 5. 指定space(美化输出)
console.log(JSON.stringify(person, null, 2));

/*{
  "name": "张三",
  "age": 30,
  "sex": "男",
  "job": "前端工程师"
}*/

// -- 特性1
console.log(JSON.stringify(() => {}));
console.log(JSON.stringify(Symbol('Tag')));
console.log(JSON.stringify(undefined));

// -- 特性2
console.log(
  JSON.stringify({
    name: new String('张三'),
    age: new Number(30),
    checked: new Boolean(false),
  })
);
// → {"name":"张三","age":30,"checked":false}

// -- 特性五
console.log(
  JSON.stringify({
    name: '张三',
    job: '前端工程师',
    toJSON: function () {
      return `${this.name} - ${this.job}`;
    },
  })
);

// → 张三 - 前端工程师