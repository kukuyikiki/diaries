var CQueue = function() {
  this.stack1 = [];
  this.stack2 = [];
}

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
  this.stack1.push(value)
}

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
  if(this.stack1.length > 0) {
    return this.stack2.shift()
  } else {
    return -1
  }
}

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */