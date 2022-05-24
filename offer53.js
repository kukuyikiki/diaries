/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
  let len = nums.length
  let [left, right] = [0, nums.length - 1]
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if(nums[mid] === mid) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
};
missingNumber([0,1])