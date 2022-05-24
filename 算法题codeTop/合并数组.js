/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  if (m === 0 || n === 0){
    return nums1
  }
  let up = m - 1
  let down = n - 1, count = 0
  while (down >= 0) {
    if (nums1[up] > nums2[down]) {
      nums1[m + n - count] = nums1[up]
      up--
    } else {
      nums1[m + n - count] = nums2[down]
      down--
    }
    count++
  }
};