let readFile = new FileReader()

readFile().then(content => {
  return queryDB(content)
}).then(res => {
  return getData(res.lenth)
}).then(data => {
  console.log(data)
})