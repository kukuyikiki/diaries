/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  let flag = null;
  let stack = [];
  s = "+" + s.replace(/\s/g, ""); //去除空格，并且在最前面添加+号，方便后续判断
  for (let i = 0; i < s.length; i++) {
    if (/\d/.test(s[i])) {
      let num = "";
      //这里处理的是如果是多位数的运算，需要把多位数都记录好
      while (/\d/.test(s[i]) && i < s.length) {
        num += s[i];
        i++;
      }
      i--;

      //分类讨论flag，即数字前的符号的情况
      switch (flag) {
        case "+": {
          //入栈
          stack.push(num - 0);
          break;
        }
        case "-": {
          //入栈
          stack.push(0 - num);
          break;
        }
        case "*": {
          //栈顶元素出栈和当前数字相乘，然后得到结果入栈
          stack.push(parseInt(stack.pop() * num));
          break;
        }
        case "/": {
          //栈顶元素出栈和当前数字相除，然后得到结果入栈
          stack.push(parseInt(stack.pop() / num));
          break;
        }
      }
    } else {
      //flag记录符号
      flag = s[i];
    }
  }
  let ans = 0;
  //遍历栈，元素求和。
  for (let i = 0; i < stack.length; i++) {
    ans += stack[i];
  }
  return ans;
};
