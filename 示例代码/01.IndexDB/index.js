/*
 * @Author: Li-HONGYAO
 * @Date: 2021-04-19 17:00:50
 * @LastEditTime: 2021-04-20 10:18:23
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \01.IndexDB\index.js
 */

(async function () {
  // 1. 打开数据库
  const db = await openDB("TEST-DATABASE");
  // addUsr();
  // getUsr();
  // readAll();
  update();
  function update() {
    const objectStore = db.transaction(["USRS"], "readwrite").objectStore("USRS")
    const request = objectStore.get(1);
    request.onsuccess = e => {
      const data = e.target.result;
      data.phone = '17398888669';
      const putRequest = objectStore.put(data);
      putRequest.onsuccess = e => {
        console.log('Put success!')
      }
    }
  }
  function readAll() {
    const objectStore = db.transaction("USRS").objectStore("USRS");
    const res = [];
    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        res.push(cursor.value);
        cursor.continue();
      } else {
        console.log(res);
        console.log("No more entries!");
      }
    };
  }
  function getUsr() {
    const request = db.transaction(["USRS"]).objectStore("USRS").get(3);
    request.onsuccess = (e) => {
      console.log(request.result);
    };
    request.onerror = (e) => {
      console.log("Get fail with:", e);
    };
  }
  function addUsr() {
    const request = db
      .transaction(["USRS"], "readwrite")
      .objectStore("USRS")
      .add({
        name: "苟玉梅",
        age: 22,
        gender: "女",
        address: "成都市高新区亚和南四路216号",
        phone: "18080606214",
      });
    request.onsuccess = (e) => {
      console.log("Add success!");
    };
    request.onerror = (e) => {
      console.log("Add fail with:", e);
    };
  }
})();
