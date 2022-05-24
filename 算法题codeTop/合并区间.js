/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  const len = intervals.length
  let i = 0
  if (len === 1) {
    return intervals
  }
  intervals.sort((a, b) => {
    return a[0] - b[0]
  })
  while (i < len) {
    if (intervals[i][1] >= intervals[i - 1][0]) {
      intervals.splice(i - 1, 2, [intervals[i][0], intervals[i + 1][1]])
    } else {
      i++
    }
  }
  return intervals
};

var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let prev = intervals[0]
  let result = []
  for(let i = 0; i < intervals.length; i++){
      let cur = intervals[i]
      if(cur[0] > prev[1]){
          result.push(prev)
          prev = cur
      }else{
          prev[1] = Math.max(cur[1],prev[1])
      }
  }
  result.push(prev)
  return result
};