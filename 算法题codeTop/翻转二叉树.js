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
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if (!root || root === null) {
    return root
  }
  const tempArr = []
  tempArr.push(root)
  while (tempArr.length) {
    let node = tempArr.pop()
    let temp = node.left
    node.left = node.right
    node.right = temp
    if (node.left) {
      tempArr.push(node.left)
    }
    if (node.right) {
      tempArr.push(node.right)
    }
  }
  return root
};

function reback(root) {
  if (!root) {
    return root
  }
  const temp = [root]
  while (temp.length) {
    let node = temp.pop()
    let temp1 = node.left
    node.left = node.right
    node.right = temp1
    if (node.left) {
      temp.push(node.left)
    }
    if (node.right) {
      temp.push(node.right)
    }
  }
  return root
}