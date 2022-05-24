// 驼峰转连字符
var s = "thisIsTest";
s = s.replace(/([A-Z])/g,"-$1").toLowerCase();

// 连字符转驼峰
function toHump(name) {
  return name.replace(/\-(\w)/g, function(all, letter){
    console.log(all) //"_T"
    console.log(letter) //"T"
    return letter.toUpperCase();
  });
}

function repeat(fn, count, delay) {
  return function(str) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        fn.call(this, str)
      }, delay * (i + 1))
    }
  }
}

const repeatFunc = repeat(console.log, 4, 1000)
repeatFunc("helloworld")
repeatFunc("helloworld2")