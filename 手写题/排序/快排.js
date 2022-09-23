function sort(arr) {
  if (!arr || !arr instanceof Array) {
    return;
  }

  quickSort(arr, 0, arr.length - 1);
  return arr;
}

function quickSort(arr, left, right) {
  if (left < right) {
    let index = part(arr, left, right);
    quickSort(arr, left, index[0]);
    quickSort(arr, index[1] + 1, right);
  }
}

function part(arr, left, right) {
  let less = left - 1;
  let more = right;
  while (left < more) {
    if (arr[left] < arr[right]) {
      ++left;
      ++less;
    } else if (arr[left] > arr[right]) {
      swap(arr, left, --more);
    } else {
      ++left;
    }
  }
  swap(arr, left, right);
  return [less, more];
}

function swap(arr, left, right) {
  let temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}
sort([48, 62, 77, 55, 14, 35, 98]);
