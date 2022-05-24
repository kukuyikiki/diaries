function insertion(array) {
  if (!array || !array instanceof Array) return
  for (let i = 1; i < array.length; i++) {
    for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--)
      swap(array, j, j + 1);
  }
  return array;
}

function swap(arr, left, right) {
  let temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp
}