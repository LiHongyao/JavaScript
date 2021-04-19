/*
 * @Author: Li-HONGYAO
 * @Date: 2021-04-19 17:15:11
 * @LastEditTime: 2021-04-19 18:24:43
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \01.IndexDB\utils.js
 */
/**
 * 获取数据库
 * @param {*} databaseName 数据库名称
 * @param {*} version  数据库版本
 * @returns
 */
function openDB(databaseName, version) {
  return new Promise((resolve, reject) => {
    const DBOpenRequest = window.indexedDB.open(databaseName, version);
    // 打开异常
    DBOpenRequest.onerror = (e) => {
      reject(e);
    };
    // 打开成功
    DBOpenRequest.onsuccess = (e) => {
      console.log("Success!");
      resolve(DBOpenRequest.result);
    };
    // 数据库升级事件
    DBOpenRequest.onupgradeneeded = (e) => {
      console.log("Upgrading...");
      // 新建对象仓库
      let db = e.target.result;
      let objStore;
      if (!db.objectStoreNames.contains("USRS")) {
        // 创建USRS对象仓库/主键为自增整数
        // 如果需要指定值为主键，则可以设置：{keyPath: "键" }
        objStore = db.createObjectStore("USRS", { autoIncrement: "id" });
        // 创建索引
        objStore.createIndex("name", "name", { unique: false });
        objStore.createIndex("gender", "gender", { unique: false });
        objStore.createIndex("age", "age", { unique: false });
        objStore.createIndex("phone", "phone", { unique: true });
        objStore.createIndex("address", "address", { unique: false });
      }
    };
  });
}

function deleteDB(databaseName) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.deleteDatabase(databaseName);
    request.onerror = (e) => {
      reject(e);
    };
    request.onsuccess = (e) => {
      console.log(`Delete ${databaseName} DB success!`);
    };
  });
}
