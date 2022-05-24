/**
 * @param {number[]} w
 */
var Solution = function(w) {
  if (!w instanceof Array || w.length === 0) return []
  
  this.len = w.length
  this.arr = w.slice()
  this.pre = arr[0]
  for (let i = 1; i < len; i++) {
    this.pre = this.arr[i] + pre
    this.arr[i] = pre
  }
  this.max = this.arr[len - 1]
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function() {
  const target = Math.ceil(Math.random() * this.max)
  let left = 0, right = this.len - 1
  while(left < right) {
    const mid = left + ((right - 1) >> 1)
    if (target < this.arr[mid]) {
      right = mid
    } else if (target > thia.arr[mid]) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return left
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */