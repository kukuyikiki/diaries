setTimeout(function () {
  const p = new Promise(function (resolve, reject) {
    console.log(1);
    resolve();
  });
  p.then(() => {
    console.log(2);
  });
  console.log(3);
}, 1000);

const np = new Promise((resolve, reject) => {
  console.log(5);
  resolve();
})
  .then(() => {
    setTimeout(function () {
      console.log(6);
    }, 0);
    return 7;
  })
  .then((n) => {
    console.log(n);
  });

console.log(4);

new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log(result); // 1

    return new Promise((resolve, reject) => {
      // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    // (**)

    console.log(result); // 2

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    console.log(result); // 4
  });

const promise1 = new Promise((resolve) => setTimeout(resolve, 2000));
const promise2 = Promise.reject("123");

Promise.all([
  promise1.catch(() => {
    status: "failed";
  }),
  promise2.catch(() => {
    status: "failed";
  }),
])
  .then(() => {
    console.log("成功了");
  })
  .catch(() => {
    console.log("失败了");
  });
