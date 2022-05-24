// 约定
class Example {
	constructor() {
		this._private = 'private';
	}
	getName() {
		return this._private
	}
}

var ex = new Example();

console.log(ex.getName()); // private
console.log(ex._private); // private

// 闭包
const Example = (function() {
  var _private = '';

  class Example {
    constructor(name) {
      _private = name;
    }
    getName() {
      return _private;
    }
  }

  return Example;

})();

console.log(ex.getName()); // private
console.log(ex._private); // undefined

// 最新提案
class Point {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  equals(point) {
    return this.#x === point.#x && this.#y === point.#y;
  }
}

function foo() {}
function bar(){
  return {
    method: function(){}
  }
}

foo.prototype = new bar()

console.log(foo.prototype.constructor.__proto__.__proto__ === foo.__proto__.__proto__)
console.log(foo.prototype.__proto__ === bar.prototype)
console.log(foo.__proto__ instanceof bar)
console.log(foo.prototype instanceof bar)

for (var i = 1; i <= 5; i++) {
    setTimeout(function timer(j){
      console.log(j)
    }, 0, i)
}