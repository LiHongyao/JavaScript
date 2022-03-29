/*
 * @Author: Li-HONGYAO
 * @Date: 2021-04-19 17:15:11
 * @LastEditTime: 2021-12-18 22:51:45
 * @LastEditors: Lee
 * @Description:
 * @FilePath: \01.IndexDB\utils.js
 */

class IndexedDB {
  constructor(databaseName, version) {}
}

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
      console.log(e);
      reject(e);
    };
    // 打开成功
    DBOpenRequest.onsuccess = (e) => {
      console.log('success');
      resolve(DBOpenRequest.result);
    };
    // 数据库升级事件，如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件
    DBOpenRequest.onupgradeneeded = (e) => {
      console.log('Upgrading...');
      let db = e.target.result;
      // 新建对象仓库（用户表）
      if (!db.objectStoreNames.contains('USRS')) {
        // 创建USRS对象仓库/主键为自增整数
        // 如果需要指定值为主键，则可以设置：{keyPath: "键" }
        let objStore = db.createObjectStore('USRS', {
          keyPath: 'id',
          autoIncrement: 'id',
        });
        // 创建索引，语法形式：objStore.createIndex(名称, 索引, 配置对象)
        objStore.createIndex('索引', 'id', { unique: true });
        objStore.createIndex('姓名', 'name', { unique: false });
        objStore.createIndex('性别', 'gender', { unique: false });
        objStore.createIndex('专业', 'major', { unique: false });
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
