var single = (function() {
  var instance
  var CreateSingleton = function(name) {
    this.name = name
    if (instance) {
      return instance
    }
    this.getName()
    return instance = this
  }
  CreateSingleton.prototype.getName = function() {
    console.log(this.name)
  }
  return CreateSingleton
})()

var a = new single('a')