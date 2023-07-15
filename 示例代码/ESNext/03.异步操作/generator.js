/*
 * @Author: Lee
 * @Date: 2023-05-30 17:47:18
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-30 17:54:56
 * @Description:
 */

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
