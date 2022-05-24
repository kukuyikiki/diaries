/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var sumNumbers = function(root) {
  return dfs(root, 0)
}

function dfs (root, pre) {
  if (root === null) {
    return 0
  }
  const sum = pre * 10 + root.val
  if (root.left === null && root.right === null) {
    return sum
  }
  return dfs(root.left, sum) + dfs(root.right, sum)
}

function sumNumbers(root) {
  return dfs(root, 0)
}

function root(root, pre) {
  if (root === null) {
    return 0
  }
  const sum = pre * 10 + root.val
  if (root.left === null && root.right === null) {
    return sum
  }
  return dfs(root.left, sum) + dfs(root.right, sum)
}