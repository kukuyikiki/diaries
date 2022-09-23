/**
 Do not return anything, modify nums in-place instead.
 */
(() => {
  function nextPermutation(nums: number[]): void {
    let len: number = nums.length,
      i: number = len - 2;
    for (; i >= 0; i--) {
      let n: number = nums[i];
      if (n < nums[i + 1]) {
        let idx: number = i + 1;

        while (nums[idx + 1] > n) {
          idx++;
        }
        nums[i] = nums[idx];
        nums[idx] = n;
        let left: number = i + 1;
        let right: number = nums.length - 1;
        while (left < right) {
          [nums[left], nums[right]] = [nums[right], nums[left]];
          left++;
          right--;
        }
        break;
      } else if (i === 0) {
        nums.reverse();
      }
    }
  }
})();
