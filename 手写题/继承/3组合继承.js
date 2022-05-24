// 组合继承
function Person(name) {
  this.name = name
  this.getName = function() {
    return this.name
  }
}
Person.prototype.age = 18

function Student() {
  Person.call(this, 'xixi')
}
Student.prototype = new Person()

let stu = new Student()

// 组合继承：相当于构造继承和原型链继承的组合体。
//          通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用

// 特点：可以继承实例属性/方法，也可以继承原型属性/方法

// 缺点：调用了两次父类构造函数，生成了两份实例