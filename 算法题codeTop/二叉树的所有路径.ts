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
function binaryTreePaths(root: TreeNode | null): string[] {
  const ans: string[] = [];

  const dfs = function (node: TreeNode | null, str: number[]) {
    if (node === null) {
      return;
    }
    str.push(node.val);
    if (node.left === null && node.right === null) {
      ans.push(str.join('->'));
    }
    if (node?.left) {
      dfs(node.left, str);
    }
    if (node?.right) {
      dfs(node.right, str);
    }
    str.pop();
  };

  dfs(root, []);

  return ans;
}
