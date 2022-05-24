// 超时
/**
 * @param {number[][]} grid
 * @return {number}
 */
 var minPathSum = function(grid) {
  const m = grid.length
  const n = grid[0].length
  let min = Infinity
  const dfs = function(x, y, res) {
      if (x >= m || y >= n) {
          return
      }
      res += grid[x][y]
      if (x === m - 1 && y === n - 1) {
          // console.log(min, res)
          min = Math.min(min, res)
      }
      dfs(x + 1, y, res)
      dfs(x, y + 1, res)
  }
  dfs(0, 0, 0)
  return min
}

// 动态规划
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  const m = grid.length
  const n = grid[0].length
  const dp = new Array(m).fill(0).map(item => {
    return (item = new Array(n).fill(0))
  })
  dp[0][0] = grid[0][0]
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j < n && j > 0) {
        dp[i][j] = grid[i][j] + dp[i][j - 1]
      } else if (j === 0 && i > 0 && i < m) {
        dp[i][j] = grid[i][j] + dp[i - 1][j]
      } else {
        dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[m-1][n-1]
}

const name = 'join'
const person ={
  name: 'pete',
  getName() {
    return this.name
  }
}

const getPersonName = person.getName
console.log(getPersonName())

var jqka = ['1', '0', 'j', 'q', 'k', 'a']
for (var i = 0; i < jqka.length; i++) {
  let item = jqka[i];
  setTimeout(function() {
    if (typeof item === 'string') {
      console.log(item)
    }
  }, (i+1) *1000)
}