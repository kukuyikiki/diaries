/**
 * @param {number} x
 * @return {number}
 */
 var reverse = function(x) {
  let str = (x + '').split('')
  let ans
  if (str[0] === '-') {
    for (let l = 1, r = str.length - 1; l < r; l++, r--) {
      let temp = str[l]
      str[l] = str[r]
      str[r] = temp
    }
  } else {
    for (let l = 0, r = str.length - 1; l < r; l++, r--) {
      let temp = str[l]
      str[l] = str[r]
      str[r] = temp
    }
  }
  ans = Number(str.join(''))
  if (ans <= Math.pow(-2, 31) || ans >= Math.pow(2, 31)) {
      return 0
  }
  return str.join('')
};