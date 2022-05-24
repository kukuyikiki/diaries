function sort(arr) {
  let minIndex = 0, maxIndex = 0, tem;
  for (let index = 0, len = arr.length; index < len; index++) {
    if (arr[index] < arr[minIndex]) {
      minIndex = index;
    }

    if (arr[index] > arr[maxIndex]) {
      maxIndex = index;
    }
  }
  tem = arr[maxIndex]
  arr[maxIndex] = arr[minIndex]
  arr[minIndex] = tem
  console.log(arr)
}

sort([1, 5, 4, 8, 2, 1, 6])

// 斐波那契
function bag(count) {
  let arr = []
  let ans = 0, left = 0, right = 1
  arr[left] = 0
  arr[right] = 1

  if (count === 0) {
    return arr[left]
  }
  if (count === 1) {
    return arr[right]
  }

  for (let i = 1; i < count; i++) {
    ans = arr[left] + arr[right]
    arr[++left] = arr[right]
    arr[++right] = ans
  }
  console.log(ans)
}

bag(25)
