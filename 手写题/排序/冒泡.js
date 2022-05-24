function sort(arr) {
  if (!arr || !arr instanceof Array) {
    return false
  }

  dubo(arr)
  return arr
}

function dubo(arr) {
  let len = arr.length
  for(let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      if (arr[j] < arr[j + 1]) {
        swap(arr, j, j + 1)
      }
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