(() => {
  function decodeString(s: string): string {
    const len: number = s.length;
    if (!len) {
      return '';
    }

    const strArr: string[] = [];
    const numArr: number[] = [];
    let num: number = 0,
      res: string = '';

    for (let i = 0; i < len; i++) {
      let item: string = s[i];
      if (Number(item) || Number(item) === 0) {
        num = num * 10 + Number(item);
      } else if (item === '[') {
        numArr.push(num);
        num = 0;
        strArr.push(res);
        res = '';
      } else if (item === ']') {
        const repeat: number = numArr.pop() as number;
        res = strArr.pop() + res.repeat(repeat);
      } else {
        res += item;
      }
    }

    return res;
  }
})();
