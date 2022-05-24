// 最大连续子数组,输出值和索引
function maxLen(nums) {
  if (!nums || !nums instanceof Array) {
    return 0
  }
  const len = nums.length
  let path = [], start = 0, end = 0
  const myMap = new Map()
  for (let i = 0; i < len; i++) {
    if (!myMap.has(nums[i])) {
      myMap.set(nums[i], i)
    } else {
      myMap.delete(myMap.keys().next.value)
    }
  }
  for (const item of myMap.keys()) {
    path.push(item)
  }
  console.log(myMap, path, 'myMappath')
}

maxLen([1, 2, 3, 8, 5, 6, 9, 1, 5, 9, 6])