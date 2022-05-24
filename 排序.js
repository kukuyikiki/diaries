function checkArray(array) {
  return Array.isArray(array)
}

function swap(array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
}

// 冒泡
function bubble(array) {
  checkArray(array)
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
      }
    }
  }
}

function bubble(array) {
  if (!array instanceof Array) return

  const len = array.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  return array
}

// 插入
function insertion(array) {
  if (!checkArray(array)) return
  for (let i = 1; i < array.length; i++) {
    for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
      swap(array, j, j + 1)
    }
  }
  return array
}

function insertion(arr) {
  if (!arr instanceof Array) return

  const len  = arr.length
  for (let i = 1; i < len; i++) {
    for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}


// 选择
function selection(array) {
  if (!checkArray(array)) return
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < array.length; j++) {
      minIndex = array[j] < array[minIndex] ? j : minIndex
    }
    swap(array, i, minIndex)
  }
  return array
}

function selection(arr) {
  if (!arr instanceof Array) return

  const len = arr.length
  for (let i = 0; i < len -1; i++) {
    let min = i
    for (let j = 0; j < len - i; j++) {
      if (arr[min] > arr[j]) {
        min = j
      }
    }
    if (min != i) {
      let temp = arr[min]
      arr[min] = arr[i]
      arr[i] = temp
    }
  }
  return arr
}

// 归并
function sort(array) {
  mergeSort(array, 0, array.length - 1)
  return array
}

function mergeSort(array, left, right) {
  // 左右索引相同说明已经只有一个数了
  if (left === right) return
  // 等同于 `left + (right - left) / 2`
  // 相比 `(left + right) / 2` 来说更加安全，不会溢出
  // 使用位运算是因为位运算比四则运算快
  let mid = parseInt(left + ((right - left) >> 1))
  mergeSort(array, left, mid)
  mergeSort(array, mid + 1, right)
  console.log(`${left}left+${mid}mid+${right}right`)
  let help = []
  let i = 0
  let p1 = left
  let p2 = mid + 1
  while (p1 <= mid && p2 <= right) {
    help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++]
    console.log(help[i-1] + '_1i')
  }
  while (p1 <= mid) {
    help[i++] = array[p1++]
    console.log(help[i-1] + '_2i')
  }
  while (p2 < right) {
    help[i++] = array[p2++]
    console.log(help[i-1] + '_3i')
  }

  for (let i = 0; i < help.length; i++) {
    array[left + i] = help[i]
    console.log(help[i] + '_4i')
  }
  return array
}
let arr = [3, 38, 5, 47, 36, 26]
sort(arr)

// 快排
function querySort(arr) {
  if (!arr instanceof Array || arr.length === 0) return []

  let len = arr.length
  for (let i = 0; i < len; i++) {
    let min = i;
    for(let j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    let temp = arr[i]
    arr[i] = arr[min]
    arr[min] = temp
  }
  console.log(arr)
}
let arr = [1, 3, 5, 2, 6]
querySort(arr)

// 选择排序 好
function checkArray(array) {
  return Array.isArray(array)
}
function swap(array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
}

// 快排
function sort(array) {
  if (!checkArray(array)) return
  quickSort(array, 0, array.length - 1);
  return array;
}

function quickSort(array, left, right) {
  if (left < right) {
    // 随机取值，然后和末尾交换，这样做比固定取一个位置的复杂度略低
    let indexs = part(array, left, right);
    quickSort(array, left, indexs[0]);
    quickSort(array, indexs[1] + 1, right);
  }
}
function part(array, left, right) {
  let less = left - 1;
  let more = right;
  while (left < more) {
    if (array[left] < array[right]) {
      // 当前值比基准值小，`less` 和 `left` 都加一
	    ++less;
      ++left;
    } else if (array[left] > array[right]) {
      // 当前值比基准值大，将当前值和右边的值交换
      // 并且不改变 `left`，因为当前换过来的值还没有判断过大小
      swap(array, --more, left);
    } else {
      // 和基准值相同，只移动下标
      left++;
    }
  }
  // 将基准值和比基准值大的第一个值交换位置
  // 这样数组就变成 `[比基准值小, 基准值, 比基准值大]`
  swap(array, right, more);
  return [less, more];
}

// 字节前端最常考 无重复字符的最长子串
var lengthOfLongestSubstring = function(s) {
  // 哈希集合，记录每个字符是否出现过
  const occ = new Set();
  const n = s.length;
  // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
  let rk = -1, ans = 0;
  for (let i = 0; i < n; ++i) {
      if (i != 0) {
          // 左指针向右移动一格，移除一个字符
          occ.delete(s.charAt(i - 1));
      }
      while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
          // 不断地移动右指针
          occ.add(s.charAt(rk + 1));
          ++rk;
      }
      // 第 i 到 rk 个字符是一个极长的无重复字符子串
      ans = Math.max(ans, rk - i + 1);
  }
  return ans;
};


// 滑动窗口 无重复字符的最长子串
function longString(str) {
  if (str.length === 0) return

  const mySet = new Set()
  let ans = 0, right = -1
  const len = str.length

  for (let i = 0; i < len; i++) {
    if (i !== 0) {
      mySet.delete(str.charAt(i - 1))
    }

    while (right + 1 < len && !mySet.has(str.charAt(right + 1))) {
      mySet.add(str.charAt(right + 1))
      right++
    }
    ans = Math.max(ans, right - i + 1)
  }
  return ans
}

let str = "abcabcbb"
longString(str)



function sort(arr) {
  if (!arr || !arr instanceof Array) {
    return false
  }

  quickSort(arr, 0, arr.length - 1)
  return arr
}

function quickSort(arr, left, right) {
  if (left < right) {
    let index = part(arr, left, right)
    quickSort(arr, left, index[0])
    quickSort(arr, index[1] + 1, right)
  }
}

function part(arr, left, right) {
  let less = left - 1
  let more = right
  if (left < more) {
    if (arr[left] < arr[right]) {
      ++less
      ++left
    } else if (arr[left] > arr[right]) {
      swap(arr, left, --more)
    } else {
      ++left
    }
  }
  swap(arr, left, right)
  return [less, more]
}

function swap(arr, left, right) {
  let temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp
}

let arr = [3, 8, 7, 9, 6, 5, 2]
sort(arr)
console.log(arr);