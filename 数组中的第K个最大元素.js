// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number}
//  */
// var findKthLargest = function(nums, k) {
//   if (nums.length === 0) {
//     return 
//   }

//   // if (nums.length === 1) {
//   //   return nums[0]
//   // }
//   nums.sort((a, b) => {
//     return a - b
//   })
//   if (-k + 1 === 0) {
//     return nums.slice(-k)
//   } else {
//     return nums.slice(-k, -k+1)
//   }
// };

// let obj1 = JSON.parse(read_line())
// let obj2 = JSON.parse(read_line())
// if (Object.prototype.toString.call(obj1) !== Object.prototype.toString.call(obj2))

// function aaa (obj1, obj2) {
//   for (let key in obj1) {
//     if (obj2[key]) {
//         obj1[key] = [obj1[key]]
//         obj1[key].push(obj2[key])
        
//         delete obj2[key]
//         console.log(obj1[key], 'obj1[key]')
//         console.log(obj2[key], 'obj2[key]')
//     }
// }
// let ans = Object.assign(obj1, obj2)
// console.log(JSON.stringify(ans))
// }

// let obj1 = {a : 1}
// let obj2 = {a: 2}
// aaa(obj1, obj2)



function bbb(str1, str2) {
  let line = str1.split(' ')
  let arr1 = line[0].split('-').concat(line[1].split(':'))

  let arr = str2.split(' ')
  const len = arr.length
  let map = {
      w: 8,
      d: 2,
      h: 3,
      m: 4,
      s: 5
  }
  for (let i = 0; i < len; i++) {
      const tempLen = arr[i].length
      if (map[arr[i][tempLen - 1]] !== 8) {
          let temp = parseInt(arr1[map[arr[i][tempLen - 1]]])
          arr1[map[arr[i][tempLen - 1]]] = parseInt(temp) + parseInt(arr[i].slice(0, tempLen - 1))
      }
  }
  let ans1 = arr1.slice(0, 3)
  let ans2 = arr1.slice(3, 6)
  console.log(ans1.join('-') + ' ' + ans2.join(':'))
}
bbb('2021-09-13 00:00:00', '+5d')