var obj = function Teacher(name) {

  //这是私有属性，外界不能访问
  var age = 23;

  //这是公有属性，外界可以访问
  this.name = name;
  
  //想要访问私有变量age，只能在这里编写方法来访问。其余的地方都不行！
  //我们通常就是在这里编写公有方法来访问私有属性
};