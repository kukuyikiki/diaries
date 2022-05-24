function sum(a, b) {
  if (a === 0) return b
  if (b === 0) return a
  let newA = a ^ b
  let newB = (a & b) << 1
  return sum(newA, newB)
}

sum(8, 8)
// 需要将两个数进行异或操作，然后进位

// 使用异或实现相加
function sum(a, b) {
  if (a === 0) return b
  if (b === 0) return a
  let newA = a ^ b
  let newB = (a & b) << 1
  return sum(newA, newB)
}

function aa(a,b) {
  console.log(arguments)
}

function bb() {}
aa(1,2,3,bb)

class R {
  constructor(age) {
    this.age = age
  }
  getAge() {
    return this.age
  }
}

let r = new R(10)
console.log(r)
console.log(R)

class J extends R {
  constructor(name) {
    super()
    this.name = name
  }
  getAge() {
    return (`${this.age}-${this.name}`)
  }
}

let j = new J('tom')
console.log(j)
console.log(J)


async function async1() {
  console.log('1')
  let a11 = await async2()
  console.log(a11,'2')
}

async function async2() {
  // return new Promise((resolve,reject) => {
    console.log('4');
    return 4
  // })
}

console.log('5')
setTimeout(() => {
  console.log('6')
}, 0)
async1()

new Promise(function(resolve) {
  console.log('7')
  resolve()
}).then(function() {
  console.log('8')
})
console.log('9')