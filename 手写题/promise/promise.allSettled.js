Promise.myAllSettled = (promises) => {
  return new Promise((rs, rj) => {
    let count = 0
    let result = []
    const len = promises.length
    // 数组是空的话，直接返回空数据
    if (len === 0) {
      return rs([])
    }

    promises.forEach((p, i) => {
      Promise.resolve(p).then((res) => {
        count += 1
        // 成功属性设置 
        result[ i ] = {
          status: 'fulfilled',
          value: res
        }
        
        if (count === len) {
          rs(result)
        }
      }).catch((err) => {
        count += 1
        // 失败属性设置 
        result[i] = { 
          status: 'rejected', 
          reason: err 
        }

        if (count === len) {
          rs(result)
        }
      })
    })
  })
}

Promise.myAllSettled = function(promises) {
  return new Promise((resolve, reject) => {
    let count = 0
    let result = []
    let len = promises.length
    promises.forEach((p,i) => {
      Promise.resolve(p).then((res) => {
        count += 1
        result[i] = {
          state : 'fulfilled',
          value : res
        }
        if (count === len) {
          resolve(result)
        }
      }).catch(e => {
        count += 1
        result[i] = {
          state: 'rejected',
          reason: e
        }
        if (len === count) {
          reject(result)
        }
      })
    });
  })
}