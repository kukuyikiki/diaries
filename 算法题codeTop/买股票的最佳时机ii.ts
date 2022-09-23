/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices: number[]): number {
  if (!prices.length) {
    return 0;
  }
  const len: number = prices.length;
  const dp: number[][] = new Array(len)
    .fill(0)
    .map((item) => new Array(2).fill(0));
  // 未持有股票
  dp[0][0] = 0;
  // 持有股票
  dp[0][1] = -prices[0];
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][0] - prices[i], dp[i - 1][1]);
  }
  return dp[len - 1][0];
};
