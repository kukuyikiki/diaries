setTimeout(function() {
  setTimeout(arguments.callee, 500)
}, 500)

function say() {
  setTimeout(say, 200)
}
setTimeout(say, 200)

// 在函数内部，有两个特殊的对象：arguments 和 this。其中，arguments的主要用途是保存函数参数，但这个对象还有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数。

// 但是，访问arguments是个昂贵的操作，因为它是个很大的对象