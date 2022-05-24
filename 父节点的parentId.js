function levelOrder(root) {
  if (!root) return

  const ans = []
  const temp = []
  temp.push(root)
  while (temp.length) {
    const target = temp.shift()
    if (target.left) {
      target.left.parentId = target.id
      temp.push(target.left)
    }
    if (target.right) {
      target.right.parentId = target.id
      temp.push(target.right)
    }
  }
}