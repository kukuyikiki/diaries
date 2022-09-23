function findNumberIn2DArray(matrix: number[][], target: number): boolean {
  let ans: boolean = false;
  if (matrix.length === 0 || matrix[0].length === 0) {
    return ans;
  }
  let row: number = matrix.length - 1,
    col: number = 0;
  while (row >= 0 && col <= matrix[0].length - 1) {
    if (matrix[row][col] > target) {
      row--;
    } else if (matrix[row][col] < target) {
      col++;
    } else {
      ans = true;
      break;
    }
  }
  return ans;
}
