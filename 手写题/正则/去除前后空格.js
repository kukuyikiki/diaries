// 去除空格法
const trim1 = (str) => {
  return str.replace(/^\s*|\s*$/g, "");
};
// 提取非空格法
const trim = (str) => {
  return str.replace(/^\s*(.*?)\s*$/g, "$1");
};
