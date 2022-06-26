function f(n, y, arr) {
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
        if (abs(y - (dp[i - 1][j - arr[i - 1]] + arr[i - 1])) < abs(dp[i - 1][j] - y)) {
          dp[i][j] = dp[i - 1][j - arr[i - 1]] + arr[i - 1]
        } else {
          dp[i][j] = dp[i - 1][j]
        }
      }

      if (abs(y - res) > abs(y - dp[i][j])) {
        res = dp[i][j]
      }
    } 
  }
  console.log(dp)
  return res
}

function abs(a) {
  if (a < 0) a *= -1
  return a
}

f(4, 30, [18, 20, 22, 21])

function getMax(n, y, arr) {
  let sum = 0, res = 0
  sum = arr.reduce((pre, item) => {
    return pre + item
  }, 0)
  const dp = new Array(n + 1).fill(0).map(item => new Array(sum + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= sum; j++) {
      if (arr[i - 1] > j) {
        dp[i][j] = dp[i - 1][j]
      } else {
        if (Math.abs(y - (dp[i - 1][j - arr[i - 1]] + arr[i - 1])) < Math.abs(y - (dp[i - 1][j]))) {
          dp[i][j] = dp[i - 1][j - arr[i - 1]] + arr[i - 1]
        } else {
          dp[i][j] = dp[i - 1][j]
        }
      }
      if (Math.abs(y - dp[i][j]) < Math.abs(y - res)) {
        res = dp[i][j]
      }
    }
  }
  console.log(dp, 'dp')
  return res
}
getMax(4, 30, [18, 20, 22, 21])