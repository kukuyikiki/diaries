/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
 var multiply = function(num1, num2) {
  if (!num1 || num1 <= 0 || !num2 || num2 <= 0) {
    return '0'
  }
  let flag = 0, ans = []
  const len1 = num1.length
  let len2 = num2.length - 1
  for (let i = len1 - 1; i >= 0; i--) {
    let temp = []
    let up = Number(num1[i])
    while(len2 >= 0 || flag != 0) {
      let down = num2[len2] ? Number(num2[len2]) : 0
      let tempMul = (down * up + flag)
    //   console.log(tempMul, 'tempMul')
      flag = Math.floor(tempMul / 10)
      temp.unshift(tempMul % 10)
      len2--
    }
    for (let k = 0; k < len1 - 1 - i; k++) {
      temp.push(0)
    }
    len2 = num2.length - 1
    ans.push(temp.join(''))
  }
  const addStrings = function(num1, num2) {
    let add = 0, i = num1.length - 1, j = num2.length - 1
    const ans = []
    while (i >= 0 || j >= 0 || add != 0) {
      let left = i >= 0 ? num1[i] - 0 : 0
      let right = j >= 0 ? num2[j] - 0 : 0
      let temp = left + right + add
      ans.push(temp % 10)
      add = Math.floor(temp / 10)
      i -= 1
      j -= 1
    }
    return ans.reverse().join('')
  }
  let pre = ans[0]
//   console.log(ans, 'ans')
  for (let i = 1; i < len1; i++) {
      pre = addStrings(pre, ans[i])
  }
  return pre
};


// 更好的方法

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
 var multiply = function(num1, num2) {
  if (!num1 || num1 <= 0 || !num2 || num2 <= 0) {
    return '0'
  }
  let len1 = num1.length, len2 = num2.length
  let ans = new Array(len1 + len2).fill(0)
  for (let i = len1 - 1; i >= 0; i--) {
    let up = Number(num1[i])
    for (let j = len2 - 1; j >= 0; j--) {
      let down = Number(num2[j])
      ans[i + j + 1] += up * down 
    }
  }
  for(let i = len1 + len2 - 1; i > 0; i--) {
    ans[i - 1] += Math.floor(ans[i] / 10)
    ans[i] %= 10
  }
  console.log(ans)
};