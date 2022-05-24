/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var levelOrder = function(root) {
   console.log(root, 'root')
  let tem = []
  let ans = []
  if(root === null) {
      return
  } else {
      tem.push(root)
  }
  while(tem.length){
      let len = tem.length
      console.log(tem,'tem')
      // 每一层
      for(let i = 0; i < len; i++) {
          let node = tem.shift()
          if(node) {
              console.log(node, 'node')
              ans.push(node.val)
          }
          if(node.left) {
              tem.push(node.left)
          }
          if(node.right) {
              tem.push(node.right)
          }
      }
  }
  return ans
};
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

let r1 = new TreeNode(9)
let r5 = new TreeNode(15)
let r6 = new TreeNode(7)
let r2 = new TreeNode(20,r5,r6)
let root = new TreeNode(3,r1,r2)

levelOrder(root)