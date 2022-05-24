Promise.myReject = function (value) {
  return new Promise((_, reject) => {
    reject(value)
  })
}

Promise.myReject(new Error('fail'))
  .then(() => console.log('Resolved'), 
        (err) => console.log('Rejected', err))