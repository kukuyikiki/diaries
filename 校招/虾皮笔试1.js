function aa(k, w, profits, capital) {
  const len = profits.length
  let tempArr = new Array(len).fill(0)
  for (let i = 0; i < len; i++) {
      tempArr[i] = profits[i] - capital[i]
  }
  let find = tempArr.slice()
  find.sort((a, b) => {
      return a - b
  })
  let over = [], ans = [w]
  while (k > 0) {
      for (let i = len - 1; i >= 0; i--) {
          let index = tempArr.indexOf(find[i])
          if (w >= capital[index] && over.indexOf(i) === -1) {
              w += find[i]
              over.push(i)
              k--
              ans.push(profits[index])
              break
          }
      }
  }
  return ans.reduce((pre, item) => {
      return pre + item
  }, 0)
}
// aa(2, 0, [1,2,3], [0, 1, 1])
aa(2, 1, [1,2,3], [1, 1, 1])