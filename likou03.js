/**
 * @param {number[]} nums
 * @return {number}
 */
// var findRepeatNumber = function(nums) {
//   len = nums.length
//   for (let i = 0; i < len - 1; i++) {
//     for (let j = 0; j < len-i; j++) {
//       if (nums[j] > nums[j+1]) {
//         let tem = nums[j]
//         nums[j] = nums[j+1]
//         nums[j+1] = tem
//       }
//     }
//   }
//   for (let k = 0; k < len-1; k++) {
//     if(nums[k] === nums[k+1]) {
//       return nums[k]
//     }
//   }
//   return []
// };

var findRepeatNumber = function(nums) {
  len = nums.length
  let tempNums = new Map()
  for (let i = 0 ; i < len; i++) {
    if(tempNums.has(nums[i])) {
      return nums[i]
    } else {
      tempNums.set(nums[i], 2)
    }
  }
  return []
};