// 手写一个repeact()函数，加上下面的代码运行，使每3秒打印一个helloword，总共执行4次
function repeact(cb, count, wait) {
  const self = this
  this.cb = cb
  this.count = count
  this.wait = wait
  return function(str) {
    for(let i = 0; i < self.count; i++) {
      setTimeout(() => {
        self.cb(str)
      }, wait * (i + 1))
    }
  }
}

const repeatFunc = repeact(console.log,4,3000)
repeatFunc('helloword')