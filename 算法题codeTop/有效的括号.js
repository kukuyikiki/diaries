function isValid(str) {
  const myMap = {
    '(': 1,
    ')': -1,
    '[': 2,
    ']': -2,
    '{': 3,
    '}': -3,
  }
  const stack = []
  const len = str.length
  let i = 0
  while(i < len) {
    if (myMap[str[i]] > 0) {
      stack.push(str[i])
    } else {
      if (myMap[str[i]] + myMap[stack.pop] !== 0) {
        return false
      }
    }
  }
  if (stack.length) {
    return false
  }
  return true
}