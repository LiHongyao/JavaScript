/*
 * @Author: Lee
 * @Date: 2023-05-06 17:17:18
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-06 17:24:29
 * @Description:
 */

// 1.创建一个被观察者（Subject）对象，它包含一个观察者（Observer）列表和一些方法来添加、删除和通知观察者。
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
  notifyObservers(data) {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

// 2.创建一个观察者对象，它包含一个 update 方法，用于接收来自被观察者的通知。
class Observer {
  constructor() {}
  update(data) {
    console.log(`Received data:${data}`);
  }
}

// 3.创建一个被观察者实例和多个观察者实例，并将观察者添加到被观察者的观察者列表中。
const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);

// 4.调用被观察者的 notifyObservers 方法，通知所有观察者更新。
subject.notifyObservers(JSON.stringify({ message: 'Hello' }));
