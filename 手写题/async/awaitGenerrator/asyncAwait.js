async function fn() {
  // ...
}

// 等价于

function fn(args) {
  return pp(function* () {
      // ...
  })
}

function pp(gen) {
  return new Promise((resolve, reject) => {
      let g = gen()
      
      function next(nextF) {
          let result
          try {
              result = nextF()
          } catch(e) {
              return reject(e)
          }
          if (result.done) {
              return resolve(result.value)
          }
          Promise.resolve(result.value).then(function(v) {
              next(function() {return g.next(v)})
          }, function(e) {
              next(function(e) {return g.throw(e)})
          })
      }

      next(function() {return g.next(undefined)})
  })
}