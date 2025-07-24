function isValid(grid, row, col, num) {
  // Verifying row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x][0] === num) return false;
  }

  // Verifying column
  for (let y = 0; y < 9; y++) {
    if (grid[y][col][0] === num) return false;
  }

  // Verifying 3x3 quadrant
  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;
  for (let y = startRow; y < startRow + 3; y++) {
    for (let x = startCol; x < startCol + 3; x++) {
      if (grid[y][x][0] === num) return false;
    }
  }
  return true;
}

function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  return array
}

function solveSudoku(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col][0] === 0) {
        const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]); // Randomizing order
        for (let num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col][0] = num;
            if (solveSudoku(grid)) return true;
            grid[row][col][0] = 0;
          }
        }
        return false; // No valid number found so backtrack
      }
    }
  }
  return true;
}