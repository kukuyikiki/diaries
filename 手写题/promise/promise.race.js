Promise.myRace = (promises) => {
  return new Promise((rs, rj) => {
    for(let i = 0, len = promises.length; i < len; i++) {
      // 对p进行一次包装，防止非Promise对象
      // 并且对齐进行监听，将我们自己返回的Promise的resolve，reject传递给p，哪个先改变状态，我们返回的Promise也将会是什么状态
      Promise.resolve(promises[i]).then(rs).catch(rj)
    }
  })
}

// 测试一下
const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 1)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 2)
})

myPromiseRace([p1, p2]).then((value) => {
  console.log(value) // 2
})

myPromiseRace([p1, p2, 3]).then((value) => {
  console.log(value) // 3
})

function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise).then((res) => resolve(res)).catch((e) => reject(e))
    });
  })
}



function curry(fn, args) {
  // 获取函数需要的参数长度
  let length = fn.length;

  args = args || [];

  return function() {
    let subArgs = args.slice(0);

    // 拼接得到现有的所有参数
    for (let i = 0; i < arguments.length; i++) {
      subArgs.push(arguments[i]);
    }

    // 判断参数的长度是否已经满足函数所需参数的长度
    if (subArgs.length >= length) {
      // 如果满足，执行函数
      return fn.apply(this, subArgs);
    } else {
      // 如果不满足，递归返回科里化的函数，等待参数的传入
      return curry.call(this, fn, subArgs);
    }
  };
}

function add(a, b, c) {
  console.log(a + b + c)
}

let curried = curry(add)
curried(1)(2)(3)

function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}
