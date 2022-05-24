const { resolve } = require("path")

const gen = function* () {
  yield 1
  yield 2
  yield 3
}

let g = gen()
g.next()
g.next()
g.next()
g.next()

async function aa() {
  // ...
}

// 相当于
function aa (args) {
  return bb(function* () {
    // ...
  })
}

function bb(gen) {
  return new Promise((resolve, reject) => {
    let g = gen()

    const next = function(nextF) {
      let result
      try {
        result = nextF()
      } catch(e) {
        return reject(e)
      }
      if (result.done) {
        return resolve(result.value)
      }
      Promise.resolve(result.value).then((data) => {
        next(function() { return g.next(data) })
      }, function(e) {
        next(function(e) { return g.throw(e) })
      })
    }

    return next(function() { return g.next(undefined) })
  })
}