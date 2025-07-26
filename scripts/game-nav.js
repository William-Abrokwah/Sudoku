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

// Helping function to update cell value in grid
function updateCellValue(selectedCell, value) {
  const cellID = selectedCell.id;
  const parts = cellID.replace("cell-", "").split("-");

  const row = parseInt(parts[0], 10);
  const col = parseInt(parts[1], 10);
  grid[row][col][0] = value;
}

// Changing the value of a cell using numpad
const numpadButtons = document.querySelectorAll('.numpad-item');
numpadButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (selectedCell && !selectedCell.classList.contains('clue')) {
      selectedCell.textContent = button.textContent;
      updateCellValue(selectedCell, parseInt(button.textContent, 10) );
    }
  });
});

// Resetting the value of a cell
const resetButton = document.getElementById('reset-button')
resetButton.addEventListener('click', () => {
  if (selectedCell && !selectedCell.classList.contains('clue')) {
    selectedCell.textContent = '';
    updateCellValue(selectedCell, 0);
  }
});

// Creating a new board
function newGame() {
  grid = newEmptyGrid();
  solveSudoku(grid);
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
  // COME BACK TO LATER
}