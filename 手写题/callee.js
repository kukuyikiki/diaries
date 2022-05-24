var currrying = function(fn) {
  var args = []

  return function() {
    if (arguments.length === 0){
      return fn.apply(this, args)
    } else {
      console.log(arguments.callee, 'callee')
      ;[].push.apply(args, arguments)
      return arguments.callee // callee 是当前函数
    }
  }
}

var cost = (function() {
  var money = 0

  return function() {
    for (var i = 0, l = arguments.length; i < l; i++) {
      money += arguments[i]
    }
    return money
  }
})()

var cost = currrying(cost)

cost(100)
cost(200)
