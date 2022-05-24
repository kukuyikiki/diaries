function search(arr, target) {
  if (!arr || !arr instanceof Array) {
    return
  }

  let left = 0, right = arr.length - 1
  let mid = Math.floor((right - left) >> 1) + left
  while (left <= right) {
    if (arr[mid] < target) {
      left = mid + 1
    } else if (arr[mid] > target) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return -1
}