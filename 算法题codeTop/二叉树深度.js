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
 var maxDepth = function(root) {
  if (!root) {
    return 0
  }
  let maxDepth = 0
  const dfs = (root, depth) => {
    if (root === null) {
      return 0
    }
    if (root.left === null && root.right === null) {
      return (maxDepth = Math.max(depth + 1, maxDepth))
    }
    dfs(root.left, depth + 1)
    dfs(root.right, depth + 1)
  }
  dfs(root, 0)
  return maxDepth
};