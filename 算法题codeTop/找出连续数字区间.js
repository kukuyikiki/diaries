function mergeArr(nums) {
  if (!nums || !nums instanceof Array) {
    return []
  }

  let left = 0, right = 1
  const len = nums.length, ans = []
  while (left < len && right <= len) {
    if (nums[right] - nums[right - 1] === 1) {
      right++
    } else if (right - left === 1) {
      ans.push(nums[left])
      left = right
      right = right + 1
    } else {
      ans.push(`${nums[left]}->${nums[right - 1]}`)
      left = right
      right = right + 1
    }
  }
  return ans
}

mergeArr([0, 1, 2, 4, 5, 7, 13, 15, 18, 19, 40, 42])