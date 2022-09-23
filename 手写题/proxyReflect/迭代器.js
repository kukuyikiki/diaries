let obj = { name: 1, age: 2 };

Object.prototype[Symbol.iterator] = function () {
  let keys = Object.keys(this);
  let index = 0;
  return {
    next: function () {
      var done = index >= keys.length;
      var value = !done ? keys[index++] : undefined;
      return { done: done, value: value };
    },
  };
};
// 即通过ES6 Generator生成器next方法进行迭代。symbol不能new

function createIterator(items) {
  let i = 0;
  return {
    next: function () {
      let done = i >= items.length;
      let value = !done ? items[i++] : undefined;
      return {
        done: done,
        value: value,
      };
    },
    [Symbol.iterator]: function () {
      return this;
    },
  };
}
let iterator = createIterator([1, 2, 3]);
// ...iterator		// 1, 2, 3

// 给对象添加迭代器
let obj1 = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]: function () {
    let keys = Object.keys(this);
    let index = 0;
    return {
      next: function () {
        var done = index >= keys.length;
        var value = !done ? keys[index++] : undefined;
        return { done, value };
      },
    };
  },
};
for (const item of obj1) {
  console.log(item);
}

async function fn() {
  // **
}
