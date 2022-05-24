// 手写filter
Array.prototype.myFilter = function(fn, context) {
  if (typeof fn != 'function') {
    throw new TypeError(`${fn} is not a function`)
  }
  let arr = this
  let reuslt = []
  for (let i = 0; i < arr.length; i++) {
    let temp = fn.call(context, arr[i], i, arr)
    if (temp) {
      reuslt.push(arr[i])
    }
  }
  return reuslt
}
let a = [5, 4 , 3, 2, 1]
let b = a.myFilter((item, i, arr) => {
  console.log(item, i, arr, 'arr')
  return item === 3
})
console.log(a, b)

// 手写reduce
Array.prototype.myReduce = function(fn, initialValue) {
  if (typeof fn != 'function') {
    throw new TypeError(`${fn} is not a function`)
  }

  let arr = this
  let result = initialValue || arr[0]

  for (let i = initialValue ? 0 : 1; i < arr.length; i++) {
    result = fn(result, arr[i], i. arr)
  }
  return result
}

let ab = [5, 4 , 3, 2, 1]
ab.myReduce((pre, item, i, arr) => {
  return pre + item
}, 0)
