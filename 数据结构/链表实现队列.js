function Node(val) {
  this.val = val
  this.next = null
}

function Queue() {
  this.front = null
  this.tail = null
  this.length = 0
}

Queue.prototype.insert = function(node) {
  if (!this.front) {
    this.front = this.tail = node
  } else {
    this.tail.next = node
    this.tail = node
  }
  this.length++
}

Queue.prototype.pop = function() {
  if (!this.length) {
    return -1
  }
  let res = this.front
  this.front = this.front.next
  this.length--

  if (!this.length) {
    this.tail = null
  }
  return res
}