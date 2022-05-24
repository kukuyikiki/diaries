// for in 找不到属性name
let obj = {
  name: 'xixixi',
  getName: function() {
    return this.name
  }
}
Object.defineProperty(obj, 'name', {
  enumerable: false,
  // writable: false,
  configurable: false,
})

// 直接a.a undefined
class Person {
  constructor() {
    let a = 'xixixi'
    this.getA = function() {
      return a
    }
  }
}

let a = new Person()

// 直接per.name undefined
function product() {
  this.name = 'xixixi'
  this.getName = function() {
    return name
  }
}

let per = new Person()