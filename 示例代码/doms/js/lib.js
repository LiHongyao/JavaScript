/*
 * @Author: Lee
 * @Date: 2022-03-29 17:22:47
 * @LastEditors: Lee
 * @LastEditTime: 2022-11-29 15:31:10
 */

function showDomInfos(sel) {
  const el = document.querySelector(sel);
  console.table({
    nodeName: el.nodeName,
    nodeValue: el.nodeValue,
    nodeType: el.nodeType,
  });
}
