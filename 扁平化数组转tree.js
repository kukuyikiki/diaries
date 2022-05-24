// let arr = [
//   {id: 1, pid: 0},
//   {id: 2, pid: 1},
//   {id: 3, pid: 2},
//   {id: 4, pid: 3},
//   {id: 5, pid: 4}
// ]

// const obj = {}
// const myTree = {}
// for (const i in arr) {
//   obj[arr[i].id] = arr[i]
// }

// // obj = {
// //   1: {id: 1, pid: 0},
// //   2: {id: 2, pid: 1},
// //   3: {id: 3, pid: 2},
// //   4: {id: 4, pid: 3},
// //   5: {id: 5, pid: 4}
// // }

// for (const i in obj) {
//   let item = obj[i]
//   if (obj[item['pid']]) {
//     if (obj[item['pid']].children) {
//       obj[item['pid']].children.push(obj[i])
//     } else {
//       obj[item['pid']].children = [obj[i]]
//     }
//   } else {
//     root = obj[id]
//   }
// }


// let arr = [
//   {id: 1, pid: 0},
//   {id: 2, pid: 1},
//   {id: 3, pid: 2},
//   {id: 4, pid: 3},
//   {id: 5, pid: 4},
//   {id:10, pid:11}
// ]

// const obj = {}
// const myTree = {}
// for (const i in arr) {
//   obj[arr[i].id] = arr[i]
// }

// // obj = {
// //   1: {id: 1, pid: 0},
// //   2: {id: 2, pid: 1},
// //   3: {id: 3, pid: 2},
// //   4: {id: 4, pid: 3},
// //   5: {id: 5, pid: 4}
// // }

// for (const i in obj) {
//   let item = obj[i]
//   if (obj[item['pid']]) {
//     if (obj[item['pid']].children) {
//       obj[item['pid']].children.push(obj[i])
//     } else {
//       obj[item['pid']].children = [obj[i]]
//     }
//   } else {
//     myTree[i] = obj[i]
//   }
// }
// console.log(myTree)

let arr = [
  {id: 1, pid: 0},
  {id: 2, pid: 1},
  {id: 3, pid: 2},
  {id: 4, pid: 3},
  {id: 5, pid: 4},
  {id:10, pid:11}
]

const obj = {}
const myTree = {}
for (let i in arr) {
  obj[arr[i].id] = arr[i]
}
console.log(obj, 'obj')
for (let i in obj) {
  let item = obj[i]
  if (obj[item.pid]) {
    if (obj[item.pid].children) {
      obj[item.pid].children.push(item)
    } else {
      obj[item.pid].children = [item]
    }
  } else {
    myTree[i] = obj[i]
  }
}
console.log(myTree)

const func = async ()=>{
  console.log('hello');
  await pause(1000); // 暂停1秒
  console.log('world');
}
async function pause(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}
func()