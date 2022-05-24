function new_instanceof(leftValue, rightValue){
  let rightProto = rightValue.prototype // 取右表达式的prototype值
  leftValue = leftValue._proto_ // 取左表达式的_proto_值
  while (true){
    if (leftValue === null) {
      return false
    }
    if (leftValue === rightProto) {
      return true
    }
    leftValue = leftValue._proto_
  }
}

const arr = [
  { name: 'Sam', age: 23 },
  { name: 'Vince', age: 22 },
]

let temp = arr.reduce(function(prev, item, index){
  prev[item.name] = item.age
  return prev
}, {})
console.log(temp)