function a(arr, str) {
  const row = arr.length
  const column = arr[0].length
  let endX = 0, endY = 0
  const dfs = function(x, y, i) {
    if (str[i] === 'S') {
      if (arr[x + 1][y] === 1) {
        dfs(x, y, i += 1)
      } else 
      dfs(x + 1, y, i += 1)
    } else if (str[i] === 'A') {
      if (arr[x][y - 1] === 1) {
        dfs(x, y, i += 1)
      } else 
      dfs(x, y - 1, i += 1)
    } else if (str[i] === 'D'){
      if (arr[x][y + 1] === 1) {
        dfs(x, y, i += 1)
      } else 
      dfs(x, y + 1, i += 1)
    } else if (str[i] === 'W'){
      if (arr[x - 1][y] === 1) {
        dfs(x, y, i += 1)
      } else 
      dfs(x - 1, y, i += 1)
    } else {
      return ([endX, endY] = [x, y])
    }
  }
  dfs(1, 1, 0)
  return [endX, endY]
}
let b = [[1, 1, 1, 1],[1,0,0,0],[1,1,1,0],[1,0,0,0]]
let s = 'SDWDSSA'
a(b, s)

window.a = 300
function fn1() {
  this.a = 100
  this.b =200
  return function() {
    alert(this.a)
  }.call(arguments[0])
}
function fn2() {
  this.a = new fn1()
}

var a = new fn1().b
var v = new fn1(fn2())

function *cb(x, y) {
  for(let i = Math.ceil(x); i <= y; i++) {
    yield i
  }
}

var a = cb(6, 9)
console.log(a.next());
console.log(a.next());
