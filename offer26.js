/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function(A, B) {
  if(A === null || B === null) {
    return false
  }
  // let ans = false
  // if (A.val === B.val) {
  //   ans = subStructure(A, B)
  // }
  // if (!ans) ans = isSubStructure(A.left, B)
  // if (!ans) ans = isSubStructure(A.right, B)

  return subStructure(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
  
  // return ans
};
function subStructure(a, b) {
  if (b === null) return true
  if (a === null) return false
  if (a.val === b.val) {
    return subStructure(a.left, b.left) && subStructure(a.right, b.right)
  }
  return false
}