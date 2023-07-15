/*
 * @Author: Lee
 * @Date: 2023-05-06 17:40:30
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-06 18:04:25
 * @Description:
 */
class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  emit(event, ...args) {
    const listeners = this.listeners[event];
    if (listeners) {
      listeners.forEach((listener) => {
        listener(...args);
      });
    }
  }

  removeListener(event, listenerToRemove) {
    const listeners = this.listeners[event];
    if (listeners) {
      this.listeners[event] = listeners.filter(
        (listener) => listener !== listenerToRemove
      );
    }
  }

  removeAllListeners(event) {
    delete this.listeners[event];
  }
}

const bus = new EventBus();

const listenerFunction = (args) => {
  console.log(args);
};

// 1. 添加一个监听器
bus.on('click', listenerFunction);
// 2. 触发事件
bus.emit('click', 'Hello');
// 3. 删除监听器
bus.removeListener('click', listenerFunction);
// 4. 删除所有监听器
bus.removeAllListeners('click');
