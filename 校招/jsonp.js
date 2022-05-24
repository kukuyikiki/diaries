function myJsonP({url, cb, params}) {
  return new Promise((resolve, rejcet) => {
    let script = document.createElement('script')
    window[cb] = function(data) {
      resolve(data)
      document.removeChild(script)
    }
    params = {...params, cb}
    let arr = []
    for (const key in params) {
      arr.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arr.join('&')}`
    document.append(script)
  })
}
jsonp({
  url: '',
  cb: 'show',
  params: {}
})