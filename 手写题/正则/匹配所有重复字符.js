// const collectRepeatStr = (str) => {
//   let repeatStrs = []
//   const repeatRe = /(.+)\1+/g
//   // 很多时候replace并不是用来做替换，而是做数据提取用
//   str.replace(repeatRe, ($0, $1) => {
//     $1 && repeatStrs.push($1)
//   })
  
//   return repeatStrs
// }


// console.log(collectRepeatStr('11')) // ["1"]
// console.log(collectRepeatStr('12323')) // ["23"]
// console.log(collectRepeatStr('12323454545666')) // ["23", "45", "6"]
// 重复字符
const collectRepeatStr = (str) => {
  let repeatStrs = []
  const repeatRe = /(.+)\1+/g
  // 很多时候replace并不是用来做替换，而是做数据提取用
  str.replace(repeatRe, ($0, $1) => {
    $1 && repeatStrs.push($1)
  })
  
  return repeatStrs
}
// 匹配url
const getQueryName = (name) => {
  const queryNameRegex = new RegExp(`[&|?]${name}=([^&]*)(&|$)`)
  const queryNameMatch = window.location.search.match(queryNameRegex)
  return queryNameMatch ? decodeURIComponent(queryNameMatch[1]) : ''
}
getQueryName('tagId')
// 去除空格法
const trim1 = (str) => {
  return str.replace(/^\s*|\s*$/g, '')    
}
// 15939999607
// ？= 从后往前  前向查找
// ^ 表示以...为首，$ 表示以...为末尾
let regex = /(?=(\d{4})+$)/g
let str = '15939999607'
str.replace(regex, '-')
// 首字母大写
let regex = /(?:^|\s+)\w/g
let str = "do you"
str.toLowerCase().replace(regex, (match) => {
  return match ? match.toUpperCase() : ''
})
// 带小数
const formatNum = (numStr) => {
  const regex = new RegExp(`(?!^)(?=(\\d{3})+${numStr.includes('.') ? '\\.' : '$'})`, 'g')
  return numStr.replace(regex, ',')
}
function doChange(str) {
  // - 空格 _后面有可能不跟任何东西 如(__、--)
  // 注意(.)?这里的?是为了满足条件2
  let regex = /[-|_|\s]+(.)?/g

  // char 是对应 $1
  return str.replace(regex, (match, char) => {
    return char ? char.toUpperCase() : ''
  })
}