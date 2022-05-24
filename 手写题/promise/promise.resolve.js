Promise.myResolve = function (value) {
  // 是Promise实例，直接返回即可
  if (value && typeof value === 'object' && (value instanceof Promise)) {
    return value
  }
  // 否则其他情况一律再通过Promise包装一下 
  return new Promise((resolve) => {
    resolve(value)
  })
}

Promise.myResolve(1).then(console.log)  // 1
// promise的then中只能是函数，遇到console.log promise会自动传参

async function funa() {
  const a = await Promise.resolve(1)
  const b = await funb()
  const c = await func()
  const d = await Promise.reject(1).catch(res => res)
  console.log(a === b)
  console.log(a === c)
  console.log(a === d)
}
async function funb() {
  return 1
}
function func() {
  return 1
}
funa()

for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i),0)
}

function getCommon(arr1, arr2) {
  if (!arr1 instanceof Array || !arr2 instanceof Array) {
      return arr1
  }
  const tempArr = arr2.slice()
  const len2 = arr2.length
  const ans = []
  let arr = new Array(len2).fill(0)
  for (let i = 0; i < len2; i++) {
      let index = tempArr.indexOf(arr1[i])
      if (index != -1) {
          if (arr[index]) {
              continue
          }
          ans.push(arr1[i])
          arr[index] = 1
          tempArr[index] = Infinity
          console.log(ans, arr, index)
      }
  }
  return ans
}

getCommon([1,2,1,2], [3,1,1,2])

new Promise((resolve) => {
  resolve(1)
  Promise.resolve().then(() => {
    console.log(2);
  })
  console.log('11')
}).then(t => {
  console.log(t);
})

console.log(Object.prototype.toString.call([1,2,3]) === '[object Array]')