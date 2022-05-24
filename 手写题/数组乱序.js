function shuffle(arr) {
  let m = arr.length;
  while (m > 1){
      let index = Math.floor(Math.random() * m--);
      [arr[m] , arr[index]] = [arr[index] , arr[m]]
  }
  return arr;
}