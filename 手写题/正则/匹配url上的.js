// [&|?] &/?后面的
// [^&]* 匹配所有不是&的
// &|$ 结尾是&或者没了
const getQueryName = (name) => {
  const queryNameRegex = new RegExp(`[&|?]${name}=([^&]*)(&|$)`);
  const queryNameMatch = window.location.search.match(queryNameRegex);
  console.log(queryNameMatch, '`[&|?]${name}=([^&]*)(&|$)`');
  return queryNameMatch ? decodeURIComponent(queryNameMatch[1]) : '';
};
getQueryName('tagId');

const getQueryName1 = (key) => {
  const queryNameRegex = new RegExp(`[&|?]${key}=([^&]*)(&|$)`);
  const queryNameMatch = window.location.search.match(queryNameRegex);
  return queryNameMatch ? decodeURIComponent(queryNameMatch[1]) : '';
};
