/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
  if(matrix !== null) {
    if (matrix.length === 0 || matrix[0].length === 0) {
      return false;
    }
    let n = matrix.length
    let m = matrix[0].length
    let [row, col] = [0, m-1]
    let tem = 0
    while(row < n && col >= 0) {
      tem = matrix[row][col]
      if (tem === target) {
        return true
      } else if (tem < target) {
        row++
      } else {
        col--
      }
    }
  }
  return false
};