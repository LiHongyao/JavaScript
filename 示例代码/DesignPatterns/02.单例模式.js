/*
 * @Author: Lee
 * @Date: 2023-05-06 17:02:57
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-06 17:09:31
 * @Description:
 */

// const Singleton = (function () {
//   let instance;

//   function createInstance() {
//     const object = new Object({ name: 'John' });
//     return object;
//   }

//   return {
//     getInstance: function () {
//       if (!instance) {
//         instance = createInstance();
//       }
//       return instance;
//     },
//   };
// })();

// const instance1 = Singleton.getInstance();
// const instance2 = Singleton.getInstance();

// console.log(instance1 === instance2); // true

class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }

  static getInstance() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    return new Singleton();
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();
const instance3 = Singleton.getInstance();
const instance4 = Singleton.getInstance();
console.log(instance1 === instance2); // true
console.log(instance3 === instance4); // true
