function myBind() {
  if (typeof this != 'function') {
    throw new TypeError('this is not a function')
  }

  const self = this
  const context = [].shift.call(arguments)
  const args = [].slice.call(arguments)
  return function() {
    self.apply(context, [].concat.call(args, [].slice.call(arguments)))
  }
}

function myCall(context) {
  if (typeof this != 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result 
}


function myApply(context) {
  if (typeof this != 'function') {
    throw new TypeError('Error')
  }

  context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}