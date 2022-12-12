/*
 * @Author: Lee
 * @Date: 2022-12-01 16:05:40
 * @LastEditors: Lee
 * @LastEditTime: 2022-12-01 17:04:32
 * @Description:
 */
var button = document.querySelector('.button');

// -- 添加事件监听
button.addEventListener('click', handler, false);
// -- 移除事件监听
button.removeEventListener('click', handler, false);

function handler() {
  console.log('Hello');
}

