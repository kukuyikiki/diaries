function once(fn) {
  let etag
  return function() {
    if (etag) {return}
    const cotext = this
    const args = [...arguments]
    fn.call(cotext, args)
    return etag = this
  }
}

function o(v) {
  console.log(v)
}

let myOnce = once(fn)
myOnce(111)