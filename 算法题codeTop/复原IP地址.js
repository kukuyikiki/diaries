var restoreIpAddresses = function(s) {
  const len = s.length
  if (s === '') return []
  if (len < 4 || len > 12) return []

  const res = []
  const path = []
  const backtracking = function(start) {
    if (path.length === 4) {
      if (start >= len) {
        res.push(path.join('.'))
      }
      return
    }

    for (let i = start; i < len; i++) {
      let str = s.slice(start, i + 1)
      console.log(str, 'str')
      if (isValid(str)) {
        path.push(str)
        backtracking(i + 1)
        path.pop()
      } else {
        break
      }
    }
  }
  const isValid = function (str) {
    if (str.length > 3) {
      return false
    }
    if (parseInt(str, 10) > 255) {
      return false
    }
    if (str.length > 1 && str[0] === '0') {
      return false
    }
    return true
  }
  backtracking(0)
  return res
}