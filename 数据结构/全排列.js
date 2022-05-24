var permute = function(nums) {
  const res = [], path = []
  const used = new Array(nums.length).fill(false)

  const dfs = () => {
      if (path.length == nums.length) {
          res.push(path.slice())
          return
      }

      for (let i = 0; i < nums.length; i++) {
          if (used[i]) continue
          path.push(nums[i])
          used[i] = true
          dfs()
          // 回溯的过程中，将当前的节点从 path 中删除
          path.pop()
          used[i] = false
      }
  }

  dfs()
  return res
}
nums = [1,2,3]
permute(nums)


var permute = function(nums) {
  if (!nums instanceof Array || nums.length === 0) {
    return false
  }
  const ans = []
  const bl = new Array(nums.length).fill(false)
  let path = []
  dfs(nums, path, ans, bl)
  return ans
}

function dfs(nums, path, ans, bl) {
  if (path.length === 3) {
    ans.push(path.slice())
    return
  }

  for (let i = 0; i < nums.length; i++) {
    if (bl[i]) continue
    path.push(nums[i])
    bl[i] = true
    dfs(nums, path, ans, bl)
    path.pop()
    bl[i] = false
  }
}
nums = [1,2,3]
permute(nums)


// function orderAll(arr) {
//   if (!arr instanceof Array || arr.length === 0) {
//     return false
//   }

//   const bl = new Array(arr.length).fill(false)
//   const path = []
//   const ans = []
//   dfs(arr, path, bl, ans)
//   return ans
// }

// function dfs(arr, path, bl, ans) {
//   if (path.length === arr.length) {
//     ans.push(path.slice())
//   }

//   for (let i = 0; i < arr.length; i++) {
//     if (bl[i]) continue
//     path.push(arr[i])
//     bl[i] = true
//     dfs(arr, path, bl, ans)
//     bl[i] = false
//     path.pop()
//   }
// }

// nums = [1,2,3]
// orderAll(nums)

function orderAll(arr) {
  if (!arr instanceof Array || arr.length === 0) {
    return false
  }

  const bl = new Array(arr.length).fill(false)
  const ans = []
  const path = []
  dfs(arr, bl, ans, path)
  return ans
}

function dfs(arr, bl, ans, path) {
  if (path.length === arr.length) {
    ans.push(path.slice())
    return
  }

  for (let i = 0; i < arr.length; i++) {
    if (bl[i]) continue
    bl[i] = true
    path.push(arr[i])
    dfs(arr, bl, ans, path)
    bl[i] = false
    path.pop()
  }
}


function orderAll(arr) {
  if (!arr instanceof Array) return []

  const len = arr.length
  const bp = new Array(len).fill(false)
  const path = []
  const ans = []
  dfs(arr, path, bp, ans, len)
  console.log(ans, 'ans')
}

function dfs(arr, path, bp, ans, len) {
  if (path.length === len) {
    ans.push(path.slice())
    return
  }

  for(let i = 0; i < len; i++) {
    if (bp[i]) continue

    path.push(arr[i])
    bp[i] = true
    dfs(arr, path, bp, ans, len)
    path.pop()
    bp[i] = false
  }
}

let arr = [1, 2, 3]
orderAll(arr)
// -------------
function orderAll(nums) {
  if (nums.length === 0) {
    return []
  }

  const len = nums.length
  const bl = new Array(len).fill(false)
  const path = []
  const ans = []
  dfs(bl, path, ans, nums, len)
  return ans
}

function dfs(bl, path, ans, nums, len) {
  if (path.length === len) {
    ans.push(path.slice())
    return
  }
  for (let i = 0; i < len; i++) {
    if (bl[i]) continue
    path.push(nums[i])
    bl[i] = true
    dfs(bl, path, ans, nums, len)
    bl[i] = false
    path.pop()
  }
}

function orderAll(arr) {
  if (!arr || !arr instanceof Array) {return []}

  const ans = []
  const path = []
  const len = arr.length
  const bl = new Array(len).fill(false)
  dfs(arr, ans, path, bl, len)
  return arr
}

function dfs(arr, ans, path, bl, len) {
  if (path.length === len) {
    ans.push(path.slice())
    return
  }
  for (let i = 0; i < len; i++) {
    if (bl[i]) continue

    path.push(arr[i])
    bl[i] = true
    dfs(arr, ans, path, bl, len)
    bl[i] = false
    path.pop()
  }
}