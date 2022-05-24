function myAjax(url, data, method) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.send(data)
    xhr.onreadystatechange = function() {
      if (xhr.status == 200 && readyState == 4) {
        let json = JSON.parse(xhr.responseText)
        resolve(json)
      } else if (xhr.readyState == 4 && xhr.status != 200) {
        reject('error')
      }
    }
  })
}