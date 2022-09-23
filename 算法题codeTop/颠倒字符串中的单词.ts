function reverseWords(s: string): string {
  if (typeof s === 'string' && s.length > 0) {
    s += ' ';
  } else {
    return '';
  }
  const len = s.length;
  let single: string = '';
  let ans: string[] = [];
  let bl: boolean = false;
  for (let i = 0; i < len; i++) {
    if (s[i] !== ' ') {
      while (s[i] !== ' ' && i < len) {
        single += s[i];
        i++;
        bl = true;
      }
      i--;
    } else {
      if (bl) {
        ans.unshift(single);
        single = '';
        bl = false;
      }
    }
    console.log(ans, i, len);
  }
  return ans.join(' ');
}

(() => {
  function reeverseWords(s: string): string {
    if (s.length > 0) {
      s += ' ';
    } else {
      return '';
    }

    const len = s.length;
    let single: string = '';
    let ans: string[] = [];
    let bl: boolean = false;
    for (let i = 0; i < len; i++) {
      if (s[i] !== ' ') {
        while (s[i] !== ' ' && i < len) {
          single += s[i];
          i++;
          bl = true;
        }
        i--;
      } else {
        if (bl) {
          ans.unshift(single);
          single = '';
          bl = false;
        }
      }
    }

    return ans.join(' ');
  }
})();
