(() => {
  function spiralOrder(matrix: number[][]): number[] {
    if (!matrix.length || !matrix[0].length) {
      return [];
    }

    let rows: number = matrix.length,
      columns: number = matrix[0].length;
    let left: number = 0,
      right: number = columns - 1,
      top: number = 0,
      bottom: number = rows - 1;
    const order: number[] = [];

    while (left <= right && top <= bottom) {
      for (let column = left; column <= right; column++) {
        order.push(matrix[top][column]);
      }
      for (let row = top + 1; row <= bottom; row++) {
        order.push(matrix[row][right]);
      }
      if (left < right && top < bottom) {
        for (let column = right - 1; column > left; column--) {
          order.push(matrix[bottom][column]);
        }
        for (let row = bottom; row > top; row--) {
          order.push(matrix[row][left]);
        }
      }
      [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
    }

    return order;
  }
})();
