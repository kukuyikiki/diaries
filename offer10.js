/**
 * @param {number} n
 * @return {number}
 */
 var fib = function(n) {
  if (n === 0) {
      return 0
  }
  if (n === 1) {
      return 1
  }
  let a1 = 0
  let a2 = 1
  let ans
  for(let i = 2; i <= n; i++) {
      ans = a1 + a2
      a1 = a2
      a2 = ans
      console.log(ans, 'ans')
  }
  return ans % 1000000007
};

fib(81)