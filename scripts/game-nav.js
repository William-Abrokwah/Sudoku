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
/*function copyGridValues(grid) {
  let gridValues = []
  for (let row = 0; row < 9; row++) {
    gridValues[row] = [];
    for (let col = 0; col < 9; col++) {
      gridValues[row][col] = gridCopy[row][col][0];
    }
  }

  return gridValues;
}*/

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
    if (selectedCell && !selectedCell.classList.contains('clue')) {
      selectedCell.textContent = button.textContent;
      updateCellValue(selectedCell, parseInt(button.textContent, 10) );
    }
  });
});

// Resetting the value of a cell
const eraseButton = document.getElementById('erase-button')
eraseButton.addEventListener('click', () => {
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

  // Resetting puzzle result
  let resultElement = document.getElementById("result");
  resultElement.textContent = "";
  resultElement.classList.remove('.result');

  // COME BACK TO LATER
}

// Reseting board to original state
function resetBoard() {
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