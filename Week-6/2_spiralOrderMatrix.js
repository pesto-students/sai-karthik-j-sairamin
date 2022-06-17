/**
 * Time Complexity is O(m+n) for a m x n matrix
 *
 * Space Complexity here is O(m+n) as I am saving into array.
 *
 * If only logging is done without saving, then Space Complexity is O(1)
 */

function spiralTraverse(matrix) {
  let left = 0; // left most column index
  let right = matrix[0].length - 1; // right most column index

  let top = 0; // top row index
  let bottom = matrix.length - 1; // bottom row index

  let result = [];

  let direction = 0;
  while (left <= right && top <= bottom) {
    if (direction === 0) {
      // move left to right in a row
      for (let i = left; i <= right; i++) {
        result.push(matrix[top][i]);
      }
      top++;
    }
    if (direction === 1) {
      // move top to bottom in a column
      for (let i = top; i <= bottom; i++) {
        result.push(matrix[i][right]);
      }
      right--;
    }
    if (direction === 2) {
      // move right to left in a row
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }
    if (direction === 3) {
      // move bottom to top in a column
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
    direction = (direction + 1) % 4; // auto updating direction
  }
  return result;
}

const matrix1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const matrix2 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

const matrix3 = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];

const matrix4 = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
];

const matrix5 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
];

const matrix6 = [[1, 2, 3, 4, 5]];

const matrix7 = [[1], [2], [3], [4], [5]];

console.log(spiralTraverse(matrix1));
console.log(spiralTraverse(matrix2));
console.log(spiralTraverse(matrix3));
console.log(spiralTraverse(matrix4));
console.log(spiralTraverse(matrix5));
console.log(spiralTraverse(matrix6));
console.log(spiralTraverse(matrix7));
