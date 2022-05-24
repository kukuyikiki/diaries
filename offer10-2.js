// /**
//  * @param {number} n
//  * @return {number}
//  */
// var numWays = function(n) {
//   let dp = []
//   dp[0] = 1
//   dp[1] = 1
//   for(let i = 2; i <= n; i++) {
//     let tem = dp[i-1] + dp[i-2]
//     dp[i] = tem > 1000000007 ? c : c % 1000000007
//   }
//   return dp[n]
// };

/**
 * Q2: 实现一个加权随机函数
 *
 * 此函数接收一个整数数组 input, 此数组:
 *  1. 元素个数 N < 10000
 *  2. 元素的值大于 0 且小于 100
 *
 * 返回一个随机函数, 此随机函数:
 *  1. 返回 [0, N - 1] 之间的一个随机整数
 *  2. 每个整数 i 被返回的概率为:
 *     数组 input 的第 i 个元素的值 / 数组 arr 的所有元素之和
 *
 * 例: 给定一个数组 input, 值为 [4, 2, 1, 3],
 *    调用 createWeightedRandom(input), 应当
 *    返回一个函数, 此函数返回一个 0 - 3 之间的一个
 *    随机整数, 相应的概率分别为:
 *    4/10, 2/10, 1/10, 3/10.
 *
 * 分别按以下两种要求实现该函数:
 * 1. 空间复杂度不限, 返回的随机函数时间复杂度 O(1)
 * 2. 空间复杂度 O(N), 返回的随机函数时间复杂度 O(logN)
 */
// Q2.1: 空间复杂度不限, 返回的随机函数时间复杂度 O(1)
function createWeightedRandom_O1(input) {
  // show me the code, please delete the following line.
  const dp = []
  
  for (let i of input) {
    for (let j = 0; j < i; j++) {
      dp.push(i - 1)
    }
  }

  return function() {
    return dp[Math.floor(Math.random() * (dp.length))]
  }
}

function testCreateWeightedRandom_O1() {
  const input = [4, 2, 1, 3];
  const sampling = createWeightedRandom_O1(input);
  const count = [0, 0, 0, 0];
  for (let i = 0; i < 10; i++) {
    let ss = sampling()
    count[ss]++;
    console.log(count, ss, 'count');
  }
  const rates = count.map((i) => Math.round(i / 1000));
  console.log(JSON.stringify(rates) === '[4,2,1,3]', `${rates} is not same to ${input}`);
}

testCreateWeightedRandom_O1()

async function hh() {
  setTimeout(() => {
    console.log('wc')
  }, 1000)
}

try {
  await hh()
} catch(e) {
  console.log('ee')
} finally {
  console.log('rrr')
}