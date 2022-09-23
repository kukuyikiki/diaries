/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
function isBalanced(root: TreeNode | null): boolean {
  type myType = TreeNode | null;
  let isBal: boolean = true;
  const dfs = (node: myType, level: number): number => {
    if (node === null) return level;
    let left: number = dfs(node.left, level + 1);
    if (!isBal) {
      return left;
    }

    let right: number = dfs(node.right, level + 1);
    if (!isBal) {
      return right;
    }

    if (Math.abs(left - right) > 1) isBal = false;
    return Math.max(left, right);
  };
  dfs(root, 0);
  return isBal;
}
