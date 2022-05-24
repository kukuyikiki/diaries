function first() {
  for(let i = 1; i < 3; i++) {
    setTimeout(() => {
      console.log(i)
    }, i * 1000)
  }
}

function first() {
  for(var i = 1; i < 3; i++) {
    (function(i) {
      setTimeout(() => {
        console.log(i)
      }, i * 1000)
    })(i)
  }
}