const arr = [1 , 3, 5, 6, 1, 5, 6, 8]

// indexOf
function indexOfFunction(arr) {
  const ans = []
  const len = arr.length
  for (let i = 0; i < len; i++) {
    if (ans.indexOf(arr[i]) === -1) {
      ans.push(arr[i])
    }
  }
  return ans
}

// set
function setAr(arr) {
  return [...new Set(arr)]
}

// object
function objectArr(arr) {
  let obj = {}
  const ans = []
  const len = arr.length
  for (let i = 0; i < len; i++) {
    obj[arr[i]] = true
  }

  for (let i in obj) {
    ans.push(i)
  }

  return ans.map(item => {
    return Number(item)
  })
}

console.log(indexOfFunction(arr), '1')
console.log(setAr(arr), '2')
console.log(objectArr(arr), '3')




const arr = [1, 2, 3, 4, 5, 6, 1, 3, 5, 6]

function indexOfFunction(arr) {
  if (!arr instanceof Array || arr.length === 0) {
    return false
  }

  const ans = []
  const len = arr.length
  for (let i = 0; i < len; i++) {
    if (ans.indexOf(arr[i]) === -1) {
      ans.push(arr[i])
    }
  }
  return ans
}

function setFunction(arr) {
  if (!arr instanceof Array || arr.length === 0) {
    return false
  }

  const ans = new Set(arr)
  return Array.from(ans)
}

function objectFunction(arr) {
  if (!arr instanceof Array || arr.length === 0) {
    return false
  }

  const ans = {}
  const res = []
  const len = arr.length
  for (let i = 0; i < len; i++) {
    ans[arr[i]] = true
  }

  for (let item in ans) {
    res.push(item)
  }

  return res.map(item => {
    return Number(item)
  })
}

console.log(indexOfFunction(arr))
console.log(setFunction(arr))
console.log(objectFunction(arr))


function indexOfFunction(arr) {
  if (!arr instanceof Array || arr.length === 0) {
    return
  }
  const ans = []
  const len = arr.length
  for (let i = 0; i < len; i++) {
    if (ans.indexOf(arr[i]) === -1) {
      ans.push(arr[i])
    }
  }
  return ans
}

function setFunction(arr) {
  if (!arr instanceof Array || arr.length === 0) {
    return
  }
  // const mySet = [...new Set(arr)]
  // return mySet
  const mySet = new Set(arr)
  return Array.from(mySet)
}

function objectFunction(arr) {
  if (!arr instanceof Array || arr.length === 0) {
    return
  }

  const len = arr.length
  const myObj = {}
  const ans = []

  for (let i = 0; i < len; i++) {
    myObj[arr[i]] = true
  }

  for (let item in myObj) {
    ans.push(item)
  }

  return ans.map(item => {
    return Number(item)
  })
}

function countPrimes( arr ) {
  const mySet = new Set()
  arr.forEach((item) => {
      return mySet.add(item)
  })
  let myArr = Array.from(mySet), ans = 0
  const isPrime = function(n) {
    console.log(typeof n, 'typeof')
    for(let i = 2; i < n; i++) {
      console.log(n % i, 'nnniii');
      if (n % i === 0) {
        return true
      }
    }
    return false
  }
  for (let i = 0, len = myArr.length; i < len; i++) {
    console.log(myArr, myArr[i])
      if (isPrime(myArr[i])) {
        console.log('11111')
          ans++
      }
  }
  return ans
}

countPrimes([1,2,3,5,7,11,1,-1,-2,-3122,29])