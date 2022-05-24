// /**
//  * @param {string} s
//  * @return {string}
//  */
// var replaceSpace = function(s) {
//   let tem = []
//   tem = s.split(" ")
//   let len = tem.length - 1
//   let res = tem.map((temp, index) => {
//     if (index === len) {
//       return temp
//     }
//     return temp + "%20"
//   }).join("")

//   return res
// };

/**
 * Q3: 实现一个异步任务执行器 AsyncWorker
 *
 * 此 AsyncWorker: 最多只能同时执行 capacity
 * 个异步任务. 若正在执行的任务数达到 capacity,
 * 则新加入的任务需要等待其中一个正在执行的任务完
 * 成后才能被执行.
 */
class AsyncWorker {
  constructor(capacity) {
    this.capacity = capacity;
    this.queue = []
    this.cur = 0
  }
  async exec(task) {
    // show me the code, please delete the following line.
    if (this.cur >= this.capacity) {
      await new Promise(resolve => {
        return this.queue.push(resolve)
      })
    }
    return this.hander(task)
  }

  async hander(task) {
    this.cur++; // {5}
    try {
      return await task();
    } catch (err) {
      return Promise.reject(err);
    } finally {
      this.cur--;
      if (this.queue.length) { // 每完成一个就从阻塞队列里剔除一个
        this.queue[0](); // 将最先进入阻塞队列的 Promise 从 Pending 变为 Fulfilled
        this.queue.shift();
      }
    }
  }
}

async function testAsyncWorker() {
  const start = Date.now();
  const createTask = (timeout, error) => {
    return () => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (error) {
          reject(error);
        }
        else {
          resolve(timeout);
        }
      }, timeout);
    });
  };
  const worker = new AsyncWorker(2);
  const tasks = [
    { status: 'fulfilled', value: 100, idealCost: 100, task: worker.exec(createTask(100)) },
    { status: 'fulfilled', value: 201, idealCost: 200, task: worker.exec(createTask(201)) },
    { status: 'rejected', reason: 'REJECTED', idealCost: 300, task: worker.exec(createTask(202, 'REJECTED')) },
    { status: 'fulfilled', value: 203, idealCost: 400, task: worker.exec(createTask(203)) },
    { status: 'fulfilled', value: 300, idealCost: 600, task: worker.exec(createTask(300)) },
  ];
  // show me bug does not support for of tasks.entries()
  for (let index = 0; index < tasks.length; index++) {
    const t = tasks[index];
    let result;
    try {
      const value = await t.task;
      result = { status: 'fulfilled', value };
    }
    catch (e) {
      result = { status: 'rejected', reason: e };
    }
    const realCost = Date.now() - start;
    const idealCost = (realCost - (realCost % 100)) | 0;
    if (idealCost !== t.idealCost) {
      throw new Error(`unexpected time cost: ${idealCost}, expected is ${t.idealCost} for ${index}`);
    }
    if (result.status !== t.status) {
      throw new Error(`unexpected status ${result.status} for ${index}`);
    }
    if (t.status === 'fulfilled' && result.status === 'fulfilled' && result.value !== t.value) {
      throw new Error(`unexpected fulfilled value ${result.value}, expected is ${t.value} for ${index}`);
    }
    if (t.status === 'rejected' && result.status === 'rejected' && result.reason !== t.reason) {
      throw new Error(`unexpected rejected reason ${result.reason}, expected is ${t.reason} for ${index}`);
    }
  }
}
testAsyncWorker()