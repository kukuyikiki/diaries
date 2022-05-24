function orderAll(arr) {
  if (!arr || !arr instanceof Array) {
    return []
  }

  const len = arr.length
  const ans = []
  const bp = new Array(len).fill(false)
  const path = []
  dfs(arr, ans, bp, path, len)
  return arr
}

function dfs(arr, ans, bp, path, len) {
  if (path.length === len) {
    ans.push(path.slice())
    return
  }

  for (let i = 0; i < len; i++) {
    if (bp[i]) { continue }
    path.push(arr[i])
    bp[i] = true
    dfs(arr, ans, bp, path, len)
    bp[i] = false
    path.pop()
  }
}