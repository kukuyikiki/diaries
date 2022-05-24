Array.prototype.myReduce = function (callbackFn, initialValue) {
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackFn) != "[object Function]") {
    throw new TypeError(callbackFn + " is not a function");
  }

  var acc = initialValue || this[0];
  var startIndex = initialValue ? 0 : 1;

  for (var i = startIndex, len = this.length; i < len; i++) {
    acc = callbackFn(acc, this[i], i, this);
  }
  return acc;
};

const arr = [1, 2, 3, 4];

arr.myReduce((total, cur) => total + cur); // 10
arr.myReduce((total, cur) => total + cur, 10); // 20
arr.myReduce("555"); // Uncaught TypeError: 555 is not a function
