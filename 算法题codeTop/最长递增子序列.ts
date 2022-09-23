function lengthOfLIS(nums: number[]): number {
  const len: number = nums.length;
  const dp: number[] = new Array(len).fill(1);
  let ans: number = 1;
  for (let i = len - 2; i >= 0; i--) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] < nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        ans = Math.max(dp[i], ans);
      }
    }
  }
  return ans;
}
