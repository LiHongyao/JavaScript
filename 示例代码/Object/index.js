/*
 * @Author: Lee
 * @Date: 2022-11-29 10:44:31
 * @LastEditors: Lee
 * @LastEditTime: 2022-11-29 11:43:40
 * @Description:
 */

var o1 = { name: '张三' };
var o2 = { major: '软件技术', name: '李四' };

var result = Object.assign(o1, o2);

console.log(result); // {name: '李四', major: '软件技术'}
console.log(result === o1);
