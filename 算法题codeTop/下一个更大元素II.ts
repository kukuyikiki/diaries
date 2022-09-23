// 最小栈，循环

function nextGreaterElements(nums: number[]): number[] {
  const len: number = nums.length;
  const res: number[] = new Array(len);
  const s: number[] = new Array();

  for (let i = 2 * len - 1; i >= 0; i--) {
    while (s.length > 0 && nums[i % len] >= s[s.length - 1]) {
      s.pop();
    }
    res[i % len] = s.length ? s[s.length - 1] : -1;
    s.push(nums[i % len]);
  }

  return res;
}
