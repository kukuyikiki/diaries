/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const len = s.length
  if (len < 2) {
    return s
  }

  let maxLen = 1
  let begin = 0
  const dp = []

  for (let i = 0; i < len; i++) {
    dp[i] = []
    dp[i][i] = true
  }

  const charArrays = Array.from(s)
  
  for (let L = 2; L < len; L++) {
    for (let i = 0; i < len; i++) {
      let j = L + i - 1
      if (j >= len) { break }

      if (charArrays[i] !== charArrays[j]) {
        dp[i][j] = false
      } else {
        if (j - i < 3) {
          dp[i][j] = true
        } else {
          dp[i][j] = dp[i + 1][j - 1]
        }
      }
      if (dp[i][j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1
        begin = i
      }
    }
  }
  return s.substring(begin, begin + maxLen)
};

// 最长回文子串
/**
 * @param {string} s
 * @return {string}
 */
 var longestPalindrome = function(s) {
  let res = "";
  for(let i = 0;i < s.length;i++){
      const s1 = palindrome(s,i,i);
      const s2 = palindrome(s,i,i + 1);
      res = res.length > s1.length ? res : s1;
      res = res.length > s2.length ? res : s2;
  }
  return res;
};
const palindrome = (s,l,r)=>{
  while(l >= 0 && r <= s.length - 1 && s[l] == s[r]){
      l--;
      r++;
  }
  return s.slice(l + 1,r);
}

function longestPalindrome(s) {
  let res = ""
  for (let i = 0; i < s.length; i++) {
    const s1 = part1(s, i, i)
    const s1 = part1(s, i, i + 1)
    res = res.length > s1.length ? res : s1
    res = res.length > s2.length ? res : s2
  }
  return res
}

function part1(s, l, r) {
  while (l >= 0 && r <= s.length - 1 && s[l] == s[r]) {
    --l
    ++r
  }
  return s.slice(l + 1, r)
}