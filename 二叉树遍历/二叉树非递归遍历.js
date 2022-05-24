// 前序遍历
function findBefore(root) {
  if (!root) {
    return
  }
  const stack = []
  stack.push(root)
  while (stack.length) {
    let node = stack.shift()
    console.log(node.val)
    if (node.left) {
      stack.push(node.left)
    }
    if (node.right) {
      stack.push(node.right)
    }
  }
}

// 中序遍历
function findMid(root) {
  if (!root) {
    return
  }
  let p = root
  const stack = []
  while (stack.length || p) {
    while (p) {
      stack.push(p)
      p = p.left
    }
    let node = stack.pop()
    console.log(node.val)
    p = node.right
  }
}

// 后序遍历
function findBehined(root) {
  if (!root) {
    return
  }
  const stack = [root], ans = []
  while (stack.length) {
    let node = stack.pop()
    ans.push(node)
    if (node.left) {
      stack.push(node.left)
    }
    if (node.right) {
      stack.push(node.right)
    }
  }
  while (ans.length) {
    console.log(ans.pop().val)
  }
}