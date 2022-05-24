/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
  const m = text1.length
  const n = text2.length
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  if (m < 1 || n < 1) {
    return []
  }
  for (let i = 1; i <= m; i++) {
    let t1 = text1[i - 1]
    for (let j = 1; j <= n; j++) {
      let t2 = text2[j - 1]
      if (t1 === t2) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[m][n]
};