// 原型式继承
function Person(name) {
  this.name = name
  this.getName = function() {
    return name
  }
}
Person.prototype.age = 13

const per = new Person()

function Student(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
let stu = Student(per)

// 利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。

//缺点: 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
//      无法传递参数