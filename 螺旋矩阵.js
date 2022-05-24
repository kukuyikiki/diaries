function produceArray(n,start){
  if(count==-1){
      count = n;
  }

  if(start==0){
    for(let i=0;i<n;i++){
      array[i] = [];
      for(let j=0;j<n;j++){
        array[i].push(0);
      }
    }
  }

  if(count!=2&&count%2==0&&n==2){
      return;
  }
  if(n==1&&count%2!=0){
      const index = (count-1)/2;
      array[index][index] = count*count-1;
    return;
  }


  let increaseNum = start;
    if(n<=0){
    return;
  }
  for(let i=count-n;i<n-1;i++){
      array[i][count-n] = increaseNum++;
  }
  for(let i=count-n;i<n-1;i++){
      array[n-1][i] = increaseNum++;
  }
  for(let i=n-1;i>count-n;i--){    
      array[i][n-1] = increaseNum++;
  }
  for(let i=n-1;i>count-n;i--){
      array[count-n][i] = increaseNum++;
  }
  
  
  produceArray(n-1,increaseNum)
}

const array = new Array();
let count = -1;

produceArray(n,0);　//此处可给n赋值即可，比如生成５＊５矩阵，n就等于５
for(let i=0;i<array.length;i++){
    console.log(array[i].join(","));
}


function spiralOrder(arr) {
  const len = arr.length
  if (len === 0) return []
  if (len === 1) return arr[0]
  let res = []
  while (arr.length) {
    if (arr.length >= 2) {
      // 取出第一项
      const head = arr.shift()
      // 取最后一项
      const last = arr.pop()
      // 长方形右边框
      const lastArr = []
      // 长方形左边框
      const headArr = []
      for (let i = 0; i < arr.length; i++) {
        const left = arr[i].length
        if (left > 1) {
          lastArr.push(arr[i].pop())
          headArr.unshift(arr[i].shift())
        } else if (left === 1) {
          lastArr.push(arr[i].pop())
        }
      }
      res = [].concat(res, head, lastArr, last.reverse(), headArr)
    } else {
      const last = arr.shift()
      last && (res = [].concat(res, last))
    }
  }
  return res
}