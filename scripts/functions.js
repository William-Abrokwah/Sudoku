// Creates a new empty grid and links to divs on page
function newEmptyGrid() {
  let grid = [];
  for (let row = 0; row < 9; row++) {
    grid[row] = [];
    for (let col = 0; col < 9; col++) {
      grid[row][col] = [];
      grid[row][col][0] = 0;
      
      const cellID = `cell-${row}-${col}`;
      const cellDiv = document.getElementById(cellID);

      grid[row][col][1] = cellDiv;

      // Removing clue class from cells if exists
      if (cellDiv.classList.contains('clue')) {
        cellDiv.classList.remove('clue');
      }

      // Adds borders to inner cells
      if (col % 3 === 0 || col % 3 === 1) cellDiv.classList.add('right-border');
      if (row % 3 === 0 || row % 3 === 1) cellDiv.classList.add('bottom-border');
    }
  }
  return grid;
}

// Verifying if number can be placed in an empty cell (Used to create puzzles)
function isValidPlacement(grid, row, col, num) {
  // Verifying column
  for (let x = 0; x < 9; x++) {
    if (grid[row][x][0] === num) return false;
  }

  // Verifying row
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

// Helper function to shuffle arrays
function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  return array
}

// Helper function to get cell position in grid
function getCellPosition(cell) {
  const cellID = cell.id;
  const parts = cellID.replace("cell-", "").split("-");

  const row = parseInt(parts[0], 10);
  const col = parseInt(parts[1], 10);

  return [row, col];
}

// Helper function to update cell value in grid
function updateCellValue(cell, value) {
  const position = getCellPosition(cell);

  const row = position[0];
  const col = position[1];
  
  grid[row][col][0] = value;
}

// Helper function to copy cell values in grid
function copyGridValues(grid) {
  let gridValues = []
  for (let row = 0; row < 9; row++) {
    gridValues[row] = [];
    for (let col = 0; col < 9; col++) {
      gridValues[row][col] = grid[row][col][0];
    }
  }

  return gridValues;
}

// Generate new fully valid sudoku boards
function solveSudoku(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col][0] === 0) {
        const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]); // Randomizing order
        for (let num of numbers) {
          if (isValidPlacement(grid, row, col, num)) {
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

// Helper function for getSolutionCount
function countSolutions(grid, count) {
 for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col][0] === 0) {
        for (let num = 1; num <=9; num++) {
          if (isValidPlacement(grid, row, col, num)) {
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

// Determines number of possible solutions of a puzzle
function getSolutionCount(grid) {
  const count = { value: 0 };
  countSolutions(grid, count);
  return count.value;
}

// Counts the number of clues in a puzzle
function countClues(grid) {
  let count = 0;
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (grid[y][x][0] !== 0) count++;
    }
  }
  return count;
}

// Digs holes in sudoku board randomly based on difficulty and ensures puzzle has a unique solution
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

// Creates a new board
function newGame() {
  grid = newEmptyGrid();
  solveSudoku(grid);
  gridValues = copyGridValues(grid);
  grid = generatePuzzle(difficulty);

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col][0] === 0) {
        grid[row][col][1].textContent = "";
      } else {
        grid[row][col][1].textContent = grid[row][col][0];
        grid[row][col][1].classList.add('clue');
      }
    }
  }

  // Resetting puzzle result
  let resultElement = document.getElementById("result");
  resultElement.textContent = "";
  resultElement.classList.remove('.result');

  // COME BACK TO LATER
}

// Resets board to original state
function resetBoard() {
  const cells = document.querySelectorAll('.sudoku-cell');
  cells.forEach(cell => {
    if (!cell.classList.contains('clue')) {
      cell.textContent = "";
      updateCellValue(cell, 0);
    }
  }); 

  // Resetting puzzle result
  let resultElement = document.getElementById("result");
  resultElement.textContent = "";
  resultElement.classList.remove('.result');
}

// Checks board if board is a valid sulotion
function checkBoard() {
  let emptyCell = false
  let mistakes = 0;

  cells.forEach(cell => {
    if (!cell.classList.contains('clue')) {
      let coords = getCellPosition(cell);
      let num = parseInt(cell.textContent);

      if(!isValidInput(grid, coords[0], coords[1], num)) {
        mistakes++;
      }

      if (cell.textContent === "") {
        emptyCell = true;
      }
    }
  });

  // Different result displays
  let resultElement = document.getElementById("result");
  resultElement.classList.add('result');

  if (mistakes === 0 && !emptyCell) {
    resultElement.textContent = "You have successfully completed the puzzle!!! Well done :)";
  } else if (mistakes !== 0) {
    resultElement.textContent = `You have ${mistakes} mistakes! Check again :(`;
  } else if (emptyCell) {
    resultElement.textContent = `You have ${mistakes} mistakes! But you aren't done yet :)`;
  }
}

// Validates user input
function isValidInput(grid, row, col, num) {
  if (gridValues[row][col] === grid[row][col][0] || grid[row][col][0] === 0) {
    return true;
  }
  return false;
}