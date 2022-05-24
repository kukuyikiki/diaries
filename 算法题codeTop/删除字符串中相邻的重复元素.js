/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function(s) {
  const len = s.length
  const myStack = [s[0]]
  let i = 1
  while(i < len) {
    if (s[i] === myStack[0]) {
      myStack.shift()
    } else {
      myStack.unshift(s[i])
    }
    i++
  }
  return myStack.reverse().join('')
};

var F = function(){}
Object.prototype.a = function(x){return x}
Function.prototype.b = 1
var f = new F()
f.a(f.b)


function tttt(n, y, arr) {
  let sum = 0
  for (let i of arr) {
      sum += i
  }
  let dp = new Array(n + 1).fill(0).map(item => new Array(sum + 1).fill(0))
  let res = 0
  for (let i = 1; i < dp.length; i++) {
      for (let j = 1; j < dp[0].length; j++) {
          if (arr[i - 1] > j) {
              dp[i][j] = dp[i - 1][j]
          } else {
              if (Math.abs(y-(dp[i-1][j-arr[i-1]] + arr[i-1])) < Math.abs(dp[i-1][j]-y)) {
                  dp[i][j] = dp[i - 1][j - arr[i - 1]] + arr[i - 1]
              } else {
                  dp[i][j] = dp[i - 1][j]
              }
          }
          if (Math.abs(y - res) > Math.abs(y - dp[i][j])) {
              res = dp[i][j]
          }
      }
  }
  console.log(res)
}
let n = 4
let y = 30
let arr = [18, 20, 22, 21]
tttt(n, y, arr)