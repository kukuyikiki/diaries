/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  this.hasLen = haystack.length
  this.neeLen = needle.length
  for (let i = 0; i + this.neeLen <= this.hasLen; i++) {
    let flag = true;
    for (let j = 0; j < this.neeLen; j++) {
        if (haystack[i + j] != needle[j]) {
            flag = false;
            break;
        }
    }
    if (flag) {
        return i;
    }
  }
  return -1;
};
