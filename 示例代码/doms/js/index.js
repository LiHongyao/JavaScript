/*
 * @Author: Lee
 * @Date: 2022-03-29 17:12:53
 * @LastEditors: Lee
 * @LastEditTime: 2022-11-30 10:44:25
 */

// -- 查找DOM
// 1. 根据ID查找
console.log(document.getElementById('company'));
// 2. 根据name属性查找
console.log(document.getElementsByName('address'));
// 3. 根据类名查找
console.log(document.getElementsByClassName('departments'));
// 4. 根据标签名查找
console.log(document.getElementsByTagName('li'));
// 5. 根据CSS选择器查找
console.log(document.querySelector('#company'));
console.log(document.querySelectorAll('.departments li'));

var list = document.querySelector('.departments');
console.log(list.previousElementSibling);
console.log(list.previousSibling);
console.log(list.nextElementSibling);
console.log(list.nextSibling);
console.log(list.parentElement);
console.log(list.parentNode);
console.log(list.children);
console.log(list.childElementCount);
console.log(list.childNodes);
console.log(list.firstElementChild);
console.log(list.lastElementChild);

// -- 节点操作
// 1. 创建节点
const el = document.createElement('div');
const attr = document.createAttribute('class');
const fragment = document.createDocumentFragment();

const li = document.createElement('li');
li.textContent = '纪检部';
// list.appendChild(li);
// list.append(li);
list.prepend(li);


