// function flatten(arr) {  
//     return arr.reduce((result, item)=> {
//         return result.concat(Array.isArray(item) ? flatten(item) : item);
//     }, []);
// }

// let arr = [1, [2, 3, [4, 5]]]
// flatten(arr)

// // 扁平化 split
// function flatten(arr) {
//   return arr.toString().split(',').map((item) => {
//     return Number(item)
//   })
// }

// function flatten(arr) {
//   return arr.join(',').split(',').map(function(item) {
//       return parseInt(item);
//   })
// }

// function flatten(arr) {
//   var res = [];
//   arr.map(item => {
//       if(Array.isArray(item)) {
//           res = res.concat(flatten(item));
//       } else {
//           res.push(item);
//       }
//   });
//   return res;
// }

// function flatten(arr) {
//   if(arr.some(item=>Array.isArray(item))) {
//       arr = [].concat(...arr);
//   }
//   return arr;
// }

// 扁平化对象
function falt(obj) {
  const res = {}
  const change = function(key, value) {
    if (!value) {
      return
    }
    if (typeof value !== 'object') {
      res[key] = value
    } else {
      if (Array.isArray(value)) {
        for (let i = 0, len = value.length; i < len; i++) {
          change(`${key}[${i}]`, value[i])
        }
      } else {
        for (const temp in value) {
          change(`${key}.${temp}`, value[temp])
        }
      }
    }
  }
  change('', obj)
  return res
}
const obj = {
  a: 1,
  b: [1, 2, { c: true }],
  c: { e: 2, f: 3 },
  g: null,
};
falt(obj)

// function objFlat(obj) {
//   if (typeof obj != 'object') {
//     return {}
//   }
//   const my = {}
//   const toFlat = function(key, value) {
//     if (!value) {
//       return
//     }

//     if (typeof value !== 'object') {
//       my[key] = value
//     } else if (Array.isArray(value)) {
//       for (let [item, index] of temp) {
//         toFlat(`${key}[${index}]`, item)
//       }
//     } else {
//       for (const item in object) {
//         toFlat(`${key}.${item}`, value[item])
//       }
//     }
//   }
//   toFlat('', obj)
// }
// try {
//   throw 'a'
// } catch(e) {
//   throw 'b'
// } finally {
//   throw 'c'
// }
// throw 'd'

// function foo(n) {
//   console.log('1')
//   if (n < 2) {
//     return
//   }
//   else foo(n - 3) + foo(n - 2) + 1
// }
// foo(9)

// let foo = function() {
//   let i = 0
//   return function() {
//     console.log(i++)
//   }
// }
// let f1 = foo()
// let f2 = foo()
// f1()
// f2()
// f1()


// 打印json中所有叶子节点的路径
function aa(obj) {
  const res = []
  const change = function(key, value) {
    if (!value) {
      return
    }
    if (typeof value !== 'object') {
      if (key[0] === '.') {
        key = key.slice(1)
      }
      res.push(`${key}.${value}`)
    } else {
      if (Array.isArray(value)) {
        for (let arrItem of value) {
          change(`${key}.list`, arrItem)
        }
      } else {
        for (let objKey in value) {
          change(`${key}.${objKey}`, value[objKey])
        }
      }
    }
  }
  change('', obj)
  return res
}


const _str = {
  "a":[
    {"b": "b1"},
    {"c": "c1"}
  ],
  "d": {
    "e": "e1"
  }
}
aa(_str)

let a = [1,2,3]
let b = a.slice()
console.log(a, b)

let nn = {
  aa1 : function(obj) {
    const res = []
    let bbbe = null
    const change = function(key, value) {
      if (!value) {
        return
      }
      if (typeof value !== 'object') {
        if (key[0] === '.') {
          key = key.slice(1)
        }
        res.push(`${key}.${value}`)
      } else {
        if (Array.isArray(value)) {
          for (let arrItem of value) {
            change(`${key}.list`, arrItem)
          }
        } else {
          for (let objKey in value) {
            change(`${key}.${objKey}`, value[objKey])
          }
        }
      }
    }
    change('', obj)
    return res
  },
  aa2 : null
}
console.log(JSON.stringify(nn))

// 指定深度
function deepFlatByFor(arr, depth = Infinity) {
  const res = []

  for (let i = 0; i < arr.length; i++) {
    Array.isArray(arr[i]) && depth > 0
      ? res.push(...deepFlatByFor(arr[i], depth - 1))
      : res.push(arr[i])
  }

  return res
}

console.log(deepFlatByFor(sourceData)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(deepFlatByFor(sourceData, 2)) // [1, 2, 3, 4, 5, [6, 7, 8, [9, 10]]]