/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  if (!nums || !nums instanceof Array) {
    return []
  }

  const len = nums.length
  const ans = []
  if (len < 3) {
    return []
  }
  nums.sort((a, b) => {
    return a - b
  })
  for (let i = 0; i < len - 2; i++) {
    if (nums[i] === nums[i - 1]) {continue}

    let target = -nums[i]
    let left = i + 1, right = len - 1
    while (left < right) {
      let sum = nums[left] + nums[right]
      if (target === sum) {
        ans.push([nums[i], nums[left], nums[right]])
        while (left < right && nums[left] === nums[++left]);
        while (left < right && nums[right] === nums[--right]);
      } else if (target > sum) {
        left++
      } else {
        right--
      }
    }
  }
  return ans
};