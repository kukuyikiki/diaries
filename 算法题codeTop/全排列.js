/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const len = nums.length
  const dp = new Array(len).fill(0)
  const ans = [], temp = []
  const dfs = function() {
    if (temp.length === len) {
      ans.push(temp.slice())
      return
    }

    for (let i = 0; i < len; i++) {
      if (dp[i]) {continue}
      temp.push(nums[i])
      dp[i] = true
      dfs()
      dp[i] = false
      temp.pop()
    }
  }
  dfs()
  return ans
}

// 全排列二
var permuteUnique = function(nums) {
  // 排序，去重的基础
  nums.sort((a, b) => a - b)
  const res = [], path = []
  const used = new Array(nums.length).fill(false)

  const dfs = () => {
      if (path.length == nums.length) {
          res.push(path.slice())
          return
      }

      for (let i = 0; i < nums.length; i++) {
          if (used[i]) continue
          // 去重的条件
          // 这里还是很难理解的！！！
          // 对于 !used[i - 1] 的解释请见 issue：https://gitee.com/douma_edu/douma_algo_training_camp/issues/I48M6Q
          if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue
          path.push(nums[i])
          used[i] = true
          dfs()
          path.pop()
          used[i] = false
      }
  }

  dfs()
  return res
};
