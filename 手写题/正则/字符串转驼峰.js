// 每个单词的前面都有0个或者多个- 空格 _ 如(Foo、--foo、__FOO、_BAR、 Bar)
// - 空格 _后面有可能不跟任何东西 如(__、--)

function doChange(str) {
  // - 空格 _后面有可能不跟任何东西 如(__、--)
  // 注意(.)?这里的?是为了满足条件2
  let regex = /[-|_|\s]+(.)?/g;

  // char 是对应 $1
  return str.replace(regex, (match, char) => {
    console.log(match, char, 'char');
    return char ? char.toUpperCase() : '';
  });
}
console.log(doChange('do_you'));
console.log(doChange('do-you'));
console.log(doChange('do you'));

let obj = {
  rr: 11,
};

let arr = ['aa', 'a', 1, 5, obj];
console.log(arr.includes({ rr: 11 }));
