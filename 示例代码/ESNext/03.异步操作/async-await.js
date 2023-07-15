/*
 * @Author: Lee
 * @Date: 2023-03-07 20:31:44
 * @LastEditors: Lee
 * @LastEditTime: 2023-03-07 20:39:25
 * @Description:
 */

// -- 线程休眠
/*function sleep(seconds) {
  return new Promise((resolve) => setTimeout(() => resolve(seconds), seconds));
}

async function test() {
  console.log(1);
  await sleep(2000);
  console.log(2);
}
test();*/

// -- async & await 是否可以取代Promise --- 不可以
function sleep(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(Math.random());
      resolve();
    }, seconds);
  });
}

// -- 串行执行
// -- 省市区
async function test() {
  await sleep(1000);
  await sleep(1000);
  await sleep(1000);
}

// -- 并发执行 -- 还是得用Promise.all
async function test() {
  const tasks = [];
  for (let i = 0; i < 3; i++) {
    tasks.push(sleep(1000));
  }
  await Promise.all(tasks);
}

test();
