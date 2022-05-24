function allNumSum(root) {
  if (!root) {
    return 0
  }
  return dfs(root, 0)
}

function dfs(root, pre) {
  if (root == null) {
    return 0
  }
  const sum = pre * 10 + root.val
  if (root.left == null && root.right == null) {
    return sum
  }
  return dfs(root.left, pre) + dfs(root.right, pre)
}