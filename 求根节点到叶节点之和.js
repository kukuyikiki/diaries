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
const temp = []
var sumNumbers = function(root) {
  const ans = []
  dfs(root, root.val, ans)
  console.log(ans)
  return ans.reduce((pre, cur) => {
    return pre + cur
  }, 0)
};

function dfs(root, val, ans) {
  temp.push(val)
  console.log(temp, val+'ans')
  if (root.left === null && root.right === null) {
    console.log(temp, 'temp')
    ans.push(temp)
    temp = []
    return
  }
  if (root.left) {
    dfs(root.left, root.left.val, ans)
  }
  if (root.right) {
    dfs(root.right, root.right.val, ans)
  }
}
 

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
