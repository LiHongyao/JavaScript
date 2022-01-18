/*
 * @Author: Lee
 * @Date: 2022-01-17 15:28:13
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-18 17:55:28
 */

var obj = {
  id: 'awesome',
  cool: function coolFn() {
    console.log(this.id);
  },
};
var id = 'not awesome';
obj.cool(); // awesome
setTimeout(obj.cool, 100); // not awesome
