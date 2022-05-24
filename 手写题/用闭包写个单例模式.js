var Singleton = (function(){
  var instance
  var CreateSingleton = function(name) {
    this.name = name
    // 已经存在instance了，就直接return
    if(instance) {
      return instance
    }

    this.getName();

    // instance = this
    // return instance
    return instance = this
  }
  CreateSingleton.prototype.getName = function() {
    console.log(this.name)
  }
  // console.log(CreateSingleton, 'crea')
  return CreateSingleton
})()

var a = new Singleton('a')

var b = new Singleton('b')

console.log(a === b)

var mySingle = (function() {
  var instance
  var single = function(name) {
    this.name = name
    if (instance) {
      return instance
    }
    this.getName()
    return instance = this
  }
  single.prototype.getName = function() {
    return this.name
  }
  return single
})()

let a = new mySingle('a')