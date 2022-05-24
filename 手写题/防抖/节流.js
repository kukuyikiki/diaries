function debounce(fn,delay){
  let timer = null //借助闭包
  return function() {
    const context = this
    const args = [...arguments]
    if(timer){
      return
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
      timer = null
    }, delay)
  }
}

function show(res) {
  console.log(res)
}

let ff = debounce(show, 1000)
ff(111)