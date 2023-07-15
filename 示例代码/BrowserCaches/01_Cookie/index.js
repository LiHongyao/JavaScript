/*
 * @Author: Lee
 * @Date: 2022-12-05 09:25:40
 * @LastEditors: Lee
 * @LastEditTime: 2022-12-05 10:56:03
 * @Description:
 */

var key = '';
var value = '';

function onKeyChange(event) {
  key = event.target.value;
}
function onValueChange(event) {
  value = event.target.value;
}
function onGetCookies() {
  console.log(docCookies.getItem(key));
}
function onSetCookies() {
  if (!key || !value) return;
  console.log(docCookies.setItem(key, value));
}
function onRemoveCookies() {
  console.log(docCookies.removeItem(key));
}

function onGetKeys() {
  console.log(docCookies.keys());
}
