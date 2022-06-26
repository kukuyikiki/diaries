function sort(arr) {
  if (!arr || !arr instanceof Array) {return}

  mergeSort(arr, 0, arr.length - 1)
  return arr
}

function mergeSort(arr, left, right) {
  if (left === right) { return }
  let mid = parseInt(left + ((right - left) >> 1))
  mergeSort(arr, left, mid)
  mergeSort(arr, mid + 1, right)

  let help = []
  let i = 0, p1 = left, p2 = mid + 1
  while(p1 <= mid && p2 <= right) {
    help[i++] = arr[p1] > arr[p2] ? arr[p1++] : arr[p2++]
  }
  while(p1 <= mid) {
    help[i++] = arr[p1++]
  }
  while(p2 <= right) {
    help[i++] = arr[p2++]
  }
  for(let i = 0; i < help.length; i++) {
    arr[left + i] = help[i]
  }
}
sort([2,5,9,1,4,3,8,6])

function ge(start, count, arr) {
  let end = start + count
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let temp = arr[i]
    let tempLen = temp.length
    let num = arr[i][0]
    for (let j = 1; j < tempLen; j++) {
      let tempNum = arr[i][j]
      let tempStart = start % (Math.pow(10, num))
      let tempEnd = end % (Math.pow(10, num))
      if (tempNum <= tempEnd && tempNum >= tempStart) {
        return 'YES'
      }
    }
  }
  return 'NO'
}
let arr = [
  [4, 4796],
  [5, 33888, 46388, 58888, 71388, 83888, 96388, 08888, 21388],
  [6, 984322, 484322],
  [7, 9772081, 1772081, 3772081, 5772081, 7772081, 7828685, 2828685],
  [8, 31962879, 51962879, 71962879, 91962879, 11962879],
  [9, 138672883, 075515829]
]
ge(170074784, 21, arr)

let ar = [[1,2], [2, 3]]
console.log(ar)

function sort(arr) {
  if (!arr || !arr instanceof Array) {
    return []
  }
  mergeSort(arr, 0, arr.length - 1)
  return arr
}

function mergeSort(arr, left, right){
  if (left === right) {return}
  let mid = parseInt((right - left)+ left >> 1 + left )
  mergeSort(arr, left, mid)
  mergeSort(arr, mid + 1, right)

  const help = []
  let p1 = left, p2 = mid + 1, i = 0
  while(p1 <= mid && p2 <= right) {
    help[i++] = arr[p1] > arr[p2] ? arr[p1++] : arr[p2++]
  }
  while (p1 <= mid) {
    help[i++] = arr[p1++]
  }
  while (p2 <= right) {
    help[i++] = arr[p2++]
  }
  for (let i = 0; i < help.length; i++) {
    arr[left + i] = help[i]
  }
}