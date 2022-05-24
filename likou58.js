/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
  let tem1 = s.slice(n)
  let tem2 = s.slice(0, n)
  return tem1 + tem2
};