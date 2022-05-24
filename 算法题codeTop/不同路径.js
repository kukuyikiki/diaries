/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  if (m <= 0 || n <= 0) {
    return 0
  }
  let count = 0
  const dfs = function(x, y) {
    if (x >= m || y >= n) {
      return
    }
    if (x === m - 1 && y === n - 1){
      count++
    }
    dfs(x + 1, y)
    dfs(x, y + 1)
  }
  dfs(0, 0)
  return count
};


/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  let dp = new Array(m).fill(0).map(item => new Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1
  }
  for (let i = 0; i < n; i++) {
    dp[0][i] = 1
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
};
