/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  const len = arr.length
  let min = 10001
  let max = 0
  for (let i = 0; i < len; i++) {
    if (prices[i] < min) {
      min = prices[i]
    } else if (prices[i] - min > max) {
      max = prices[i] - min
    }
  }
  return max
};