/*
例如,
 n = 1, return 1 (⽅法1: 1台阶)
 n = 2, return 2 (⽅法1: 1台阶&1台阶, ⽅法2: 2台阶)
 n = 3, return 3 (⽅法1: 1台阶*3次, ⽅法2: 1台阶&2台阶, ⽅法3: 2台阶&1台阶)
*/
function step(n) {
  if (n <= 0) {
    return 0
  }
  let arr = []
  arr[0] = 1
  arr[1] = 1
  arr[2] = 2
  for(let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }
  console.log(arr[n])
  return arr[n]
}


// function step(n) {
//   if (n <= 0) {
//     throw new Error("param err");
//     return -1;
//   }
//   if (n == 1) return 1;
//   if (n == 2) return 2;
//   return step(n - 1) + step(n - 2);
// }
