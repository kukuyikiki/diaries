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
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let ans: ListNode | null = null;
  let temp: ListNode | null = null;
  let add: number = 0;
  while (l1 || l2 || add) {
    let upVal: number = 0,
      downVal: number = 0;
    if (l1) {
      upVal = l1?.val;
    }
    if (l2) {
      downVal = l2?.val;
    }

    let sum: number = upVal + downVal + add;
    add = Math.floor(sum / 10);
    if (!ans) {
      ans = new ListNode(Math.floor(sum % 10));
      temp = ans;
    } else {
      temp && (temp.next = new ListNode(Math.floor(sum % 10)));
      temp && (temp = temp.next);
    }
    l1 && (l1 = l1.next);
    l2 && (l2 = l2.next);
  }

  return ans;
}
