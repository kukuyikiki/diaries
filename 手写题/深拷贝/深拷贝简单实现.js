// 深拷贝
function deepClone(obj){
  var newObj= obj instanceof Array ? []:{};
  for(var item in obj){
    if (obj.hasOwnProperty(item)) {
      var temple= typeof obj[item] == 'object' ? deepClone(obj[item]) : obj[item]
      newObj[item] = temple;
    }
  }
  return newObj;
}

let arr = [1,2,3,[5,6,[7]]]
let a = deepClone(arr)
console.log(a)

// 数组扁平化
function flatten(arr) {
  return arr.reduce((result, item)=> {
      return result.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

let arr = [1,2,3,[5,6,[7]]]
flatten(arr)

var a=11;
function test2(){
  this.a=22;
  return ()=>{
    console.log(this)
    console.log(this.a)
  }
}
var x = new test2();
x()



function deepCopy(obj) {
  if (typeof obj !== 'object') {
    return
  }

  const newObj = obj instanceof Array ? [] : {}

  for (let item in obj) {
    if (obj.hasOwnProperty(item)) {
      newObj[item] = typeof obj[item] === 'object' ? deepCopy(obj[item]) : obj[item]
    }
  }
  return newObj
}