/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  const ans = new ListNode(-1)
  let res = ans
  while(l1 != null && l2 != null) {
    if (l1.val > l2.val) {
      res.next = l2
      l2 = l2.next
    } else {
      res.next = l1
      l1 = l1.next
    }
    res = res.next
  }
  res.next = l1 === null ? l2 : l1
  return ans.next
};

// 递归
var mergeTwoLists = function(l1, l2) {
  if (l1 === null) {
    return l2
  } else if (l2 === null) {
    return l1
  } else if (l1.val > l2.val) {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  } else {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  }
};

// 频次排序
let arr = [1,3,5,3,5,5,7,8,9,8,8,4,4,4,1,3,7]

function get(arr) {
  const map = new Map()
  for (let item of arr) {
    if (map.has(item)) {
      let temp = map.get(item)
      map.set(item, temp + 1)
    } else {
      map.set(item, 1)
    }
  }
  const tempArr = Array.from(map)
  tempArr.sort((a, b) => {
    if (a[1] === b[1]) {
      return b[0] - a[0]
    } else {
      return a[1] - b[1]
    }
  })
  console.log(tempArr, 'tempArr')
}
get(arr)