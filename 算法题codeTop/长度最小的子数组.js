/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
 var minSubArrayLen = function(target, nums) {
  if (nums[0] >= target) {
      return 1
  }
  const len = nums.length
  let left = 0, right = 0, sum = 0, min = 10001
  while (right <= len) {
    if (sum < target) {
      sum += nums[right]
      right++
    } else {
      min = Math.min(min, right - left)
      sum -= nums[left]
      left++
    }
  }
  if (min === 10001) {
      min = 0
  }
  return min
};