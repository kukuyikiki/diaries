function Person(name) {
  this.name = name;
  this.sum = function () {
    return this.name;
  };
}
Person.prototype.age = 16;

function Content(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
// 函数的主要作用是为构造函数新增属性和方法，以增强函数
function Student(obj) {
  let temp = Content(obj);
  temp.name = 'xixixi';
  return temp;
}

let per = new Person();

let stu = new Student(per);

console.log(stu.name);
console.log(stu.age);
console.log(stu instanceof Person);

// 核心：在原型式继承的基础上，增强对象，返回构造函数

// 缺点（同原型式继承）：

// 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
// 无法传递参数
