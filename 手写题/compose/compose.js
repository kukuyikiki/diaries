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


class Observe {
  constructor(value) {
    // dep实例
    if (Array.isArray(value)) {
      // Object.setPrototypeOf(value, )
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  walk(value) {
    for (let key in value) {
      defineReactive(value, key)
    }
  }

  observeArray(value) {
    for (let i = 0, len = value.length; i < len; i++) {
      observe(arr[i])
    }
  }
}

function observe(value) {
  if (typeof value !== 'object') {
    return
  }
  var ob = new Observe(value)
  return ob
}

function defineReactive(data, key, value) {
  if (arguments.length === 2) {
    value = data[key]
  }
  let childOb = observe(value)

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log()
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set(newValue) {
      console.log()
      if (val === newValue) {
        return
      }
      val = newValue
      childOb = observe(newValue)
      dep.notify()
    }
  })
}