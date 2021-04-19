/*
 * @Author: Li-HONGYAO
 * @Date: 2021-04-19 17:00:50
 * @LastEditTime: 2021-04-19 18:32:10
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \01.IndexDB\index.js
 */

(async function () {
  // 1. 打开数据库
  const db = await openDB("TEST-DATABASE");
  // addUsr();
  function addUsr() {
    const request = db.transaction(["USRS"], "readwrite").objectStore('USRS').add({
      name: "李鸿耀",
      age: 28,
      gender: "男",
      address: "成都市高新区亚和南四路216号",
    });
    request.onsuccess = (e) => {
      console.log("Add success!");
    };
    request.onerror = (e) => {
      console.log("Add fail with:", e);
    };
  }
})();
