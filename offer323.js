/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
  let tem = []
  let ans = []
  let j = 1
  
  if (root) {
      tem.push(root)
  } else {
      return []
  }

  while (tem.length) {
      let len = tem.length
      let res = []
      for(let i = 0; i < len; i++) {
          let node = tem.shift()
          if(node) {
              res.push(node.val)
          }
          if(node.left)
              tem.push(node.left)
          if(node.right)
              tem.push(node.right)
      }
      console.log(res, ' res')
      if(j % 2 === 0) {
          for(let i = 0; i < res.length; i++) {
              let temp = res[i]
              res[i] = res[res.length - 1 - i]
              res[res.length - 1] = temp
          }
      }
      ans.push(res)
      j++
  }
  return ans
};
let arr = [0,2,4,1,null,3,-1,5,1,null,6,null,8]
levelOrder(arr)