function Person() {
  this.name = 'xixix'
  this.sum = function() {
    console.log(this.name)
  }
}

Person.prototype.age = 13

function Student() {
  this.name = 'hhhh'
}

Student.prototype = new Person()

let stu = new Student()

console.log(stu.age)
console.log(stu.name)
console.log(stu instanceof Person)

// 特点：基于原型链，既是父类的实例，也是子类的实例

// 缺点：无法实现多继承
    // 当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享
    // 不能向父类构造函数传参