function Node(val) {
  this.val = val
  this.next = null
}
function Stack() {
  this.top = null
  this.next = null
}

Stack.prototype.push = function(node) {
  if (!this.top) {
    this.top = node
    this.length++
  } else {
    node.next = this.top
    this.top = node
    this.length++
  }
}

Stack.prototype.pop = function() {
  let res = this.top || undefined
  if (this.top) {
    this.top = this.top.next
    this.length--
  }
  return res
}

let stack = new Stack()
stack.push(new Node(1))
stack.push(new Node(2))
stack.pop()