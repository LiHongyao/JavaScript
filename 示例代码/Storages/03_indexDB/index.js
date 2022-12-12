/*
 * @Author: Li-HONGYAO
 * @Date: 2021-04-19 17:00:50
 * @LastEditTime: 2022-12-06 15:44:58
 * @LastEditors: Lee
 * @Description:
 * @FilePath: \01.IndexDB\index.js
 */

// -- DOMs
const _name = document.querySelector('#name');
const _age = document.querySelector('#age');
const _job = document.querySelector('#job');
const _city = document.querySelector('#city');
const _tips = document.querySelector('#tips');
const _flag = document.querySelector('#flag');

const version = 3;
// -- 打开数据库并开始一个事务
// open -> transaction -> objectStore
// -- 创建数据库、store(仓库/表)
const db = new DB('db-learns', version, { students: 'id' });
// -- 获取仓库
const store = db.collection('students', version);

// -- 新增数据
async function onAdd() {
  if (!_name.value || !_age.value || !_job.value || !_city.value) {
    _tips.textContent = '温馨提示：请完善信息';
    return;
  }
  const id = await store.add({
    id: Date.now().toString(),
    name: _name.value,
    age: +_age.value,
    job: _job.value,
    city: _city.value,
  });
  console.log(id);
}

async function onDelete() {
  if (!_flag.value) {
    _tips.textContent = '温馨提示：请填写操作标识（ID）';
    return;
  }
  const resp = await store.delete(_flag.value);
  console.log(resp);
}

async function onPut() {
  if (
    !_name.value ||
    !_age.value ||
    !_job.value ||
    !_city.value ||
    !_flag.value
  ) {
    _tips.textContent = '温馨提示：请完善信息';
    return;
  }
  const id = await store.put({
    id: _flag.value,
    name: _name.value,
    age: +_age.value,
    job: _job.value,
    city: _city.value,
  });
  console.log(id);
}

async function onGet() {
  if (!_flag.value) {
    _tips.textContent = '温馨提示：请填写操作标识（ID）';
    return;
  }
  const resp = await store.get(_flag.value);
  console.log(resp);
}

async function onEach() {
  const resp = await store.each();
  console.log(resp);
}
