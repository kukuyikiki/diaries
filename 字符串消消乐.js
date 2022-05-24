function doReduce(s) {
  const len = s.length
  if (len === 0) {
    return ""
  }

  const res = ""
  let bp = false
  let c = s.charAt(0)
  for (let i = 1; i < len; i++){
    console.log(c, s.charAt(i), 'charA')
    if (c === s.charAt(i)) {
      bp = true
    } else {
      if (!bp) {
        console.log(res, c, 'resss')
        res = res + c
        console.log(res)
      }
      c = s.charAt(i)
      bp = false
    }
  }
  if (res.length + 1 < len) {
    return doReduce(res)
  }
  return res
}

let s = "abcccbxezzzrf7788fn"
doReduce(s)