let compose = function(...args) {
  const init = args.pop()
  return function(...arg) {
    return args.reverse().reduce(function(sequence, func) {
      return sequence.then(function() {
        return func()
      })
    }, Promise.resolve(init.apply(null, arg)))
  }
}

let a = async() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('xhr1')
      resolve('xhr1')
    }, 5000)
  })
}

let b = async() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('xhr2')
      resolve('xhr2')
    }, 3000)
  })
}
let steps = [a, b] // 从右向左执行
let composeFn = compose(...steps)

composeFn().then(res => { console.log(666) })

// xhr2
// xhr1
// 666

// let compose = function(...args) {
//   let init = args.pop()
//   return function(...arg) {
//     return args.reverse().reduce((pre, func) => {
//       return pre.then((res) => {
//         return func.call(null, res)
//       })
//     }, Promise.resolve(init.apply(null, arg)))
//   }
// }

function compose(...args) {
  let init = args.pop()
  return function(...arg) {
    return args.reverse().reduce((pre, cur) => {
      return pre.then(() => {
        return cur()
      })
    }, Promise.resolve(init.apply(null, arg)))
  }
}