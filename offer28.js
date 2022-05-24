/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  let ans
  if (root === null) {
    return true
  } else {
    ans = lr(root.left, root.right)
  }
  return ans
};

function lr(left, right) {
  if (left === null && right === null) {
    return true
  }
  if (left === null || right === null || left.val != right.val) {
    return false
  }
  return lr(left.left, right.right) && lr(left.right, right.left)
}