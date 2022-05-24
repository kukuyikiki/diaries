function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== "function") {
      reject("Type error")
    }

    let count = 0
    let result = []
    let len = promises.length

    for (let i = 0; i < len; i++) {
      let promise = promises[i]
      Promise.resolve(promise).then(res => {
        count++
        result[i] = res
        if (count === len) {
          resolve(result)
        }
      }).catch(e => {
        reject(e)
      })
    }
  })
}

// 测试一下
const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000)
})
const p3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 3000)
})

const p4 = Promise.reject('err4')
const p5 = Promise.reject('err5')
// 1. 所有的Promise都成功了
const p11 = myPromiseAll([ p1, p2, p3 ])
	.then(console.log) // [ 1, 2, 3 ]
      .catch(console.log)
      
// 2. 有一个Promise失败了
const p12 = myPromiseAll([ p1, p2, p4 ])
	.then(console.log)
      .catch(console.log) // err4
      
// 3. 有两个Promise失败了，可以看到最终输出的是err4，第一个失败的返回值
const p13 = myPromiseAll([ p1, p4, p5 ])
	.then(console.log)
      .catch(console.log) // err4
// 与原生的Promise.all返回是一致的   

let myAll = function(arr) {
  return new Promise((reslove, reject) => {
    if (typeof arr[Symbol.iterator] !== 'function') {
      reject('TypeError')
    }
    const len = arr.length
    const ans = []
    let count = 0
    for (let i = 0; i < len; i++) {
      let temp = arr[i]
      Promise.resolve(temp).then(res => {
        ans[i] = res
        count++
        if (count === len) {
          console.log('11122')
          resolve(ans)
        }
      }).catch(e => {
        console.log('111')
        reject(e)
      })
    }
  })
}

let a = Promise.resolve('1')
let b = Promise.resolve('2')
let c = Promise.reject('e')
myAll([a, b, c]).then(res => {
  console.log(res, '1188');
}).catch(console.log)

function myAll(promises) {
  return new Promise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== 'function') {
      throw new TypeError('not iterator')
    }
    const len = promises.length, ans = []
    let count = 0
    for (let i = 0; i < len; i++) {
      let temp = promises[i]
      Promise.resolve(temp).then(res => {
        ans[count] = res
        count++
        if (count === len) {
          resolve(ans)
        }
      }).catch(e => {
        reject(e)
      })
    }
  })
}