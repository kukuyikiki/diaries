/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if (!matrix.length || !matrix[0].length) {
        return []
    }

    let rows = matrix.length, columns = matrix[0].length
    let left = 0, right = columns - 1, top = 0, bottom = rows - 1
    const order = []

    while (left <= right && top <= bottom) {
        for (let column = left; column <= right; column++) {
            order.push(matrix[top][column])
        }
        for (let row = top + 1; row <= bottom; row++) {
            order.push(matrix[row][right])
        }
        if (left < right && top < bottom) {
            for (let column = right - 1; column > left; column--) {
                order.push(matrix[bottom][column])
            }
            for (let row = bottom; row > top; row--) {
                order.push(matrix[row][left])
            }
        }
        [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1]
    }
    return order
};
