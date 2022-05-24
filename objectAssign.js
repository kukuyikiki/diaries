class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  say() {
    return `我叫${this.name}，我今年${this.age}岁了`
  }
}

Object.assign(Person.prototype, {
  getName:function() {
    return this.name
  },
  getAge:function() {
    return this.age  
  }
})

var obj=new Person("laotie",88);
console.log(obj.getName());//laotie
console.log(obj.getAge());//88
