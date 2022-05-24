function Person(name) {
  this.name = name 
  this.sum = function() {
    return this.name
  }
}

Person.prototype.age = 13

function Student() {
  Person.call(this, 'jer')
}

let stu = new Student()

console.log(stu.name)
console.log(stu.age)
console.log(stu instanceof Person)

// 特点：可以实现多继承；保证了原型链中引用类型的独立；能向父类构造函数传参

// 缺点：只能继承父类实例的属性和方法，不能继承原型上的属性和方法。