/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    if (!head) {
        return null
    } else {
        let fastNode: ListNode | null = head
        let slowNode: ListNode | null = head
        while (n > 0) {
            fastNode && (fastNode = fastNode.next)
            n--
        }
        if (fastNode === null) {
            return head.next
        }
        while (fastNode?.next) {
            fastNode && (fastNode = fastNode.next)
            slowNode && (slowNode = slowNode.next)
        }
        slowNode && slowNode.next && (slowNode.next = slowNode.next.next)
        return head
    }
}
