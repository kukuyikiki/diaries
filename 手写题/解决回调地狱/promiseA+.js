const PENDING = 'pending'; //初始值，不是fulfilled，也不是rejected
const RESOLVED = 'resolved'; //代表操作成功
const REJECTED = 'rejected'; //代表操作失败

function MyPromise(fn) {
  // 因为代码可能异步，保存this对象
  let that = this;
  that.state = PENDING;
  that.value = null;
  that.resolvedCallBacks = [];
  that.rejectedCallBacks = [];

  // 首先两个函数都得判断当前状态是否为等待中，因为规范规定只有等待态才可以改变状态
  // 将当前状态更改为对应状态，并且将传入的值赋值给 value
  // 遍历回调数组并执行

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (that.state == PENDING) {
        that.state = RESOLVED;
        that.value = value;
        that.resolvedCallBacks.map((cb) => cb(that.value));
      }
    }, 0);
  }

  function reject(value) {
    setTimeout(() => {
      if (that.state == PENDING) {
        that.state = REJECTED;
        that.value = value;
        that.rejectedCallBacks.map((cb) => cb(that.value));
      }
    });
  }

  // 实现很简单，执行传入的参数并且将之前两个函数当做参数传进去
  // 要注意的是，可能执行函数过程中会遇到错误，需要捕获错误并且执行 reject 函数
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this;

  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  // 当参数不是函数类型时，需要创建一个函数赋值给对应的参数，同时也实现了透传
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (r) => {
          throw r;
        };
  // 接下来就是一系列判断状态的逻辑，当状态不是等待态时，就去执行相对应的函数。
  // 如果状态是等待态的话，就往回调函数中 push 函数
  if (that.state === PENDING) {
    return (promise2 = new MyPromise((resolve, reject) => {
      that.resolvedCallbacks.push(() => {
        try {
          const x = onFulfilled(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });

      that.rejectedCallbacks.push(() => {
        try {
          const x = onRejected(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
    }));
  }
  if (that.state === RESOLVED) {
    return (promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }
  if (that.state === REJECTED) {
    return (promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onRejected(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }
};

//调用  参考eventLoop 执行机制
let a = new myPromise((resolve, reject) => {
  // 异步宏任务 最后执行
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve('成功');
    } else {
      reject('傻哎');
    }
  }, 2000);
});
// Promise.then是微任务 但在这里手动实现 是一个同步任务  这里会将处理函数压入 reject 和resolve 状态数组中
a.then((ok) => {
  console.log(ok);
});
