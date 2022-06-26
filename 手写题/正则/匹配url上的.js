// [&|?] &/?后面的
// [^&]* 匹配所有不是&的
// &|$ 结尾是&或者没了
const getQueryName = (name) => {
  const queryNameRegex = new RegExp(`[&|?]${name}=([^&]*)(&|$)`)
  const queryNameMatch = window.location.search.match(queryNameRegex)
  return queryNameMatch ? decodeURIComponent(queryNameMatch[1]) : ''
}
getQueryName('tagId')
