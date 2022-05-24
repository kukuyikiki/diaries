/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
  if (head === null) {
    return null
  }
  let node = head
  let m = new Map();
  while (node) {
    m.set(node, new Node(node.val))
    node = node.next
  }
  node = head
  while(node) {
    m.get(node).next = node.next ? m.get(node.next) : null
    m.get(node).random = node.random ? m.get(node.random) : null
    node = node.next
  }
  node = head
  return m.get(node)
};