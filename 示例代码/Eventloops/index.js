/*
 * @Author: Lee
 * @Date: 2023-05-06 16:14:03
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-06 16:33:09
 * @Description:
 */



// → 示例1
// console.log('start');
// setTimeout(function cb() {
//   console.log('setTimeout1');
// });

// console.log('message');

// setTimeout(function cb1() {
//   console.log('setTimeout2');
// }, 0);

// console.log('end');




// → 示例2
// console.log('start');

// setTimeout(() => {
//   console.log('setTimeout');
// }, 0);

// Promise.resolve()
//   .then(() => {
//     console.log('promise1');
//   })
//   .then(() => {
//     console.log('promise2');
//   });

// console.log('end');

// → 示例3
// console.log('start'); // 同步代码，立即执行

// setTimeout(function () {
//   console.log('timeout1'); // 宏任务
// }, 5);

// new Promise((resolve) => {
//   console.log('promise1'); // 同步代码，立即执行
//   resolve();
//   setTimeout(() => console.log('timeout2'), 5); // 宏任务
// }).then(function () {
//   console.log('then1'); // 微任务
// });

// console.log('end'); // 同步代码，立即执行

// start → promise1 → end → then1 → timeout1 → timeout2


