Array.prototype.myMap = function(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('this is not a function')
  }
  let arr = this
  const res = []
  arr.forEach(item => {
    res.push(fn(item))
  });
  return res
}