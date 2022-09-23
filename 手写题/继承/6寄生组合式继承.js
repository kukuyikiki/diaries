// 寄生组合继承
function Person(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  };
}
Person.prototype.age = 16;

function Content(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

let con = Content(Person.prototype);

function Student() {
  Person.call(this, 'xixi');
}

Student.prototype = con;
con.constructor = Student;

let stu = new Student();

console.log(stu instanceof Person);
console.log(stu.name);
console.log(stu.age);

let per = new Person();
console.log(per instanceof Person);
console.log(per instanceof Student);
console.log(con instanceof Person);
console.log(con instanceof Student);
// 通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性

// 这是最成熟的方法，也是现在库实现的方法

(() => {
  function Person(name) {
    this.name = name;
    this.getName = function () {
      return this.name;
    };
  }

  function Content(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  }

  function Student() {
    Person.call(this);
  }

  let con = Content(Person.prototype);
  Student.prototype = con;
  con.constructor = Student;

  let stu = new Student();

  // 1.通过空对象作为媒介，解除父类与子类的关系，避免出现子类实例既是子类也是父类的实例
  // 2.砍掉父类的实例属性（第二次直接用父类原型），在调用父类构造的时候，避免了初始化两次实例
})();
