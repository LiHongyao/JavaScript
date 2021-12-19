/*
 * @Author: Lee
 * @Date: 2021-12-19 13:12:56
 * @LastEditors: Lee
 * @LastEditTime: 2021-12-19 13:18:52
 */
class vIndexedDB {
  private static instance: vIndexedDB;
  private constructor() {}
  public static getInstance() {
    if (!vIndexedDB.instance) {
      vIndexedDB.instance = new vIndexedDB();
    }

    return vIndexedDB.instance;
  }

  someMethod() {}
}






