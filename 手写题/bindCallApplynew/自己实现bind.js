// call
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

// apply
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  context = context || window;
  context.fn = this;
  let result;
  // 处理参数和 call 有区别
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

// bind
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  const _this = this;
  const args = [...arguments].slice(1);
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};
