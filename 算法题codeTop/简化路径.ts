function simplifyPath(path: string): string {
  if (!path.length) {
    return '';
  }
  const ans: string[] = [];
  const strArr: string[] = path.split('/');
  const len: number = strArr.length;
  for (let i = 0; i < len; i++) {
    if (strArr[i] === '') {
      continue;
    } else if (strArr[i] === '.') {
      continue;
    } else if (strArr[i] === '..') {
      ans.pop();
    } else {
      ans.push(strArr[i]);
    }
  }
  console.log(ans);

  return '/' + ans.join('/');
}
