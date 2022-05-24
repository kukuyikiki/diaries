/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
  let len = grid.length, max = 0
  let lenChild = grid[0].length
  const dfs = function(x, y) {
    if (x < 0 || x >= len || y < 0 || y >= lenChild || grid[x][y] === 0) {
      return 0
    }
    grid[x][y] = 0
    let count = 1
    count += dfs(x - 1, y) + dfs(x + 1, y) + dfs(x, y - 1) + dfs(x, y + 1)
    return count
  }
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < lenChild; j++) {
      max = Math.max(max, dfs(i, j))
    }
  }
  return max
};