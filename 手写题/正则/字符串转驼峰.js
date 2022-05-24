function doChange(str) {
  // - 空格 _后面有可能不跟任何东西 如(__、--)
  // 注意(.)?这里的?是为了满足条件2
  let regex = /[-|_|\s]+(.)?/g

  // char 是对应 $1
  return str.replace(regex, (match, char) => {
    return char ? char.toUpperCase() : ''
  })
}
console.log(doChange("do_you"))
console.log(doChange("do-you"))
console.log(doChange("do you"))