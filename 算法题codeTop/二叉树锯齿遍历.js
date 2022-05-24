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
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  if (!root) {
    return []
  }
  const tempArr = [], ans = []
  tempArr.push(root)
  let flag = false
  while (tempArr.length) {
    const len = tempArr.length
    const res = []
    for (let i = 0; i < len; i++) {
      let node = tempArr.shift()
      if (flag) {
        res.push(node.val)
      } else {
        res.unshift(node.val)
      }
      if (node.left) {
        tempArr.push(node.left)
      }
      if (node.right) {
        tempArr.push(node.right)
      }
    }
    ans.push(res)
    flag = !flag
  }
  return ans
};