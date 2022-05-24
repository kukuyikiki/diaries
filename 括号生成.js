/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  if (n <= 0) return []

  const ans = []
  let path = ''
  let open = 0, close = 0
  dfs(path, open, close, n, ans)
  return ans
};

function dfs(path, open, close, n, ans) {
  if (open > n || close > open) return

  if (path.length === 2 * n) {
    ans.push(path)
    return
  }

  dfs(path + '(', open + 1, close, n, ans)
  dfs(path + ')', open, close + 1, n, ans)
}

generateParenthesis(3)


function bracket(n) {
  if (n <= 0) return []

  const ans = []
  let path = ''
  let open = 0, close = 0
  dfs(ans, path, open, close, n)
  return ans
}

function dfs(ans, path, open, close, n) {
  if (open > n || close > open) {
    return
  }

  if (path.length === 2 * n) {
    ans.push(path)
    return
  }

  dfs(ans, path + '(', open++, close, n)
  dfs(ans, path + ')', open, close++, n)
}
