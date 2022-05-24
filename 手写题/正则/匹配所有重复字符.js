const collectRepeatStr = (str) => {
  let repeatStrs = []
  const repeatRe = /(.+)\1+/g
  // 很多时候replace并不是用来做替换，而是做数据提取用
  str.replace(repeatRe, ($0, $1) => {
    $1 && repeatStrs.push($1)
  })
  
  return repeatStrs
}


console.log(collectRepeatStr('11')) // ["1"]
console.log(collectRepeatStr('12323')) // ["23"]
console.log(collectRepeatStr('12323454545666')) // ["23", "45", "6"]