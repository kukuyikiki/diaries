// 确定参数的函数柯里化实现
function sum(a, b, c, d) {
  return a + b + c + d;
}

function curry(fn) {
  return function sum1(...rest) {
    let args = rest;
    if (args.length < fn.length) {
      // 判断接受的参数是否小于函数的参数长度
      return function () {
        // 参数不够长度，再次接受传递参数
        return sum1(...args, ...arguments);
      };
    }
    return fn(...args); // 不要求改变this,
  };
}
let curried = curry(sum);
console.log(curried(1)(2)(3)(4)); //10
console.log(curried(1, 2)(2, 4)); //9

// 函数柯里化可复用
function curry1(fn, len = fn) {
  return _curry.call(fn, len);
}
let _curry = function (fn, len, ...args) {
  return function (...rest) {
    let _args = [...args, ...rest];
    if (_args.length >= len) {
      return fn.apply(this, _args);
    } else {
      return _curry.call(this, fn, len, ..._args);
    }
  };
};

let _fn = curry(function (a, b, c, d, e) {
  console.log(a, b, c, d, e);
});

// 普通的add函数
// 普通的add函数
function add(x, y) {
  return x + y;
}

// Currying后
function curryingAdd(x) {
  return function (y) {
    return x + y;
  };
}

add(1, 2); // 3
curryingAdd(1)(2); // 3

// 参数复用
// 正常正则验证字符串 reg.test(txt)

// 函数封装后
function check(reg, txt) {
  return reg.test(txt);
}

check(/\d+/g, 'test'); //false
check(/[a-z]+/g, 'test'); //true

// Currying后
function curryingCheck(reg) {
  return function (txt) {
    return reg.test(txt);
  };
}

var hasNumber = curryingCheck(/\d+/g);
var hasLetter = curryingCheck(/[a-z]+/g);

hasNumber('test1'); // true
hasNumber('testtest'); // false
hasLetter('21212'); // false

// 闭包
// sum(1, 2)(3)(4)(5, 6, 7)() // 返回28
function sum(...rest) {
  let args = rest;
  if (args.length === 0) return 0;

  return function partialSum(...rest) {
    args = [...args, ...rest];
    if (rest.length === 0) {
      return args.reduce((pre, cur) => pre + cur);
    } else {
      return partialSum;
    }
  };
}
