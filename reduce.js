// function flatten(arr) {
//   return arr.reduce((result, item) => {
//     console.log(result, item)
//     return result.concat(Array.isArray(item) ? flatten(item) : item)
//   }, [])
// }
// let arr = [1, [2, 3, [4, 5]]]
// let ans = flatten(arr)
// console.log(arr, ans, 'ans')

function flatten(arr) {
  return arr.toString().split(',').map(function(item) {
    return Number(item)
  })
}

let arr = [1, [2, 3, [4, 5]]]
let ans = flatten(arr)
console.log(arr, ans, 'ans')