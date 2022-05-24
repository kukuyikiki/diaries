// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3\
// const myArr = []
// let i = 0, max = 0
// const len = s.length
// while (i < len) {
//   if (myArr.indexOf(s.charAt(i)) === -1) {
//     myArr.push(s.charAt(i))
//     i++
//   } else {
//     myArr.shift()
//   }
//   max = Math.max(myArr.length, max)
// }
// return max

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const mySet = new Set()
  let max = 0, right = -1
  const len = s.length
  if (len === 0) return 0

  for(let i = 0; i < len; i++) {
    if (i > 0) {
      mySet.delete(s.charAt(i - 1))
    }
    while(right + 1 < len && !mySet.has(charAt(right + 1))) {
      mySet.add(charAt(right + 1))
      right++
    }
    max = Math.max(max, right - i + 1)
  }
  return max
};
lengthOfLongestSubstring('pwwkew')