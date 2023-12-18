/*
 * @Author: Lee
 * @Date: 2023-05-06 16:59:30
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-06 16:59:35
 * @Description: 
 */
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    sayHello: function () {
      console.log(
        `Hello, my name is ${this.name} and I'm ${this.age} years old.`
      );
    },
  };
}

const person1 = createPerson('John', 30);
const person2 = createPerson('Jane', 25);

person1.sayHello(); // 输出：Hello, my name is John and I'm 30 years old.
person2.sayHello(); // 输出：Hello, my name is Jane and I'm 25 years old.
