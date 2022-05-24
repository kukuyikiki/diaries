function ones(func) {
  let flag = true
  return function() {
    if (flag === true) {
      console.log(arguments)
      func.apply(null, arguments)
      flag = false
    }
  }
}

function appl(arguments) {
  console.log(arguments)
  console.log('11111')
}
let a = ones(appl)

function ones(func) {
  let flag = true
  return function() {
    if (flag === true) {
      func.apply(null, arguments)
      flag = false
    }
  }
}



// 层序遍历
const myTree = [
  { name: "A" },
  { name: "B", children: [{ name: "A" }] },
  {
    name: "AA",
    children: [
      { name: "BB" },
      { name: "C" },
      { name: "D", children: [{ name: "A" }] },
      { name: "A" },
    ],
  },
  { name: "D", children: [{ name: "C", children: [{ name: "AA" }] }] },
]

function myFilter(tree, tarName) {
  if (!tree) return []
  let result = []

  tree.map(item => {
    let temp = { ...item }

    if (temp.name === tarName) {
      result.push(temp)
    } else {
      let tempResult = myFilter(temp.children, tarName)
      if (tempResult.length > 0) {
        item.children = tempResult
        result.push(item)
      }
    }
  })
  return result
}

myFilter(myTree, 'A')