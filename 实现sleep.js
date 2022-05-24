//1. while循环
function mySleep(ms) {
  start = new Date()
  end = start + ms
  while (end > new Date());
  console.log('1111')
  return
}

//2.通过promise
function mySleep(ms) {
  let temp = new Promise((resolve, reject) => {
    console.log('1111')
    setTimeout(resolve, ms)
  })
  return temp
}

mySleep(500).then(() => {
  console.log('222')
})

// 3.通过async封装
function mySleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

async function test() {
  let temp = await mySleep(500);
  console.log('1111')
}

test()

// 4. 通过generate实现
function* mySleep(ms) {
  yield new Promise((resolve, reject) => {
    console.log('1111')
    setTimeout(resolve, ms)
  })
}
mySleep(500).next().value.then(() => {
  console.log('222')
})