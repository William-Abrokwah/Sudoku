let grid = newEmptyGrid();
let gridValues = copyGridValues(grid);
let difficulty = "Easy";

// Changing difficulty 
const difficultyButtons = document.querySelectorAll('.difficulty-button');
difficultyButtons.forEach(button => {
  button.addEventListener("click", () => {
    difficultyButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    difficulty = button.textContent;
  });
});

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