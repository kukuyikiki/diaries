/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  if (!n || n < 1) {
    return []
  }

  let res = '', ans = []
  let open = 0, close = 0
  dfs(res, n, ans, open, close)
  return ans
};

function dfs(res, n, ans, open, close) {
  if (open > n || close > open) {
    return
  }

  if (res.length === 2 * n) {
    ans.push(res)
    return
  }
  dfs(res + '(', n, ans, open + 1, close)
  dfs(res + ')', n, ans, open, close + 1)
}