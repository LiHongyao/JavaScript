/*
 * @Author: Li-HONGYAO
 * @Date: 2021-04-19 17:00:50
 * @LastEditTime: 2021-12-18 23:13:36
 * @LastEditors: Lee
 * @Description:
 * @FilePath: \01.IndexDB\index.js
 */

(async function () {
  // 1. 打开数据库
  const db = await openDB('TEST-DATABASE', 1);
  remove();
  // addUsr();
  // getUsr();
  // readAll();
  // update();
    const request = db
      .transaction(['USRS'], 'readwrite')
      .objectStore('USRS')
      .index('姓名')
      .get('张三');
    request.onsuccess = function (e) {
      var result = e.target.result;
      console.log(result);
    };

  function remove() {
    db.transaction(['USRS'], 'readwrite').objectStore('USRS').delete(2);
  }
  function update() {
    const objectStore = db
      .transaction(['USRS'], 'readwrite')
      .objectStore('USRS');
    const request = objectStore.get(1);
    request.onsuccess = (e) => {
      const data = e.target.result;
      data.id = 1;
      data.major = '网络工程';
      const putRequest = objectStore.put({ ...data });
      putRequest.onsuccess = (e) => {
        console.log('Put success!');
      };
      putRequest.onerror = (e) => {
        console.log(e);
      };
    };
  }
  function readAll() {
    const objectStore = db.transaction('USRS').objectStore('USRS');
    const res = [];
    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        res.push(cursor.value);
        cursor.continue();
      } else {
        console.log(res);
        console.log('No more entries!');
      }
    };
  }
  function getUsr() {
    const request = db.transaction(['USRS']).objectStore('USRS').get(1);
    request.onsuccess = (e) => {
      console.log(request.result);
    };
    request.onerror = (e) => {
      console.log(e);
    };
  }
  function addUsr() {
    const request = db
      .transaction(['USRS'], 'readwrite')
      .objectStore('USRS')
      .add({
        name: '李四',
        gender: '女',
        major: '电子商务',
      });
    request.onsuccess = (e) => {
      console.log('Add success!');
    };
    request.onerror = (e) => {
      console.log(e);
    };
  }
})();
