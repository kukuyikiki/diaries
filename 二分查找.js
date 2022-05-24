/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  const len = nums.length
  let left = 0, right = len - 1
  while(left <= right) {
    mid = Math.floor((right - left) / 2) + left
    if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return -1
};
