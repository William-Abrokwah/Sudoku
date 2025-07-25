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

function countSolutions(grid, count) {
 for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col][0] === 0) {
        for (let num = 1; num <=9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col][0] = num;
            countSolutions(grid, count);
            grid[row][col][0] = 0;

            // Early exit if more than 1 solution
            if (count.value > 1) return; 
          }
        }
        return;
      }
    }
  }

  // Found a complete valid solution
  count.value++;
}

function getSolutionCount(grid) {
  const count = { value: 0 };
  countSolutions(grid, count);
  return count.value;
}

function countClues(grid) {
  let count = 0;
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (grid[y][x][0] !== 0) count++;
    }
  }
  return count;
}

function generatePuzzle(difficulty) {
  // Creating a list of the grid positions
  let cells = [];
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      cells.push([y, x]);
    }
  }
  shuffleArray(cells); // Randomizing order of positions

  // Choosing clue count based on difficulty
  const cluesNeeded = {
    Easy: 36,
    Medium: 32,
    Hard: 28,
    Expert: 17
  }[difficulty];

  // Digging holes in the grid while verifying the existence of a unique solution
  let index = 0;
  while (countClues(grid) > cluesNeeded && index < cells.length) {
    const [row, col] = cells[index];

    const removed = grid[row][col][0];
    grid[row][col][0] = 0;

    if (getSolutionCount(grid) != 1) {
      grid[row][col][0] = removed;
    }

    index++
  }

  return grid;
}