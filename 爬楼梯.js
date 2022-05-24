/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  const ans = []
  ans[0] = 0
  ans[1] = 1
  ans[2] = 2
  for (let i = 3; i <= n; i++) {
    ans[i] = ans[i - 1] + ans[ i - 2]
  }
  return ans[n]
};
// 最后一层是倒数第一次爬一个 + 倒数第二层爬两个