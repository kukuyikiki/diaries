Object.defineProperty(Object, 'assign', {
  value: function(target, ...args) {
    if (target == null) {
      return new TypeError('Cannot convert undefined or null to object');
    }
    
    // 目标对象需要统一是引用数据类型，若不是会自动转换
    const to = Object(target);

    for (let i = 0; i < args.length; i++) {
      // 每一个源对象
      const nextSource = args[i];
      if (nextSource !== null) {
        // 使用for...in和hasOwnProperty双重判断，确保只拿到本身的属性、方法（不包含继承的）
        // for (const nextKey in nextSource) {
        for (const nextKey of Reflect.ownKeys(nextSource)) {
          // if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          // }
        }
      }
    }
    return to;
  },
  // 不可枚举
  enumerable: false,
  writable: true,
  configurable: true,
})

let rr = Symbol.for('1')
let tt = Symbol.for('1')
let a = {
  b: '1',
  c: {
    d: '2',
    e: '4'
  },
  [tt] : '2'
}
let aaa = {
  f: '-66',
  c: {
    g : '=',
    h : '111'
  },
  [rr] : '1'
}

Object.assign(a, aaa)
console.log(a)
