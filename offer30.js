/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.stack.unshift(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  if (this.stack.length) {
    return this.stack.shift()
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  if (this.stack.length) {
    return this.stack[0]
  } else {
    return null
  }
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
  return Math.min.apply(Math, this.stack)
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */