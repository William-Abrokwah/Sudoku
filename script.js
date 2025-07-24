
// Linking the cell divs to a 2D 9x9 array
const grid = [];
for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    const cellID = `cell-${row}-${col}`;
    const cellDiv = document.getElementById(cellID);
    grid[row][col] = cellDiv;
  }
}

// Selecting a cell
const cells = document.querySelectorAll('.sudoku-cell');
let selectedCell = null;

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    cells.forEach(c => c.classList.remove('selected'));
    cell.classList.add('selected');
    selectedCell = cell;
  });
});

// Changing the value of a cell using numpad
const numpadButtons = document.querySelectorAll('.numpad-item');

numpadButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (selectedCell) {
      selectedCell.textContent = button.textContent;
    }
  });
});


function isValid(grid, row, col, num) {
  // Verifying row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }

  // Verifying column
  for (let y = 0; y < 9; y++) {
    if (grid[y][col] === num) return false;
  }

  // Verifying 3x3 quadrant
  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;
  for (let y = startRow; y < startRow + 3; y++) {
    for (let x = startCol; x < startCol + 3; x++) {
      if (grid[y][x] === num) return false;
    }
  }
  return true;
}

function solveSudoku(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) return true;
            grid[row][col] = 0;
          }
        }
      }
      return false;
    }
  }
  return true;
}