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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
  if (!root) {
    return false
  }
  const dfs = function(node, num) {
    if (!node) {
      return
    }
    if (node.left === null && node.right === null) {
      return node.val === targetSum
    }

    dfs(node.left, targetSum - node.val)
    dfs(node.right, targetSum - node.val)
  }
  return dfs(root, targetSum)
}