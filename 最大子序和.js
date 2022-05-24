/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  if (!nums instanceof Array || nums.length <= 0) return

  let pre = 0
  let max = nums[0]
  const len = nums.length

  for (let i = 0; i < len; i++) {
    pre = Math.max(pre + nums[i], nums[i])
    max = Math.max(pre, max)
  }
  return max
};