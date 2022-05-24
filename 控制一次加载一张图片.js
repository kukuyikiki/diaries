let obj = new Image()
obj.src = 'url'
obj.onload = function() {
  document.getElementById('myPic').innerHTML = "<img src="+this.xrc+">"
}

let obj = new Image()
obj.src = 'url'
obj.onreadstatechange = function() {
  if (this.readState === 'complate') {
    document.getElementById('myPic').innerHTML = "<img src=" + this.src + "/>"
  }
}
