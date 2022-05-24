// 碰到循环引用会栈溢出
function deepClone(obj) {
  let newObj = obj instanceof Array ? [] : {}
  for (let item in obj) { // 数组返回 1 2 3   对象返回 key
    let temp = typeof obj[item] == 'object' ? deepClone(obj[item]) : obj[item]
    newObj[item] = temp
  }
  return newObj
}

// 改进版
function deepGreaterClone(obj) {
  const map = new WeakMap()
  map.set(obj, true)
  const copy = (obj) => {
    if (!obj || typeof obj !== 'object') {
      return {}
    }
  
    const newObj = obj instanceof Array ? [] : {}
    for (const key in obj) {
      const value = obj[key]
      if (typeof value !== 'object') {
        newObj[key] = value
      } else {
        if (map.has(value)) {
          newObj[key] = null
        } else {
          map.set(value, true)
          newObj[key] = copy(value)
        }
      }
    }
    return newObj
  }
  return copy(obj)
}

const obj2 = {
  a: {
    b: {
      c: {
        d: {
          e: {
            zeze: '1'
          }
        }
      }
    }
  },
  f: {
    bb: '5'
  },
  g: {
    h: {
      i: {
        jj: '6'
      }
    }
  }
}

deepGreaterClone(obj2)

// 比较深度
function orderBig(obj1, obj2) {
  const deep1 = deepGreaterClone(obj1)
  const deep2 = deepGreaterClone(obj2)
  console.log(deep1, deep2)
}

function deepGreaterClone(obj) {
  const map = new WeakMap()
  map.set(obj, true)
  const copy = (obj) => {
    if (!obj || typeof obj !== 'object') {
      return {}
    }
  
    const newObj = obj instanceof Array ? [] : {}
    for (const key in obj) {
      const value = obj[key]
      if (typeof value !== 'object') {
        newObj[key] = value
      } else {
        if (map.has(value)) {
          newObj[key] = null
        } else {
          map.set(value, true)
          newObj[key] = copy(value)
        }
      }
    }
    return max
  }
  return copy(obj)
}