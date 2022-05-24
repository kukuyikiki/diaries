const printData = async function(filePath) {
  let keyWord = await readFile(filePath)
  let count = await queryDB(keyWord)
  let data = await getdata(count)
  console.log(data)
}
printData('./sample.txt')