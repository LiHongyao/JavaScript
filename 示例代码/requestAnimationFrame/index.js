/*
 * @Author: Lee
 * @Date: 2022-12-07 17:03:47
 * @LastEditors: Lee
 * @LastEditTime: 2022-12-12 11:42:35
 * @Description:
 */

/****************
 * 1.页面可见性：visibilitychange
 */
window.addEventListener(
  'visibilitychange',
  () => {
    console.log('document.hidden = ' + document.hidden);
  },
  false
);

/****************
 * 2.使用·动画
 */
// -- 获取DOM元素
let progress = document.querySelector('.v');
// -- 记录步长
let step;
// -- 记录回调函数
let handlerId;
// -- 动画帧回调函数
function render() {
  step++;
  progress.style.width = `${step}%`;
  if (step < 100) {
    handlerId = window.requestAnimationFrame(render);
  }
}
// -- 点击Loading按钮时触发，调用动画效果
function onLoading() {
  step = 0;
  progress.style.width = '0%';
  render();
}
// -- 点击Stop按钮时触发，停止动画
function onStop() {
  cancelAnimationFrame(handlerId);
}

/****************
 * 3.使用·函数节流
 */
/*window.onmousemove = ({ clientX, clientY }) => {
  requestAnimationFrame(() => {
    console.log(clientX, clientY);
  });
};*/

/****************
 * 4.使用·分帧初始化
 */
/*class A {}
class B {}
class C {}
class D {}
var lazyLoadList = [A, B, C, D];
lazyLoadList.forEach((module) => {
  window.requestAnimationFrame(() => {
    new module();
  });
});*/

