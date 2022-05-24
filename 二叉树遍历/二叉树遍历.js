// 层序遍历（数组形式）
function myLevelOrder(root) {
  let answer = []
  let tempArr = []
  
  if (root) {
    tempArr.push(root)
  } else {
    return []
  }

  while(tempArr.length) {
    let length = tempArr.length
    let res = []
    for (let i = 0; i < length; i++) {
      let temp = tempArr.shift()
      res.push(temp.val)
      if (temp.left) {
        tempArr.push(temp.left)
      }
      if (temp.right) {
        tempArr.push(temp.right)
      }
    }      
    answer.push(res)
  }
  return answer
}

// 非数组形式

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

let root = node([[[[7], 11, [2]], 4, []], 5, [[13], 8, [[], 4, [1]]]])

// 前序遍历 根左右
function beforeOreder(tree) {
  if (tree.value === null) {
    console.log('')
  } else {
    console.log(tree.value)
  }

  if (tree.hasOwnProperty('left')) {
    beforeOreder(tree.left)
    beforeOreder(tree.right)
  }
}

function beforeOreder(root) {
  if (root === null) return

  console.log(root.val)
  if (root.hasOwnProperty(left)) {
    beforeOreder(root.left)
    beforeOreder(root.right)
  }
}

// 中序遍历 左根右
function middleOrder(tree) {
  if (tree.hasOwnProperty('left')) {
    middleOrder(tree.left)
    console.log(tree.val)
    middleOrder(tree.right)
  } else {
    (tree.val === null) ? console.log('') : console.log(tree.value)
  }
}

function middleOrder(root) {
  if (root === null) return
  
  if (root.hasOwnProperty('left')) {
    middleOrder(root.left)
    console.log(root.val)
    middleOrder(root.right)
  }
}

// 后序遍历 左右根
function behindOrder(tree) {
  if (tree.hasOwnProperty('left')) {
    behindOrder(tree.left)
    behindOrder(tree.right)
    console.log(tree.value)
  } else {
    (tree.val === null) ? console.log('') : console.log(tree.value)
  }
}

function behindOrder(root) {
  if (root === null) return

  if (root.hasOwnProperty('left')) {
    behindOrder(root.left)
    behindOrder(root.right)
    console.log(root.val)
  }
}

// 层序遍历
function levelOrder(root) {
  let deque = []
  deque.push(root)
  while (deque.length) {
    front = deque.shift()
    if (front.hasOwnProperty('left')) {
      deque.push(front.left)
      deque.push(front.right)
    }
    (front.val === null) ? console.log('') : console.log(front.value)
  }
}

function levelOrder(root) {
  let deque = []
  deque.push(root)
  while (deque.length) {
    let front = deque.shift()
    if (front.hasOwnProperty('left')) {
      deque.push(front.left)
      deque.push(front.right)
    }
    console.log(front.val)
  }
}

// 二叉树层序遍历
function orderLevel(root) {
  const tempArr = []
  const ans = []

  if (root === null) {
    return []
  } else {
    tempArr.push(root)
  }
  while(tempArr){
    let len = tempArr.length
    let res = []
    for(let i = 0; i < len; i++) {
      const temp = tempArr.shift()
      res.push(temp.val)
      if (temp.left) {
        tempArr.push(temp.left)
      }
      if (temp.right) {
        tempArr.push(temp.right)
      }
    }
    ans.push(res)
  }
  return ans
}