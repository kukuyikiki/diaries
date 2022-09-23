/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// dp[11] = Math.min(dp[10] + 1, dp[9] + 1, dp[6] + 1)
function coinChange(coins: number[], amount: number): number {
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
