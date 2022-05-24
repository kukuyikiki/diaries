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

  const ans = []
  const tempArr = []
  let isBack = true
  if (root && root.val) {
    tempArr.push(root)
  } else {
    return []
  }

  while (tempArr) {
    const length = tempArr.length
    const res = []
    for (let i = 0; i < length; i++) {
      const temp = tempArr.shift()
      if (isBack) {
        res.push(temp.val)
      } else {
        res.unshift(temp.val)
      }
      if (temp.left) {
        tempArr.push(temp.left)
      }
      if (temp.right) {
        tempArr.push(temp.right)
      }
    }
    ans.push(res)
    isBack = !isBack
  }
  return ans
};