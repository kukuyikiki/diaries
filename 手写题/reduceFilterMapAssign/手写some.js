Array.prototype.mySome = function (fn, thisValue) {
  if (typeof fn !== 'function') {
      throw new Error(`${fn} 不是一个函数`)
  }
  if ([null, undefined].includes(this)) {
      throw new Error(`this 是null 或者 undefined`)
  }
  const arr = Object(this)
  let flag = false
  for (let i = 0; i < arr.length; i++) {
      const res = fn.call(thisValue, arr[i], i, arr)
      if (res) {
          return true
      }
  }
  return flag
}


// foreach
// 使用抛出异常的方式来中断
// const arr = [1, 2, 3]
// try {
//   arr.forEach(item => {
//     if (item === 2) {
//       throw new Error('跳出 forEach')
//     } else {
//       console.log(item)
//     }
//   })
// } catch (err) {
//   console.log(err)
// }
