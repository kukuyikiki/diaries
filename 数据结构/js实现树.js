class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

// 先建立一棵树
function node(obj) {
  let newObj = {}
  if (obj.length === 1) {
    newObj.value = obj[0]
  } else if (obj.length === 0) {
    newObj.value = null
  } else {
    newObj.left = node(obj[0])
    newObj.value = obj[1]
    newObj.right = node(obj[2])
  }
}