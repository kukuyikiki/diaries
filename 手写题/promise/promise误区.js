setTimeout(function() {
  const p = new Promise(function (resolve, reject) {
    console.log(1);
    resolve()
  })
  p.then(() => {
    console.log(2);
  })
  console.log(3);
}, 1000)

const np = new Promise((resolve, reject) => {
  console.log(5)
  resolve()
}).then(() => {
  setTimeout(function() {
    console.log(6);
  }, 0)
  return 7
}).then(n => {
  console.log(n);
})

console.log(4);



new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  console.log(result); // 1

  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) { // (**)

  console.log(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  console.log(result); // 4

});