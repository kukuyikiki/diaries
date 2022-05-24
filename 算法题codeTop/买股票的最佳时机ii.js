/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (!prices || !prices instanceof Array) {
    return
  }
  const len = prices.length
  const dp = new Array(len).fill(0).map(item => new Array(2).fill(0))
  dp[0][0] = 0
  dp[0][1] = -prices[0]
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    dp[i][1] = Math.max(dp[i - 1][0] - prices[i], dp[i - 1][1])
  }
  return dp[len - 1][0]
};

async function a() {
  console.log('111')
  await b()
  console.log('222')
}

async function b() {
  console.log('333')
}

setTimeout(() => {
  console.log('444')
}, 0)

requestAnimationFrame(() => {
  console.log('555')
})
a()