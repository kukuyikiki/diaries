// index.html
function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    window[callback] = function(data) {
      resolve(data)
      document.body.removeChild(script)
    }
    params = { ...params, callback } // wd=b&callback=show
    let arrs = []
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arrs.join('&')}`
    document.body.appendChild(script)
  })
}
jsonp({
  url: 'http://localhost:3000/say',
  params: { wd: 'Iloveyou' },
  callback: 'show'
}).then(data => {
  console.log(data)
})


const map = new Map()
let set1 = new Set()
set1.add(4)
set1.add(5)
let set2 = new Set()
set2.add(7)
set2.add(8)
let set3 = new Set()
set3.add(9)

map.set(1, set1)
map.set(4, set2)
map.set(7, set3)

let ans = 0
function ee(n, arr) {
  for (let temp of arr) {
    let a = temp[0], b = temp[1]
    f2(a, b)
    f2(b, a)
  }
  for (let i = 1; i <= n; i++) {
    if (!map.has(i)) {
      ans++
    }
  }

  for (let key of Array.from(map.keys())) {
    let set = map.get(key)
    gt(set)
  }
  return (map.keys.length + ans)
}

function f2(a, b) {
  let set = map.get(a) ? map.get(a) : new Set()
  set.add(b)

  map.set(a, set)
}

function gt(set) {
  if (set) {
    for (let cur of set) {
      if (map.get(cur)) {
        let temp = map.get(cur)
        map.delete(cur)
        gt(temp)
      }
    }
  }
}
