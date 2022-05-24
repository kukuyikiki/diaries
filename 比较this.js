var a=11;
function test2(){
  this.a=22;
  let b=()=>{console.log(this.a)}
  b();
}
var x=new test2(); // 22

var x = 11
var obj = {
  x = 22,
  say: () => {
    console.log(this.x)
  }
}
obj.say() // 11

let a = [1, 3, 5]
Object.defineProperty(a,)

function aa(obj, key) {
  let arr = key.split('.')
  const len = arr.length
  let temp = obj
  for (let i = 0; i < len; i++) {
    if (arr[i].indexOf('[') !== -1) {
      temp = temp[arr[i][0]]
      console.log(temp, 'temp')
      temp = temp[arr[i].slice(2,3)]
    } else {
      temp = temp[arr[i]]
    }
    
  }
  return temp
}
const obj = {a:[{b:{c:3}}]}
aa(obj, 'a[0].b.c')