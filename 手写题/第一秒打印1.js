// let
function doOne() {
  for (let i = 0; i < 2; i++) {
    setTimeout(() => {
      console.log(i + 1)
    }, (i + 1) * 1000)
  }
}
doOne()

// 立即执行函数
function one() {
  for (var i = 0; i < 2; i++) {
    (function(i) {
      setTimeout(() => {
        console.log(i +1 )
      }, (i + 1) * 1000)
    })(i)
  }
}
one()