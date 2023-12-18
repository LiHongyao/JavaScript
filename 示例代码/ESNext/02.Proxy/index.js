/*
 * @Author: Lee
 * @Date: 2023-05-30 16:31:23
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-30 16:45:14
 * @Description:
 */

// const object = { name: '张三', job: '前端工程师' };
// const p = new Proxy(object, {
//   get(target, property, receiver) {
//     const value = target[property];
//     if (value) {
//       return value;
//     } else {
//       throw new ReferenceError(`Property ${property} does not exist.`);
//     }
//   },
// });

// console.log(p.name);  // 张三
// console.log(p.major); // ReferenceError: Property major does not exist.

// const car = {
//   _brand: '东风本田',
//   color: '珍珠白',
// };
// const p = new Proxy(car, {
//   get(target, property, receiver) {
//     // 实现私有属性的保护
//     if (/^_/.test(property)) {
//       throw new Error(`私有属性 ${property} 不可访问.`);
//     }
//     return Reflect.get(target, property, receiver);
//   },
// });

// console.log(p.color); // 珍珠白
// console.log(p._brand); // Error: 私有属性 _brand 不可访问.

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
