/*
 * @Author: Lee
 * @Date: 2023-05-08 19:42:43
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-08 20:25:11
 * @Description:
 */

// 1. 基础用法
const login = (username, password) => {
  return new Promise((resolve, reject) => {
    /** 模拟异步操作 */
    setTimeout(() => {
      if (username === 'admin' && password === '123') {
        resolve();
      } else {
        reject();
      }
    }, 2000);
  });
};
login('admin', '123').then(
  () => {
    console.log('成功');
  },
  (error) => {
    console.log('失败');
  }
);

// 2. then

// -- 改变值
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

// 3. catch

login()
  .then(() => {
    console.log('Login success.');
  })
  .catch((error) => {
    console.log('Login failure.');
  });

// 4. Promise.all
// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('foo');
//   }, 100);
// });

// Promise.all([promise1, promise2, promise3]).then((values) => {
//   console.log(values); // 输出：[ 3, 42, 'foo' ]
// });

// 5. Promise.race
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// Expected output: "two"
