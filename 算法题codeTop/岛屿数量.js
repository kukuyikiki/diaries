function numIslands(grid) {
  let count = 0;
  grid.forEach((item, index) => {
    item.forEach((chil, indey) => {
      if (chil === '1') {
        count++;
        dfs(grid, index, indey);
      }
    });
  });
  return count;
}

function dfs(grid, x, y) {
  if (grid[x + 1] && grid[x + 1][y] === '1') {
    grid[x + 1][y] = 0;
    dfs(grid, x + 1, y);
  }
  if (grid[x - 1] && grid[x - 1][y] === '1') {
    grid[x - 1][y] = 0;
    dfs(grid, x - 1, y);
  }
  if (grid[x][y + 1] && grid[x][y + 1] === '1') {
    grid[x][y + 1] = 0;
    dfs(grid, x, y + 1);
  }
  if (grid[x][y - 1] && grid[x][y - 1] === '1') {
    grid[x][y - 1] = 0;
    dfs(grid, x, y - 1);
  }
}
