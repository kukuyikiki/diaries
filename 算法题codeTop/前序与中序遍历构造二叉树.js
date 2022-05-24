/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
 var buildTree = function(preorder, inorder) {
  if (!preorder.length || !inorder.length) {return null}
  let temp = preorder[0]
  
  let node = new TreeNode(temp)
  let find = inorder.indexOf(temp)
  node.left = buildTree(preorder.slice(1, find + 1), inorder.slice(0, find))
  node.right = buildTree(preorder.slice(find + 1), inorder.slice(find + 1))
  return node
};