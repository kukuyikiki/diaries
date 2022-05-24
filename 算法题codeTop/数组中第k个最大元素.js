function kMax(arr, k) {
  if (!arr || !arr instanceof Array) {
    return 0
  }
  arr.sort((a, b) => {
    return a - b
  })
  const len = arr.length
  let left = 0, right = 0
  while(k > 0) {
    right++
    k--
  }
  while (right < len) {
    left++
    right++
  }
  return arr[left]
}