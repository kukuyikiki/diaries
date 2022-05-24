Promise.prototype.all = function(promises) {
  return new Promise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject("Type Error")
    }

    let len = promises.length
    let result = [], count = 0
    for(let i = 0; i < len; i++) {
      let promise = promises[i]
      Promise.resolve(promise).then(res => {
        count++
        result[i] = res
        if (count === len) {
          resolve(res)
        }
      }).catch(e => {
        reject(e)
      })
    }
  })
}