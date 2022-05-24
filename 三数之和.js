/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  if (!nums instanceof Array) return

  if (nums.length < 3) {
    return []
  }

  nums.sort((a, b) => {
    return a - b
  })
  const len = nums.length
  const ans = []

  for (let i = 0 ; i < len - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue

    const target = -nums[i]
    let left = i + 1, right = len - 1
    while (left < right) {
      const sum = nums[left] + nums[right]
      
      if (target == sum) {
        ans.push([nums[left], nums[i], nums[right]])

        // 去重
        while (left < right && nums[left] === nums[++left]);
        while (left < right && nums[right] === nums[--right]);
      } else if (sum < target) {
        left++
      } else {
        right--
      }
    }
  }
  return ans
};

let nums = [0, 0, 0]
threeSum(nums)

function threeSum(arr) {
  if (!arr instanceof Array) {
    return []
  }

  if (arr.length < 3) {
    return []
  }
  // 排序
  nums.sort((a, b) => {
    return a - b
  })

  const len = arr.length
  const ans = []

  for (let i = 0; i < len - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue
    
    const target = -nums[i]
    let left = i + 1, right = len - 1
    while (left < right) {
      const sum = nums[left] + nums[right]

      if(sum === target) {
        ans.push([nums[left], nums[i], nums[right]])
        while (left < right && nums[left] === nums[++left]);
        while (left < right && nums[right] === nums[--right]);
      } else if (sum > target) {
        right--
      } else {
        left++
      }
    }
  }
  return ans
}

// 三数之和
function threeSum(arr) {
  if (!arr || !arr instanceof Array) {
    return []
  }
  if (arr.length < 3) {
    return []
  }

  arr.sort((a, b) => {
    return a - b
  })

  const ans = []
  const len = arr.length
  for (let i = 0; i < len - 2; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) continue

    let left = i + 1
    let right = len - 1
    const target = -arr[i]
    while (left < right) {
      const sum = arr[left] + arr[right]
      if (target === sum) {
        ans.push([arr[left], arr[i], arr[right]])

        while (left < right && arr[left] === arr[++left]);
        while (left < right && arr[right] === arr[--right]);
      } else if (target > sum) {
        right--
      } else {
        left++
      }
    }
  }
  return ans
}

const nums = [-1,0,1,2,-1,-4]
threeSum(nums)

function threeSum(arr) {
  if (!arr || ! arr instanceof Array) {
    return []
  }
  const len = arr.length
  if (len < 3) {
    return []
  }

  arr.sort((a, b) => {
    return a - b
  })
  const ans = []
  
  for (let i = 0; i < len - 2; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) continue
    let left = i, right = len - 1
    const target = -arr[i]
    while (left < right) {
      let sum = arr[left] + arr[right]
      if (sum === target) {
        ans.push([arr[left], arr[i], arr[right]])
        while(left < right && arr[right] == arr[--right]);
        while(left < right && arr[left] == arr[++left]);
      } else if (sum > target) {
        right--
      } else {
        left++
      }
    }
  }
  return ans
}

function buy(arr) {
  const len = arr.length
  let max = 0
  for (let i = 0; i < len - 1; i++) {
    let target = -arr[i]
    for ( let j = i; j < len - 1; j++) {
      max = Math.max(max, target + arr[j + 1])
    }
  }
  return max
}