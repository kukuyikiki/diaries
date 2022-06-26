/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  let res = ''
  let i1 = num1.length - 1
  let i2 = num2.length - 1
  let carry = 0
  while (i1 >= 0 || i2 >= 0) {
      const x = i1 >= 0 ? num1[i1] - '0' : 0
      const y = i2 >= 0 ? num2[i2] - '0' : 0

      const sum = x + y + carry
      res += (sum % 10)
      carry = Math.floor(sum / 10)

      i1--
      i2--
  }
  if (carry) res += carry
  return res.split("").reverse().join("")
};

function addStrings(num1, num2) {
  let res = []
  let up = num1.length - 1, down = num2.length
  let flag = 0
  while (up >= 0 || down >= 0 || flag !== 0) {
    let upVal = up >= 0 ? num1[up] - 0 : 0
    let downVal = down >= 0 ? num2[down] - 0 : 0
    let sum = upVal + downVal + flag
    res.push(sum % 10)
    flag = Math.floor(sum / 10)
    up--
    down--
  }
  return res.reverse().join('')
}