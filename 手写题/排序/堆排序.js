function heapSort(arr) {
  let len

  let heapify = function(arr, i) {
    let left = 2 * i + 1
    let right = 2 * i + 2
    let largest = i

    if (left < len && arr[left] > arr[largest]) {
      largest = left
    }
    if (right < len && arr[right] > arr[largest]) {
      largest = right
    }

    if (largest !== i) {
      swap(arr, i, largest)
      heapify(arr, largest)
    }
  } 

  let buildMaxHeap = function(arr) {
    len = arr.length
    for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
      heapify(arr, i)
    }
  }

  buildMaxHeap(arr)
  for (let i = arr.length - 1; i >= 0; i--) {
    swap(arr, 0, i)
    len--
    heapify(arr, 0)
  }
  return arr
}

function swap(arr, left, right) {
  let temp = arr[left]
  arr[left] = arr[right]
  arr[right] = temp
}

heapSort([5, 2, 7, 3, 6, 1, 4])

function heapSort(arr) {
  let len

  let heapify = function(arr, i) {
    let left = 2 * i + 1
    let right = 2 * i + 2
    let largest = i

    if (left < len && arr[left] > arr[largest]) {
      largest = left
    }

    if (right < len && arr[right] > arr[largest]) {
      largest = right
    }
    if (largest !== i) {
      swap(arr, largest, i)
      heapify(arr, largest)
    }
  }

  let buildMaxHeap = function(arr) {
    len = arr.length
    for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
      heapify(arr, i)
    }
  }
  buildMaxHeap(arr)
  for (let i = len - 1; i >= 0; i--) {
    swap(arr, 0, i)
    len--
    heapify(arr, 0)
  }
  return arr
}