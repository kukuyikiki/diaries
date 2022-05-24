/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(str) {
  const len = str.length
  const temp = []
  let i = 0, max = 0
  while (i < len) {
    if (temp.indexOf(str[i]) === -1) {
      temp.push(str[i])
      i++
      max = Math.max(max, temp.length)
    } else {
      temp.shift()
    }
  }
  return max
};