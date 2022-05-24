function a() {
  let a = 1
  let b = 2
  var c = 3
  {
      let a = 4
      console.log(a)
      
      let c = 5
      var d = 6
      console.log(a, b)
  }
  console.log(a, b)
  console.log(c, d)
}
a()

const a = new Promise((resolve, reject) => {
  console.log(1)

  const b = new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(555)
      })
      console.log(2)
      resolve(99)
  })
  b().then(res => {
      console.log(res)
  })
  resolve(7777)
  console.log('eeedn')
})
a().then((res) => {console.log(res)})
console.log('end');