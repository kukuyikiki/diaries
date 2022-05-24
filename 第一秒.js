// let块级作用域
for (let i = 0; i < 5; i++){
  setTimeout(function() {
    console.log(i)
  }, 1000 * i)
}

// 闭包
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(() => {
      console.log(i)
    }, i * 1000)
  })(i)
}

// 立即执行函数
for (var i = 0; i < 6; i++) {
  (function(j){
    liList[j].onclick = function() {
      console.log(j)
    }
  })(i)
}