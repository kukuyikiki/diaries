function findMax(arr) {
  if (!arr || !arr instanceof Array) {
    return 0
  }

  let left = 1, right = arr.length - 1
  while (left < right) {
    let mid = left + ((right - left) >> 1)
    if (arr[mid] > arr[mid + 1]) {
      right--
    } else {
      left++
    }
  }
  return arr[left]
}

findMax([1,3,5,7,9,8,6,4,2])