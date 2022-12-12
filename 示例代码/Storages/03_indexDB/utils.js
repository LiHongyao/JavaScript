/*
 * @Author: Li-HONGYAO
 * @Date: 2021-04-19 17:15:11
 * @LastEditTime: 2022-12-06 15:58:59
 * @LastEditors: Lee
 * @Description:
 * @FilePath: \01.IndexDB\utils.js
 */

class DB {
  /**
   * 构造器
   * @param {string} databaseName 数据库名
   * @param {number} version 数据库版本号（仅支持整数）
   * @param {object} storeOptions 配置项 { 表名：主键 }
   */
  constructor(databaseName, version, storeOptions) {
    // 缓存数据库 { [name + version]：database }
    this._dbs = {};
    this._databaseName = databaseName;
    this.open(databaseName, version, storeOptions);
  }

  /**
   * 打开数据库
   * @param {string} databaseName 数据库名
   * @param {number} version 数据库版本号（仅支持整数）
   * @param {object} storeOptions 配置项
   */
  open(databaseName, version, storeOptions) {
    return new Promise((resolve, reject) => {
      // -- 检测是否有缓存，如果有缓存则直接从缓存中读取数据库
      if (this._dbs[databaseName + version]) {
        resolve(this._dbs[databaseName + version]);
        return;
      }
      // -- 打开数据库
      const request = indexedDB.open(databaseName, version);
      // -- 事件监听：版本更新，创建新的store的时候
      request.onupgradeneeded = (event) => {
        console.log('【Indexed-DB】：Upgrading...');
        // IDBDatabase
        const database = event.target.result;
        // 缓存起来
        this._dbs[databaseName + version] = database;
        // 遍历仓库配置项
        for (const key in storeOptions) {
          // 判断是否存在仓库（表），不存在则新建
          if (database.objectStoreNames.contains(key) === false) {
            const keyPath = storeOptions[key] ? storeOptions[key] : [];
            database.createObjectStore(key, { keyPath });
          }
        }
        resolve(database);
      };
      // -- 事件监听：数据库打开成功的回调
      request.onsuccess = (event) => {
        console.log('【Indexed-DB】：open success.');
        // IDBDatabase
        const database = event.target.result;
        // 缓存起来
        this._dbs[databaseName + version] = database;
        resolve(database);
      };
      // -- 事件监听：数据库打开失败的回调
      request.onerror = (event) => {
        reject(event);
        console.error('【Indexed-DB】：', event);
      };
    });
  }

  /**
   * 获取事务
   * @param {*} storeName
   * @param {*} version
   * @returns
   */
  async _getTransaction(storeName, version) {
    let db;
    // 先从缓存获取
    if (this._dbs[this._databaseName + version]) {
      db = this._dbs[this._databaseName + version];
    } else {
      db = await this.open(this._databaseName, version);
    }
    return db.transaction([storeName], 'readwrite');
  }

  /**
   * 获取store
   * objectStore: 表示允许访问IndexedDB数据库中的一组数据的对象存储，
   * @param {*} storeName
   * @param {*} version
   */
  async _getObjectStore(storeName, version) {
    const transaction = await this._getTransaction(storeName, version);
    return transaction.objectStore(storeName);
  }

  /**
   * 获取一个store
   */
  collection(storeName, version) {
    this.currentStore = storeName;
    this._getObjectStore(storeName, version);
    return this;
  }

  /**
   * 查询数据
   * @param {string | number} id
   * @returns
   */
  async get(id) {
    return new Promise(async (resolve, reject) => {
      const objectStore = await this._getObjectStore(this.currentStore);
      const request = objectStore.get(id);
      request.onsuccess = function (event) {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }
  /**
   * 添加数据
   * @param {object} data
   * @returns
   */
  async add(data) {
    return new Promise(async (resolve, reject) => {
      const objectStore = await this._getObjectStore(this.currentStore, 3);
      const request = objectStore.add(data);
      request.onsuccess = function (event) {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }
  /**
   * 删除数据
   * @param {string | number} id
   * @returns
   */
  async delete(id) {
    return new Promise(async (resolve, reject) => {
      const objectStore = await this._getObjectStore(this.currentStore);
      const request = objectStore.delete(id);
      request.onsuccess = function (event) {
        resolve(true);
      };
      request.onerror = (event) => {
        console.log('【Indexed-DB】：', event);
        reject(false);
      };
    });
  }
  /**
   * 更新数据
   * 数据不存在，则会新增数据
   * @param {*} data
   * @returns
   */
  async put(data) {
    console.log('Put...');
    return new Promise(async (resolve, reject) => {
      const objectStore = await this._getObjectStore(this.currentStore);
      const request = objectStore.put(data);
      request.onsuccess = function (event) {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  async clear(storeName) {
    return new Promise((resolve, reject) => {
      this._getObjectStore(this.currentStore).then((objectStore) => {
        const request = objectStore.clear(data);
        request.onsuccess = function (event) {
          resolve(event.target.result);
        };
        request.onerror = (event) => {
          reject(event);
        };
      });
    });
  }
  /**
   * 遍历数据
   * @returns
   */
  async each() {
    return new Promise(async (resolve, reject) => {
      const objectStore = await this._getObjectStore(this.currentStore);
      const request = objectStore.openCursor();
      const resp = [];
      request.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          resp.push(cursor.value);
          cursor.continue();
        } else {
          resolve(resp);
        }
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }
}
