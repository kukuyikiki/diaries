function create(context) {
  const obj = new Object();
  obj.__proto__ = context.prototype;
  // context执行完可能会返回一个null/undefined
  const result = context.apply(obj, [...arguments].slice(1));
  return typeof result === "object" ? result : obj;
}

function create(context) {
  let res = new Object();
  res.__proto__ = context.prototype;
  let ans = context.apply(res, [...arguments].slice(1));
  return typeof ans === "object" ? ans : res;
}
