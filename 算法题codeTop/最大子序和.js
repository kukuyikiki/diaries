/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
  if (!nums instanceof Array || nums.length <= 0) return

  const len = nums.length
  let max = nums[0], pre = nums[0]
  for (let i = 1; i < len; i++) {
    pre = Math.max(nums[i], pre + nums[i])
    max = Math.max(pre, max)
  }
  return max
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let pre = 0, max = 0, count
  const len = nums.length
  for (let i = 0; i < len; i++) {
    pre = Math.max(pre + nums[i], nums[i])
    // max = Math.max(pre, max)
    if (pre > max) {
      count = i
      max = pre
    }
  }
  let start = max, temp = count
  while (start > 0) {
    start -= nums[temp--]
  }
  return max
};