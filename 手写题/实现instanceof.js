function new_instanceof(leftValue, rightValue){
  if (typeof leftValue !== 'object' || leftValue === null) {
    return false
  }
  let rightProto = rightValue.prototype // 取右表达式的prototype值
  leftValue = leftValue.__proto__ // 取左表达式的_proto_值
  while (true){
    if (leftValue === null) {
      return false
    }
    if (leftValue === rightProto) {
      return true
    }
    leftValue = leftValue.__proto__
  }
}
console.log(new_instanceof('11', Object))
console.log('11' instanceof Object)
const arr = [
  { name: 'Sam', age: 23 },
  { name: 'Vince', age: 22 },
]

let temp = arr.reduce(function(prev, item, index){
  prev[item.name] = item.age
  return prev
}, {})
console.log(temp)