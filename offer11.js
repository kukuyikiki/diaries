/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function(s) {
  let len = s.length
  if (len === 0) {
      return ''
  }
  let temap = Array(26).fill(0)
  for(let i = 0 ; i < len; i++) {
      temap[s.charAt(i).charCodeAt() - 97]++
  }
  console.log(temap, 'temap')
  for(let i = 0 ; i < len; i++) {
      if (temap[s.charAt(i).charCodeAt() - 97 === 1]) {
          return s.charAt(i)
      }
  }
  return " "
};
firstUniqChar("leetcode")