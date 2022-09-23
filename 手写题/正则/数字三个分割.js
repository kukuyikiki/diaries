// 不带小数
// ？! 指不匹配  （除了(?=)匹配到的那个）
// ？= 从后往前  前向查找
// ^ 表示以...为首，$ 表示以...为末尾
let regExp = /(?!^)(?=(\d{3})+$)/g;
let numStr = '123456789';
numStr.replace(regExp, ',');

// 带小数
const formatNum = (numStr) => {
  const regex = new RegExp(
    `(?!^)(?=(\\d{3})+${numStr.includes('.') ? '\\.' : '$'})`,
    'g'
  );
  return numStr.replace(regex, ',');
};

console.log(formatNum('12345678'));
console.log(formatNum('12345678.456'));

(() => {
  const formatNum = (numStr) => {
    let regExp = new RegExp(
      `(?!^)(?=(\\d{3})+${numStr.includes('.') ? '\\.' : '$'})`,
      'g'
    );
    return numStr.replace(regExp, ',');
  };

  console.log(formatNum('123456789.111'));
})();
