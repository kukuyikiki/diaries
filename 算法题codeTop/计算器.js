/**
 * @param {string} s
 * @return {number}
 */
 let i = 0
 var calculate = function(str) {
   const stack1 = []
   const stack2 = []
   const len = str.length
   for (; i < len; i++) {
     if (str[i] == ' ') {continue}
     if (str[i] - '0' >= 0) {
       if (str[i] == ' ') {i++}
       let temp = sum(str)
       stack1.push(temp)
     } else {
       if (str[i] == '*' || str[i] == '/') {
         let flag = str[i]
         i += 1
         if (str[i] == ' ') {i++}
         let tempAfter = sum(str)
         stack1.push(multiply(stack1.pop(), tempAfter, flag))
       } else {
         stack2.push(str[i])
       }
     }
   }
   while (stack2.length) {
     let flag1 = stack2.pop()
     stack1.push(countSum(stack1.pop(), stack1.pop(), flag1))
   }
   i = 0
   return stack1.pop()
 };
 
 function sum(str) {
   let temp3 = 0
   while (str[i] != ' ' && str[i] - '0' >= 0) {
     temp3 = Number(str[i]) + (temp3 * 10)
     i++
   }
   i -= 1
   return temp3
 }
 
 function multiply(num1, num2, flag) {
   let result = 0
   if (flag == '*') {
     result = num1 * num2
   } else {
     result = Math.floor(num1 / num2)
   }
   return result
 }
 
 function countSum(num1, num2, flag) {
   let result = 0
   if (flag == '+') {
     result = num1 + num2
   } else {
     result = num2 - num1
   }
   return result
 }

let a = [
  {id: 1},
  {id: 8},
  {id: 2},
  {id: 13},
  {id: 5},
  {id: 3},
  {id: 9},
  {id: 4},
]

a.sort((i, j) => {
  return i.id - j.id
})
console.log(a);