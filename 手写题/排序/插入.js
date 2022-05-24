function sort(arr) {
  if (!arr || !arr instanceof Array) {
    return false
  }
  
  insert(arr)
  return arr
}

function insert(arr) {
  let len = arr.length
  for (let i = 1; i < len; i++) {
    for(let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
}

function swap(arr, left, right) {
  let temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp
}

sort([2,5,6,3,4,9,7,8])
