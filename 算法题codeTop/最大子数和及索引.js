/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
  if (!nums instanceof Array || nums.length <= 0) return

  const len = nums.length
  let max = nums[0], pre = nums[0], end = 0
  for (let i = 1; i < len; i++) {
    pre = Math.max(nums[i], pre + nums[i])
    if (pre > max) {
      end = i
      console.log(end)
      max = pre
    }
  }
  let temp = max, start = end
  while (temp) {
    temp -= nums[start]
    start--
  }
  console.log(start)
  return max
};