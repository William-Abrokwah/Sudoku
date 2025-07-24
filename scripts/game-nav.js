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

// Resetting the value of a cell
const resetButton = document.getElementById('reset-button')
resetButton.addEventListener('click', () => {
  if (selectedCell) {
    selectedCell.textContent = '';
    // COME BACK TO LATER
  }
});

// Creating a new board
function newGame() {
  
}