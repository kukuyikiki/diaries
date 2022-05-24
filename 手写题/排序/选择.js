function sort(arr) {
  if (!arr || !arr instanceof Array) {
    return
  }
  choose(arr)
  return arr
}

function choose(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let min = i
    for (let j = i; j < len; j++) {
      if (arr[j] > arr[min]) {
        min = j
      }
    }
    if (min !== i) {
      swap(arr, min, i)
    }
  }
  return arr
}

function swap(arr, left, right) {
  let temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp
}

sort([2,5,6,3,4,9,7,8])