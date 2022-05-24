/**
 * @param {number[]} nums
 * @return {number}
 */
 var rob = function(nums) {
  if (!nums || !nums instanceof Array) {
    return 0
  }

  let len = nums.length
  let old = nums[0]
  if (len === 1) {
    return old
  }
  let pre = Math.max(old, nums[1])
  let ans  = 0
  for (let i = 2; i < len; i++) {
    ans = Math.max(old + nums[i], pre)
    old = pre
    pre = ans
  }
  return pre
};