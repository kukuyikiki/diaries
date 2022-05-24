/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 合并到新数组
// var merge = function(nums1, m, nums2, n) {
//   if (m === 0) {
//     return nums2
//   }
//   if (n === 0) {
//     return nums1
//   }

//   let up = 0, down = 0
//   const len1 = m
//   const len2 = n
//   const arr = []
//   while (up < len1 && down < len2) {
//     if (nums1[up] < nums2[down]) {
//       arr.push(nums1[up])
//       up++
//     } else if (nums1[up] >= nums2[down]) {
//       arr.push(nums2[down])
//       down++
//     }
//   }
//   if (up < len1) {
//     for (let i = up; i < len1; i++) {
//       arr.push(nums1[i])
//     }
//   }
//   if (down < len2) {
//     console.log('down')
//     for (let i = down; i < len2; i++) {
//       arr.push(nums2[i])
//     }
//   }
//   return arr
// };
var merge = function(nums1, m, nums2, n) {
  let i = nums1.length - 1
  m--
  n--
  while(n >= 0) {
      if(nums1[m] > nums2[n]) {
          nums1[i--] = nums1[m--]
      } else {
          nums1[i--] = nums2[n--]
      }
  }
}

// 合并到nums1
var merge = function(nums1, m, nums2, n) {
  if(m === 0) {
    return nums1 = nums2
  }
  if (n === 0) {
    return nums1
  }
  let up = m -1, down = n - 1, count = 1
  console.log(m, down)
  while(down >= 0) {
    if (nums1[up] > nums2[down]) {
      nums1[m + n - count] = nums1[up]
      up--
    } else if (nums1[up] <= nums2[down]) {
      nums1[m + n - count] = nums2[down]
      down--
    }
    count++
  }
};