class EventBus {
  constructor() {
    this.eventMap = new Map(); // 用于存储所有订阅事件
    this.callbcakId = 0; // 每个函数的ID
  }
  $on(name, callbcak) {
    if (!this.eventMap.get(name)) {
      this.eventMap.set(name, {})
    }
    const eventList = this.eventMap.get(name)

    const id = this.callbcakId++;
    eventList[id] = callbcak; // 以键值对的形式存储回调函数
    return id; // 将id返回出去，可以利用该id取消订阅
  }

  $emit(name, ...args) {

    const eventList = this.eventMap.get(name)

    for (const id in eventList) {
      eventList[id](...args);

      if(id.indexOf('D') !== -1) {
        delete eventList[id];
      }
    }
  }

  $off(name, id) {
    const eventList = this.eventMap.get(name)

    delete eventList[id];
    console.info(`${id}id事件已被取消订阅`)

    if (!Object.keys(eventList).length) {
      this.eventMap.delete(name);
    }
  }

  $once(name, callbcak){
    if (this.eventMap.get(name)) {
      this.eventMap.set(name, {})
    }

    const eventList = this.eventMap.get(name)
    const id = "D" + this.callbcakId++;
    eventList[id] = callbcak; // 以键值对的形式存储回调函数
    return id; // 将id返回出去，可以利用该id取消订阅
  }
}

let EB = new EventBus();


// 订阅事件
EB.$on('key1', (name, age) => {
  console.info("我是订阅事件A:", name, age);
})
EB.$once("key1", (name, age) => {
  console.info("我是订阅事件B:", name, age);
})
EB.$on("key2", (name) => {
  console.info("我是订阅事件C:", name);
})


// 发布事件key1
EB.$emit('key1', "小猪课堂", 26);
console.info("在触发一次key1")
EB.$emit('key1', "小猪课堂", 26);
// 发布事件
EB.$emit('key2', "小猪课堂");
