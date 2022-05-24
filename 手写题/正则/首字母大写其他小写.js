let regex = /(?:^|\s+)\w/g
let str = "do you"
str.toLowerCase().replace(regex, (match) => {
  return match ? match.toUpperCase() : ''
})
