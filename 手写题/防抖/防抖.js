function debounce(fn,delay){
  let timer = null //借助闭包
  return function() {
    const context = this
    const args = [...arguments]
    if(timer){
      clearTimeout(timer) 
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

function show(res) {
  console.log(res)
}

let myFunction = debounce(show, 1000)
myFunction(111)
